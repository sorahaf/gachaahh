// compare-modal.js
// จำลอง "คนจริง N คน" แล้วพล็อตกราฟเปรียบเทียบกับ simulation ระบบ (5000 รอบ)

const COMPARE_MAX_PEOPLE = 2000; // กันเครื่องค้าง

// ══════════════════════════════════════════
// Average Rate Calculator — step pool only
// run SIM_ROUNDS รอบ นับสัดส่วน Special/Rare/Normal ต่อ pull
// ══════════════════════════════════════════
const _rateCache = {}; // cache ตาม cabinet id

function calcAvgRates(cfgId, cfg) {
  if (_rateCache[cfgId]) return _rateCache[cfgId];

  let totalPulls = 0, cntSpecial = 0, cntRare = 0, cntNormal = 0;
  const ROUNDS = SIM_ROUNDS; // ใช้ค่าเดิม 5000 รอบ

  for (let r = 0; r < ROUNDS; r++) {
    let remaining = cfg.items.map((_, i) => i);
    let pulls = 0;

    while (remaining.length > 0) {
      const drawRow = cfg.drawWeights
        ? cfg.drawWeights[Math.min(pulls, cfg.drawWeights.length - 1)]
        : null;
      const pool = remaining.map(origIdx => ({
        origIdx,
        weight: drawRow ? drawRow[origIdx] : (cfg.items[origIdx].weight || 1)
      }));
      const totalW = pool.reduce((s, p) => s + p.weight, 0);
      let rng = Math.random() * totalW, acc = 0, chosen = pool[pool.length - 1];
      for (const p of pool) { acc += p.weight; if (rng < acc) { chosen = p; break; } }

      pulls++;
      totalPulls++;
      const item = cfg.items[chosen.origIdx];
      if (item.isSpecial)     cntSpecial++;
      else if (item.isRare)   cntRare++;
      else                    cntNormal++;

      if (item.isSpecial) remaining = [];
      else remaining = remaining.filter(i => i !== chosen.origIdx);
    }
  }

  const result = {
    special: (cntSpecial / totalPulls * 100).toFixed(1),
    rare:    (cntRare    / totalPulls * 100).toFixed(1),
    normal:  (cntNormal  / totalPulls * 100).toFixed(1),
  };
  _rateCache[cfgId] = result;
  return result;
}

// ── ล้าง cache (เผื่อใช้ตอน reset) ──
function clearRateCache() { Object.keys(_rateCache).forEach(k => delete _rateCache[k]); }


function runCompare(cfg, n) {
  const rounds = Math.min(n, COMPARE_MAX_PEOPLE);
  const results = [];
  for (let i = 0; i < rounds; i++) {
    // จำลอง 1 คน — เหมือน simulateBig/simulateStepPool แต่ใช้ n ที่กำหนด
    const single = runSimulationOnce(cfg);
    results.push(single);
  }
  return results;
}

function runSimulationOnce(cfg) {
  if (cfg.cabinetType === 'big') return simOnceBig(cfg);
  return simOnceStep(cfg);
}

function simOnceBig(cfg) {
  let pulls = 0, pullsSinceRare = 0, gotFirstRare = false;
  const gotRares = new Set();
  const totalRares = cfg.items.rare.length;
  while (gotRares.size < totalRares) {
    pulls++;
    const limit  = gotFirstRare ? cfg.guarantee2 : cfg.guarantee1;
    const isPity = pullsSinceRare >= (limit - 1);
    const allRareNames = cfg.items.rare.map(i => i.name);
    const unobtained   = allRareNames.filter(n => !gotRares.has(n));
    if (isPity && unobtained.length > 0) {
      gotRares.add(unobtained[Math.floor(Math.random() * unobtained.length)]);
      pullsSinceRare = 0; gotFirstRare = true;
    } else if (Math.random() < cfg.rareRate) {
      gotFirstRare = true;
      const pick = cfg.items.rare[Math.floor(Math.random() * cfg.items.rare.length)].name;
      const wasDup = gotRares.has(pick);
      gotRares.add(pick);
      if (!wasDup) pullsSinceRare = 0;  // ได้ใหม่: reset pity
      else         pullsSinceRare++;     // ได้ซ้ำ: นับต่อ
    } else { pullsSinceRare++; }
  }
  return pulls;
}

