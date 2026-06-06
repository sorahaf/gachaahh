// gacha-core.js

// ══════════════════════════════════════════
// ราคาหัวใจ → บาท
// ══════════════════════════════════════════
const PRICE_TIERS = [
  { hearts: 7050, price: 3390 },
  { hearts: 3550, price: 1760 },
  { hearts: 2130, price: 1060 },
  { hearts: 1370, price: 699  },
  { hearts: 730,  price: 369  },
  { hearts: 320,  price: 169  },
  { hearts: 60,   price: 35   },
  { hearts: 20,   price: 15   }
];

function calculateTHBCost(totalHearts) {
  if (totalHearts <= 0) return 0;
  let heartsLeft = totalHearts, totalCost = 0;
  for (let tier of PRICE_TIERS) {
    if (heartsLeft >= tier.hearts) {
      let packs = Math.floor(heartsLeft / tier.hearts);
      totalCost += packs * tier.price;
      heartsLeft -= packs * tier.hearts;
    }
  }
  if (heartsLeft > 0) {
    for (let i = PRICE_TIERS.length - 1; i >= 0; i--) {
      if (PRICE_TIERS[i].hearts >= heartsLeft) { totalCost += PRICE_TIERS[i].price; break; }
    }
  }
  return totalCost;
}

// ══════════════════════════════════════════
// State Management
// ══════════════════════════════════════════
function loadGlobalState() {
  try {
    const saved = localStorage.getItem('heartopia_gacha_v2');
    return saved ? JSON.parse(saved) : {};
  } catch(e) { return {}; }
}

function saveGlobalState(state) {
  localStorage.setItem('heartopia_gacha_v2', JSON.stringify(state));
}

function freshPoolState() {
  return {
    pulls: 0,
    pullsSinceRare: 0,
    totalHeartsUsed: 0,
    history: [],
    gotRares: [],
    gotCommons: [],     // สำหรับตู้ใหญ่: track ว่าได้ common อะไรไปแล้ว
    gotFirstRare: false,
    gotAll: false,
    weightPool: null,   // legacy (ไม่ใช้แล้ว)
    remainingIdx: null, // draw-index engine
    claimedRebates: []
  };
}

// ══════════════════════════════════════════
// Banner & Background
// ดึงจาก THEME_META ใน gacha-database.js
// วิธีอัปเดต: ไปแก้ bannerUrl / bgUrl ใน THEME_META โดยตรง
// ══════════════════════════════════════════

// ══════════════════════════════════════════
// Rebate Milestones — ตู้ใหญ่เท่านั้น
// ══════════════════════════════════════════
const BIG_REBATE_RULES = [
  { target: 15,  tickets: 30 },
  { target: 50,  tickets: 30 },
  { target: 100, tickets: 30 },
  { target: 150, tickets: 60 }
];

function checkRebate(st) {
  if (!st.claimedRebates) st.claimedRebates = [];
  for (const rule of BIG_REBATE_RULES) {
    if (st.pulls >= rule.target && !st.claimedRebates.includes(rule.target)) {
      st.claimedRebates.push(rule.target);
      const heartsSaved = rule.tickets * 10;
      st.totalHeartsUsed = Math.max(0, st.totalHeartsUsed - heartsSaved);
      return { tickets: rule.tickets, heartsSaved, target: rule.target };
    }
  }
  return null;
}

// ══════════════════════════════════════════
// Roll Engine
// ══════════════════════════════════════════

// engine: "big" — pity pool, no-dup guarantee
function rollBig(cfg, st) {
  const limit = st.gotFirstRare ? cfg.guarantee2 : cfg.guarantee1;
  const isPity = st.pullsSinceRare >= (limit - 1);
  const allRares = cfg.items.rare.map(r => r.name);
  const uniqueGot = [...new Set(st.gotRares)];
  const unobtained = allRares.filter(n => !uniqueGot.includes(n));

  if (isPity && unobtained.length > 0) {
    const name = unobtained[Math.floor(Math.random() * unobtained.length)];
    st.gotRares.push(name); st.pullsSinceRare = 0; st.gotFirstRare = true;
    if ([...new Set(st.gotRares)].length === allRares.length) st.gotAll = true;
    return { name, isRare: true, isPity: true };
  }

  if (Math.random() < cfg.rareRate) {
    st.gotFirstRare = true;
    const target = cfg.items.rare[Math.floor(Math.random() * cfg.items.rare.length)];
    const dup = st.gotRares.includes(target.name);
    st.gotRares.push(target.name);
    if (!dup) st.pullsSinceRare = 0; else st.pullsSinceRare++;
    if ([...new Set(st.gotRares)].length === allRares.length) st.gotAll = true;
    return { name: target.name, isRare: true, isPity: false, dup, tag: target.tag };
  }

  const common = cfg.items.common[Math.floor(Math.random() * cfg.items.common.length)];
  st.pullsSinceRare++;
  if (!st.gotCommons) st.gotCommons = [];
  const dupCommon = st.gotCommons.includes(common.name);
  st.gotCommons.push(common.name);
  return { name: common.name, isRare: false, isPity: false, dup: dupCommon };
}