function simOnceStep(cfg) {
  let remaining = cfg.items.map((_, i) => i);
  let pulls = 0;
  while (remaining.length > 0) {
    const drawRow = cfg.drawWeights
      ? cfg.drawWeights[Math.min(pulls, cfg.drawWeights.length - 1)]
      : null;
    const pool = remaining.map(origIdx => ({
      origIdx,
      weight: drawRow ? drawRow[origIdx] : (cfg.items[origIdx].weight || 1)
    }));
    const totalW = pool.reduce((s, p) => s + p.weight, 0);
    let rng = Math.random() * totalW, acc = 0, chosen = pool[pool.length - 1];
    for (const p of pool) { acc += p.weight; if (rng < acc) { chosen = p; break; } }
    pulls++;
    if (cfg.items[chosen.origIdx].isSpecial) { remaining = []; }
    else { remaining = remaining.filter(i => i !== chosen.origIdx); }
  }
  return pulls;
}

// ══════════════════════════════════════════
// Build unified bins จาก 2 dataset
// ══════════════════════════════════════════
function buildCompareBins(sysData, userDataRaw, binSize) {
  const allVals = [...sysData, ...userDataRaw];
  const minV = Math.min(...allVals);
  const maxV = Math.max(...allVals);
  const range = maxV - minV || 1;
  const useExact = range <= 20;
  const bins = [];

  if (useExact) {
    for (let v = minV; v <= maxV; v++)
      bins.push({ label: String(v), from: v, to: v, sys: 0, usr: 0 });
    sysData.forEach(v  => { const i = v - minV; if (bins[i]) bins[i].sys++; });
    userDataRaw.forEach(v => { const i = v - minV; if (bins[i]) bins[i].usr++; });
  } else {
    const size = binSize || Math.ceil(range / Math.min(30, Math.ceil(range / 8)));
    for (let b = minV; b <= maxV; b += size)
      bins.push({ label: String(b), from: b, to: Math.min(b + size - 1, maxV), sys: 0, usr: 0 });
    sysData.forEach(v => {
      const i = Math.min(Math.floor((v - minV) / size), bins.length - 1);
      bins[i].sys++;
    });
    userDataRaw.forEach(v => {
      const i = Math.min(Math.floor((v - minV) / size), bins.length - 1);
      bins[i].usr++;
    });
  }
  return bins;
}