// engine: "ticket_step" / "heart_step" — weight pool, sweep on special
function rollStepPool(cfg, st) {
  // init: เก็บ index ของ item ที่ยังไม่ได้ (เทียบกับ cfg.items ต้นฉบับ)
  if (!st.remainingIdx) {
    st.remainingIdx = cfg.items.map((_, i) => i);
  }

  const drawIdx      = Math.max(0, st.pulls - 1); // pulls ถูก ++ ก่อน roll → 0-indexed
  const drawRow      = cfg.drawWeights
    ? cfg.drawWeights[Math.min(drawIdx, cfg.drawWeights.length - 1)]
    : null;

  // สร้าง pool จาก remaining index + weight ของ draw นี้
  const pool = st.remainingIdx.map(origIdx => ({
    origIdx,
    item:   cfg.items[origIdx],
    weight: drawRow ? drawRow[origIdx] : (cfg.items[origIdx].weight || 1)
  }));

  // normalize weight เฉพาะ item ที่เหลือ (กัน float error)
  const totalW = pool.reduce((s, p) => s + p.weight, 0);
  let rng = Math.random() * totalW, acc = 0, chosen = pool[pool.length - 1];
  for (const p of pool) {
    acc += p.weight;
    if (rng <= acc) { chosen = p; break; }
  }

  const rolled = chosen.item;

  if (rolled.isSpecial) {
    // sweep: คืน item ที่เหลือทั้งหมด (ไม่รวมตัวที่สุ่มได้)
    const swept = pool
      .filter(p => p.origIdx !== chosen.origIdx)
      .map(p => ({ name: p.item.name, isRare: !!p.item.isRare, isSpecial: !!p.item.isSpecial, swept: true }));
    st.remainingIdx = [];
    st.gotAll = true;
    return { name: rolled.name, isSpecial: true, swept };
  }

  // ลบ item ที่ได้ออกจาก remaining
  st.remainingIdx = st.remainingIdx.filter(i => i !== chosen.origIdx);
  if (st.remainingIdx.length === 0) st.gotAll = true;
  return { name: rolled.name, isRare: !!rolled.isRare, isSpecial: false };
}

// ── ฟังก์ชันหลัก: สุ่ม 1 ครั้ง ──
function doSingleRoll(cfg, st) {
  switch (cfg.cabinetType) {
    case 'big':          return rollBig(cfg, st);
    case 'ticket_step':
    case 'heart_step':   return rollStepPool(cfg, st);
    default:             return { name: '???', isRare: false };
  }
}

// ── คำนวณค่าใช้จ่ายครั้งถัดไป (หน่วย: หัวใจ) ──
function getNextCostHearts(cfg, pulls) {
  if (cfg.cabinetType === 'big') {
    return cfg.costPerPull * cfg.heartMultiplier;
  }
  const step = Math.min(pulls, cfg.costMap.length - 1);
  return cfg.costMap[step] * cfg.heartMultiplier;
}

// ── แสดงค่าใช้จ่ายเป็น "ตั๋ว" หรือ "หัวใจ" ──
function getNextCostDisplay(cfg, pulls) {
  if (cfg.cabinetType === 'big') {
    return `${cfg.costPerPull} ตั๋ว`;
  }
  if (cfg.cabinetType === 'heart_step') {
    const step = Math.min(pulls, cfg.costMap.length - 1);
    return `${cfg.costMap[step]} 💜`;
  }
  // ticket_step
  const step = Math.min(pulls, cfg.costMap.length - 1);
  return `${cfg.costMap[step]} ตั๋ว`;
}