// ══════════════════════════════════════════
// SVG Compare Chart — 2 bars per bin
// ══════════════════════════════════════════
function buildCompareChart(bins, sysN, usrN) {
  const W = 520, H = 180, PAD = { t: 14, r: 16, b: 36, l: 28 };
  const cW = W - PAD.l - PAD.r;
  const cH = H - PAD.t - PAD.b;

  // normalize เป็น % ของแต่ละกลุ่ม
  const sysNorm = bins.map(b => b.sys / sysN);
  const usrNorm = bins.map(b => b.usr / usrN);
  const maxPct  = Math.max(...sysNorm, ...usrNorm) || 1;

  const bW    = cW / bins.length;
  const barW  = Math.max(1, bW * 0.42);
  const xScale = i => PAD.l + i * bW + bW / 2;
  const yScale = v => PAD.t + cH - (v / maxPct) * cH;

  let bars = '';
  bins.forEach((b, i) => {
    const cx   = xScale(i);
    const ySys = yScale(sysNorm[i]);
    const yUsr = yScale(usrNorm[i]);
    const hSys = PAD.t + cH - ySys;
    const hUsr = PAD.t + cH - yUsr;
    // system bar (ซ้าย)
    if (hSys > 0)
      bars += `<rect x="${cx - barW - 1}" y="${ySys}" width="${barW}" height="${hSys}"
        fill="#4f8ef7" opacity="0.7" rx="2"/>`;
    // user bar (ขวา)
    if (hUsr > 0)
      bars += `<rect x="${cx + 1}" y="${yUsr}" width="${barW}" height="${hUsr}"
        fill="#f472b6" opacity="0.8" rx="2"/>`;
  });

  // x-axis labels (ทุก N bin)
  const step = Math.max(1, Math.floor(bins.length / 8));
  let labels = '';
  bins.forEach((b, i) => {
    if (i % step === 0)
      labels += `<text x="${xScale(i)}" y="${H - 4}" text-anchor="middle"
        font-size="9" fill="#94a3b8">${b.label}</text>`;
  });

  // y-axis
  const yAxis = `<line x1="${PAD.l}" y1="${PAD.t}" x2="${PAD.l}" y2="${PAD.t + cH}"
    stroke="#e0e7ff" stroke-width="1"/>`;
  const xAxis = `<line x1="${PAD.l}" y1="${PAD.t + cH}" x2="${W - PAD.r}" y2="${PAD.t + cH}"
    stroke="#e0e7ff" stroke-width="1"/>`;

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;height:auto;display:block">
    ${yAxis}${xAxis}${bars}${labels}
  </svg>`;
}

// ══════════════════════════════════════════
// stat summary row
// ══════════════════════════════════════════
function statRow(label, sysVal, usrVal, highlight) {
  const diff = usrVal - sysVal;
  const diffStr = diff === 0 ? '=' : (diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1));
  const diffColor = Math.abs(diff) < 1 ? '#94a3b8' : diff > 0 ? '#f87171' : '#34d399';
  return `
    <div style="display:contents">
      <div style="font-size:.72rem;font-weight:700;color:#64748b;padding:.3rem .5rem">${label}</div>
      <div style="font-size:.8rem;font-weight:800;color:#4f8ef7;text-align:center;padding:.3rem 0">${typeof sysVal==='number'?sysVal.toFixed(1):sysVal}</div>
      <div style="font-size:.8rem;font-weight:800;color:#f472b6;text-align:center;padding:.3rem 0">${typeof usrVal==='number'?usrVal.toFixed(1):usrVal}</div>
      <div style="font-size:.75rem;font-weight:800;color:${diffColor};text-align:center;padding:.3rem 0">${typeof diff==='number'?diffStr:'-'}</div>
    </div>`;
}

// ══════════════════════════════════════════
// Build Modal HTML
// ══════════════════════════════════════════
function buildCompareHTML(cfg, sysData, userData, nPeople) {
  const sysStats = calcStats(sysData);   // ไม่ spread — ไม่มี actual ก็ rank = 0
  const usrStats = calcStats(userData);  // ไม่ spread
  const bins     = buildCompareBins(sysData, userData);
  const chart    = buildCompareChart(bins, sysData.length, userData.length);

  return `
  <div id="compare-backdrop" onclick="closeCompareModal()" style="
    position:fixed;inset:0;z-index:8000;
    background:rgba(15,23,60,.45);
    backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;
    padding:1rem;
    animation:fadeIn .25s ease;
  ">
    <div onclick="event.stopPropagation()" style="
      background:#fff;border-radius:24px;
      width:100%;max-width:580px;
      max-height:92vh;overflow-y:auto;
      box-shadow:0 24px 60px rgba(79,142,247,.22);
      animation:slideUp .3s cubic-bezier(.34,1.4,.64,1);
    ">

      <!-- Header -->
      <div style="padding:1.2rem 1.4rem .8rem;border-bottom:1.5px solid #e0e7ff;
        display:flex;align-items:flex-start;justify-content:space-between;gap:1rem">
        <div>
          <div style="font-size:.68rem;font-weight:800;color:#94a3b8;letter-spacing:.07em;text-transform:uppercase;margin-bottom:3px">
            ${t('compareTitle')}
          </div>
          <div style="font-size:1rem;font-weight:800;color:#1e2d5a;line-height:1.3">
            ${cfg.name}
          </div>
        </div>
        <button onclick="closeCompareModal()" style="
          background:#f1f5f9;border:none;border-radius:50%;
          width:32px;height:32px;cursor:pointer;font-size:1rem;color:#64748b;
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
          transition:background .15s"
          onmouseover="this.style.background='#e2e8f0'"
          onmouseout="this.style.background='#f1f5f9'">✕</button>
      </div>

      <!-- Legend -->
      <div style="padding:.8rem 1.4rem .2rem;display:flex;gap:1.2rem;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:6px;font-size:.75rem;font-weight:700;color:#4f8ef7">
          <span style="display:inline-block;width:14px;height:10px;background:#4f8ef7;border-radius:2px;opacity:.8"></span>
          ${t('compareSysLabel', SIM_ROUNDS)}
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:.75rem;font-weight:700;color:#f472b6">
          <span style="display:inline-block;width:14px;height:10px;background:#f472b6;border-radius:2px;opacity:.85"></span>
          ${t('compareUserLabel', nPeople)}
        </div>
        <div style="font-size:.68rem;color:#94a3b8;font-weight:600;margin-left:auto;align-self:center">
          ${t('compareAxisY')}
        </div>
      </div>

      <!-- Chart -->
      <div style="padding:.4rem 1.1rem .6rem">
        <div style="background:#f8faff;border:1.5px solid #dde6ff;border-radius:14px;padding:.8rem .6rem .4rem">
          ${chart}
        </div>
      </div>

      <!-- Stat comparison table -->
      <div style="padding:.2rem 1.4rem .8rem">
        <div style="font-size:.65rem;font-weight:800;color:#94a3b8;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.5rem">
          ${t('compareStatsTitle')}
        </div>
        <div style="
          display:grid;grid-template-columns:auto 1fr 1fr 1fr;
          gap:0;border:1.5px solid #e0e7ff;border-radius:12px;overflow:hidden;
          font-family:'Sora','Noto Sans Thai',sans-serif;
        ">
          <!-- header row -->
          <div style="background:#f1f5f9;padding:.35rem .5rem;font-size:.65rem;font-weight:800;color:#94a3b8"></div>
          <div style="background:#eff5ff;padding:.35rem 0;font-size:.65rem;font-weight:800;color:#4f8ef7;text-align:center">${t('compareSys')}</div>
          <div style="background:#fce7f3;padding:.35rem 0;font-size:.65rem;font-weight:800;color:#f472b6;text-align:center">${t('compareUser')}</div>
          <div style="background:#f8faff;padding:.35rem 0;font-size:.65rem;font-weight:800;color:#94a3b8;text-align:center">${t('compareDiff')}</div>
          ${statRow(t('compareRowMean'),   sysStats.mean,   usrStats.mean)}
          ${statRow(t('compareRowMedian'), sysStats.median, usrStats.median)}
          ${statRow(t('compareRowSD'),     sysStats.sd,     usrStats.sd)}
          ${statRow(t('compareP10'),  sysStats.p10, usrStats.p10)}
          ${statRow(t('compareP90'),  sysStats.p90, usrStats.p90)}
          ${statRow(t('compareRowMin'),    sysStats.min,    usrStats.min)}
          ${statRow(t('compareRowMax'),    sysStats.max,    usrStats.max)}
        </div>
      </div>

      <!-- Re-simulate with different N -->
      <div style="padding:.2rem 1.4rem 1.2rem;display:flex;gap:.6rem;align-items:center;flex-wrap:wrap">
        <span style="font-size:.75rem;font-weight:700;color:#64748b">${t('compareResim')}</span>
        <input type="number" id="compare-n-input" value="${nPeople}" min="10" max="${COMPARE_MAX_PEOPLE}"
          style="width:80px;padding:5px 8px;border-radius:10px;border:1.5px solid #dde6ff;
          font-size:.85rem;font-family:'Noto Sans Thai',sans-serif;color:#1e2d5a">
        <span style="font-size:.68rem;color:#94a3b8">${t('compareMax', COMPARE_MAX_PEOPLE)}</span>
        <button onclick="rerunCompare()" style="
          padding:.45rem 1rem;background:linear-gradient(120deg,#4f8ef7,#a78bfa);
          border:none;border-radius:var(--r-pill,999px);color:#fff;
          font-weight:800;font-size:.8rem;font-family:'Noto Sans Thai',sans-serif;
          cursor:pointer;box-shadow:0 3px 10px rgba(79,142,247,.25);
          transition:transform .12s"
          onmouseover="this.style.transform='translateY(-1px)'"
          onmouseout="this.style.transform=''">${t('btnRun')}</button>
        <button onclick="closeCompareModal()" style="
          margin-left:auto;padding:.45rem 1.1rem;
          background:linear-gradient(120deg,#4f8ef7,#f472b6);
          border:none;border-radius:var(--r-pill,999px);color:#fff;
          font-weight:800;font-size:.8rem;font-family:'Noto Sans Thai',sans-serif;
          cursor:pointer;box-shadow:0 3px 10px rgba(79,142,247,.2)">${t('btnClose')}</button>
      </div>
    </div>
  </div>`;
}

// ══════════════════════════════════════════
// Public API
// ══════════════════════════════════════════
let _compareCfg = null;
let _compareSysData = null;

function showCompareModal(cfg, nPeople) {
  _compareCfg = cfg;
  nPeople = Math.min(Math.max(10, nPeople), COMPARE_MAX_PEOPLE);

  // system simulation (5000 รอบ)
  _compareSysData = runSimulation(cfg);

  // user simulation (N คน)
  const userData = runCompare(cfg, nPeople);

  _injectCompareModal(cfg, _compareSysData, userData, nPeople);
}

function rerunCompare() {
  const n = parseInt(document.getElementById('compare-n-input')?.value) || 500;
  closeCompareModal();
  showCompareModal(_compareCfg, n);
}

function _injectCompareModal(cfg, sysData, userData, nPeople) {
  const wrapper = document.createElement('div');
  wrapper.id = 'compare-modal-root';
  wrapper.innerHTML = buildCompareHTML(cfg, sysData, userData, nPeople);
  document.body.appendChild(wrapper);
}

function closeCompareModal() {
  const el = document.getElementById('compare-modal-root');
  if (el) el.remove();
}
