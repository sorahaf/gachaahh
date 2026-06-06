// stats-modal.js
// Monte Carlo simulation + Bell Curve modal
// แสดงหลังล้างตู้ครบ — เรียกผ่าน showStatsModal(cfg, actualPulls)

// ══════════════════════════════════════════
// Simulation Engine
// จำลอง N รอบ คืน array ของจำนวนครั้งที่ใช้จนครบตู้
// ══════════════════════════════════════════
const SIM_ROUNDS = 5000;

function simulateBig(cfg) {
  const results = [];
  const totalRares = cfg.items.rare.length;

  for (let r = 0; r < SIM_ROUNDS; r++) {
    let pulls = 0, pullsSinceRare = 0, gotFirstRare = false;
    const gotRares = new Set();

    while (gotRares.size < totalRares) {
      pulls++;
      const limit  = gotFirstRare ? cfg.guarantee2 : cfg.guarantee1;
      const isPity = pullsSinceRare >= (limit - 1);
      const allRareNames = cfg.items.rare.map(i => i.name);
      const unobtained   = allRareNames.filter(n => !gotRares.has(n));

      if (isPity && unobtained.length > 0) {
        const pick = unobtained[Math.floor(Math.random() * unobtained.length)];
        gotRares.add(pick);
        pullsSinceRare = 0;
        gotFirstRare = true;
      } else if (Math.random() < cfg.rareRate) {
        gotFirstRare = true;
        const pick = cfg.items.rare[Math.floor(Math.random() * cfg.items.rare.length)];
        gotRares.add(pick.name);
        pullsSinceRare = 0;
      } else {
        pullsSinceRare++;
      }
    }
    results.push(pulls);
  }
  return results;
}

function simulateStepPool(cfg) {
  const results = [];
  const n = cfg.items.length;

  for (let r = 0; r < SIM_ROUNDS; r++) {
    let remaining = cfg.items.map((_, i) => i); // index ที่เหลือ
    let pulls = 0;

    while (remaining.length > 0) {
      // drawWeights row ตาม pull index
      const drawRow = cfg.drawWeights
        ? cfg.drawWeights[Math.min(pulls, cfg.drawWeights.length - 1)]
        : null;

      // สร้าง pool จาก remaining + weight ของ draw นี้
      const pool = remaining.map(origIdx => ({
        origIdx,
        weight: drawRow ? drawRow[origIdx] : (cfg.items[origIdx].weight || 1)
      }));

      const totalW = pool.reduce((s, p) => s + p.weight, 0);
      let rng = Math.random() * totalW, acc = 0;
      let chosen = pool[pool.length - 1];
      for (const p of pool) {
        acc += p.weight;
        if (rng <= acc) { chosen = p; break; }
      }

      pulls++;
      const rolled = cfg.items[chosen.origIdx];

      if (rolled.isSpecial) {
        remaining = []; // sweep
      } else {
        remaining = remaining.filter(i => i !== chosen.origIdx);
      }
    }
    results.push(pulls);
  }
  return results;
}

function runSimulation(cfg) {
  if (cfg.cabinetType === 'big') return simulateBig(cfg);
  return simulateStepPool(cfg);
}

// ══════════════════════════════════════════
// Statistics helpers
// ══════════════════════════════════════════
function calcStats(data) {
  const sorted = [...data].sort((a, b) => a - b);
  const n      = sorted.length;
  const mean   = data.reduce((s, v) => s + v, 0) / n;
  const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const sd     = Math.sqrt(variance);
  const median = sorted[Math.floor(n / 2)];
  const p10    = sorted[Math.floor(n * 0.10)];
  const p25    = sorted[Math.floor(n * 0.25)];
  const p75    = sorted[Math.floor(n * 0.75)];
  const p90    = sorted[Math.floor(n * 0.90)];
  const min    = sorted[0];
  const max    = sorted[n - 1];

  // percentile rank ของค่าจริง
  const rank   = sorted.filter(v => v <= data._actual).length / n * 100;

  return { mean, sd, median, p10, p25, p75, p90, min, max, rank, sorted };
}

// จัด bin สำหรับ histogram
// ถ้า range <= 20 (ตู้ step 10/12 draws) → 1 bin ต่อ 1 ค่า
// ถ้า range กว้าง (ตู้ใหญ่) → auto bin ~28
function buildBins(sorted) {
  const min = sorted[0], max = sorted[sorted.length - 1];
  const range = max - min || 1;

  const useExact = range <= 20;
  const bins = [];

  if (useExact) {
    for (let v = min; v <= max; v++) {
      bins.push({ from: v, to: v, count: 0, label: String(v) });
    }
    for (const v of sorted) {
      const idx = v - min;
      if (bins[idx]) bins[idx].count++;
    }
  } else {
    const binCount = Math.min(30, Math.ceil(range / Math.ceil(range / 28)));
    const size = Math.ceil(range / binCount);
    for (let b = min; b <= max; b += size) {
      bins.push({ from: b, to: Math.min(b + size - 1, max), count: 0, label: String(b) });
    }
    for (const v of sorted) {
      const idx = Math.min(Math.floor((v - min) / size), bins.length - 1);
      bins[idx].count++;
    }
  }
  return bins;
}

// ── zone ของตัวเลขจริง ──
function getZone(rank) {
  if (rank <= 10)  return { label: 'โชคดีมาก! 🍀',    color: '#34d399', bg: '#d1fae5' };
  if (rank <= 25)  return { label: 'โชคดีกว่าคนส่วนใหญ่ 😊', color: '#60a5fa', bg: '#dbeafe' };
  if (rank <= 75)  return { label: 'ปกติธรรมดา 😌',     color: '#a78bfa', bg: '#f3e8ff' };
  if (rank <= 90)  return { label: 'โชคร้ายกว่าเพื่อน 😅', color: '#fb923c', bg: '#ffedd5' };
  return            { label: 'โชคร้ายมากก 😭',          color: '#f87171', bg: '#fee2e2' };
}

// ══════════════════════════════════════════
// SVG Bell Curve Chart
// ══════════════════════════════════════════
function buildChart(bins, stats, actualPulls, zone) {
  const W = 520, H = 160, PAD = { t: 14, r: 16, b: 32, l: 16 };
  const cW = W - PAD.l - PAD.r;
  const cH = H - PAD.t - PAD.b;

  const maxCount = Math.max(...bins.map(b => b.count));
  const bW       = cW / bins.length;

  // x-scale: bin index → px
  const xScale = (i) => PAD.l + i * bW;
  // y-scale: count → px (flip)
  const yScale = (c) => PAD.t + cH - (c / maxCount) * cH;

  // ─ smooth bell curve path (bezier through bin tops) ─
  const pts = bins.map((b, i) => ({
    x: xScale(i) + bW / 2,
    y: yScale(b.count)
  }));

  let curvePath = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i+1].x) / 2;
    const my = (pts[i].y + pts[i+1].y) / 2;
    curvePath += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
  }
  curvePath += ` L ${pts[pts.length-1].x} ${pts[pts.length-1].y}`;

  // ─ fill area ─
  const fillPath = curvePath +
    ` L ${pts[pts.length-1].x} ${PAD.t + cH}` +
    ` L ${pts[0].x} ${PAD.t + cH} Z`;

  // ─ actual marker position (clamped within chart) ─
  const minVal  = bins[0].from;
  const maxVal  = bins[bins.length - 1].to;
  const clampedActual = Math.max(minVal, Math.min(actualPulls, maxVal));
  const isExactBins   = (bins[0].from === bins[0].to);
  let xActual;
  if (isExactBins) {
    // snap to bin center
    const binIdx = Math.min(clampedActual - minVal, bins.length - 1);
    xActual = xScale(binIdx) + bW / 2;
  } else {
    xActual = PAD.l + ((clampedActual - minVal) / (maxVal - minVal + 1)) * cW;
  }

  // ─ median marker ─
  let xMedian;
  if (isExactBins) {
    const mIdx = Math.min(Math.round(stats.median) - minVal, bins.length - 1);
    xMedian = xScale(Math.max(0, mIdx)) + bW / 2;
  } else {
    xMedian = PAD.l + ((stats.median - minVal) / (maxVal - minVal + 1)) * cW;
  }

  // ─ x-axis labels ─
  const isExact = (bins[0].from === bins[0].to); // 1 bin per value
  let xLabels = [];
  if (isExact) {
    // แสดงทุก label (ตู้ step ≤ 12 draw)
    xLabels = bins.map((b, i) => ({ x: xScale(i) + bW / 2, label: b.label }));
  } else {
    // แสดงแค่ 5-6 จุด
    const labelCount = 5;
    const labelStep  = Math.floor(bins.length / (labelCount - 1));
    for (let i = 0; i < bins.length; i += labelStep) {
      xLabels.push({ x: xScale(i) + bW / 2, label: bins[i].label });
    }
    xLabels.push({ x: xScale(bins.length - 1) + bW / 2, label: String(bins[bins.length - 1].to) });
  }


  return `
  <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;height:auto;display:block;overflow:visible">
    <defs>
      <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#60a5fa" stop-opacity=".35"/>
        <stop offset="100%" stop-color="#60a5fa" stop-opacity=".04"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <!-- grid lines -->
    ${[0.25, 0.5, 0.75, 1].map(f =>
      `<line x1="${PAD.l}" y1="${PAD.t + cH * (1 - f)}"
             x2="${PAD.l + cW}" y2="${PAD.t + cH * (1 - f)}"
             stroke="#e0e7ff" stroke-width="1" stroke-dasharray="3,3"/>`
    ).join('')}

    <!-- bars (exact bins) or fill (wide range) -->
    ${bins[0].from === bins[0].to
      ? bins.map((b, i) => {
          const x = xScale(i) + bW * 0.12;
          const w = bW * 0.76;
          const h = (b.count / maxCount) * cH;
          const y = PAD.t + cH - h;
          const isActualBin = (b.from === clampedActual);
          return `<rect x="${x}" y="${y}" width="${w}" height="${h}"
            rx="3" fill="${isActualBin ? zone.color : '#93c5fd'}" opacity="${isActualBin ? 0.9 : 0.55}"/>`;
        }).join('')
      : `<path d="${fillPath}" fill="url(#curveGrad)"/>`
    }

    <!-- curve line -->
    <path d="${curvePath}" fill="none"
          stroke="${bins[0].from === bins[0].to ? '#3b82f6' : '#4f8ef7'}"
          stroke-width="2" stroke-linejoin="round" stroke-linecap="round" opacity="0.6"/>

    <!-- median line -->
    <line x1="${xMedian}" y1="${PAD.t}" x2="${xMedian}" y2="${PAD.t + cH}"
          stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,3" opacity=".7"/>
    <text x="${xMedian}" y="${PAD.t - 3}" text-anchor="middle"
          font-size="9" fill="#a78bfa" font-weight="700" font-family="monospace">
      ค่ากลาง ${stats.median}
    </text>

    <!-- actual marker -->
    <line x1="${xActual}" y1="${PAD.t}" x2="${xActual}" y2="${PAD.t + cH}"
          stroke="${zone.color}" stroke-width="2.5" filter="url(#glow)"/>
    <!-- marker dot -->
    <circle cx="${xActual}" cy="${PAD.t + 2}" r="5"
            fill="${zone.color}" filter="url(#glow)"/>
    <circle cx="${xActual}" cy="${PAD.t + 2}" r="3" fill="white"/>

    <!-- actual label above -->
    <rect x="${Math.min(Math.max(xActual - 20, PAD.l), PAD.l + cW - 40)}" y="${PAD.t - 18}"
          width="40" height="14" rx="7" fill="${zone.color}"/>
    <text x="${Math.min(Math.max(xActual, PAD.l + 20), PAD.l + cW - 20)}" y="${PAD.t - 8}"
          text-anchor="middle" font-size="9" fill="white" font-weight="800" font-family="monospace">
      ${actualPulls} ครั้ง
    </text>

    <!-- x-axis -->
    <line x1="${PAD.l}" y1="${PAD.t + cH}" x2="${PAD.l + cW}" y2="${PAD.t + cH}"
          stroke="#c7d2fe" stroke-width="1.5"/>
    ${xLabels.map(l =>
      `<text x="${l.x}" y="${PAD.t + cH + 12}" text-anchor="middle"
             font-size="8.5" fill="#94a3b8" font-family="monospace">${l.label}</text>`
    ).join('')}
  </svg>`;
}

// ══════════════════════════════════════════
// Modal HTML Builder
// ══════════════════════════════════════════
function buildModalHTML(cfg, actualPulls, stats, bins) {
  const isStepBox = cfg.cabinetType !== 'big';

  // ── banner URL จาก THEME_META ──
  const bannerUrl = (typeof getThemeBanner === 'function') ? getThemeBanner(cfg.theme) : '';

  // ── cost helper ──
  function costLabel(pulls) {
    if (cfg.cabinetType === 'big') {
      const hearts = pulls * cfg.costPerPull * cfg.heartMultiplier;
      return `~${hearts.toLocaleString()} 💜 (฿${calculateTHBCost(hearts).toLocaleString()})`;
    }
    // step pool: sum costMap จนถึง pull นั้น (cap ที่ length)
    const capped = Math.min(pulls, cfg.costMap.length);
    const hearts  = cfg.costMap.slice(0, capped)
      .reduce((s, c) => s + c * cfg.heartMultiplier, 0);
    return `${hearts.toLocaleString()} 💜 (฿${calculateTHBCost(hearts).toLocaleString()})`;
  }

  const zone  = getZone(stats.rank);
  const chart = buildChart(bins, stats, actualPulls, zone);

  const statRows = [
    { label: 'ค่าเฉลี่ย (Mean)',   val: stats.mean.toFixed(1) + ' ครั้ง' },
    { label: 'ค่ากลาง (Median)',   val: stats.median + ' ครั้ง' },
    { label: 'เบี่ยงเบน (SD)',      val: '± ' + stats.sd.toFixed(1) },
    { label: 'โชคดีสุด (P10)',     val: '≤ ' + stats.p10 + ' ครั้ง' },
    { label: 'โชคร้ายสุด (P90)',   val: '≥ ' + stats.p90 + ' ครั้ง' },
  ];

  return `
  <div id="stats-backdrop" onclick="closeStatsModal()" style="
    position:fixed;inset:0;z-index:8000;
    background:rgba(15,23,60,.45);
    backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;
    padding:1rem;
    animation:fadeIn .25s ease;
  ">
    <div onclick="event.stopPropagation()" style="
      background:#fff;
      border-radius:24px;
      width:100%;max-width:560px;
      max-height:92vh;overflow-y:auto;
      box-shadow:0 24px 60px rgba(79,142,247,.22);
      animation:slideUp .3s cubic-bezier(.34,1.4,.64,1);
    ">

      <!-- Banner + Header -->
      <div style="position:relative;border-radius:24px 24px 0 0;overflow:hidden;height:160px;flex-shrink:0;">
        ${bannerUrl ? `
          <div style="
            position:absolute;inset:0;
            background-image:url('${bannerUrl}');
            background-size:cover;
            background-position:center center;
            opacity:.6;filter:saturate(1.15);
          "></div>
        ` : `
          <div style="position:absolute;inset:0;background:linear-gradient(120deg,#dbeafe,#fce7f3);"></div>
        `}
        <!-- fade ล่าง -->
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 15%,rgba(255,255,255,.88) 65%,#fff 100%);"></div>
        <!-- ข้อความทับ -->
        <div style="position:absolute;bottom:0;left:0;right:0;z-index:1;padding:.8rem 1.4rem .9rem;display:flex;align-items:flex-end;justify-content:space-between;gap:1rem;">
          <div>
            <div style="font-size:.65rem;font-weight:800;color:#6b7db3;letter-spacing:.07em;text-transform:uppercase;margin-bottom:3px;text-shadow:0 1px 4px rgba(255,255,255,.9)">
              สถิติการล้างตู้ · ${SIM_ROUNDS.toLocaleString()} simulations
            </div>
            <div style="font-size:1.05rem;font-weight:800;color:#1e2d5a;line-height:1.2;text-shadow:0 1px 6px rgba(255,255,255,.95)">
              ${cfg.name}
            </div>
          </div>
          <button onclick="closeStatsModal()" style="
            background:rgba(255,255,255,.8);border:none;border-radius:50%;
            width:32px;height:32px;cursor:pointer;flex-shrink:0;
            display:flex;align-items:center;justify-content:center;
            font-size:1rem;color:#64748b;
            transition:background .15s;backdrop-filter:blur(4px);
          " onmouseover="this.style.background='rgba(255,255,255,1)'"
            onmouseout="this.style.background='rgba(255,255,255,.8)'">✕</button>
        </div>
      </div>

      <!-- Zone badge + your result -->
      <div style="padding:1rem 1.4rem .6rem;display:flex;align-items:center;gap:.85rem;flex-wrap:wrap;">
        <div style="
          background:${zone.bg};
          border:2px solid ${zone.color};
          border-radius:16px;
          padding:.7rem 1.1rem;
          flex:1;min-width:160px;
        ">
          <div style="font-size:.65rem;font-weight:800;color:${zone.color};letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px">
            ผลของคุณ
          </div>
          <div style="font-size:1.75rem;font-weight:900;color:${zone.color};font-family:'Sora',monospace;line-height:1">
            ${actualPulls} ครั้ง
          </div>
          <div style="font-size:.72rem;font-weight:700;color:${zone.color};margin-top:4px;opacity:.85">
            ${zone.label}
          </div>
        </div>

        <div style="flex:2;min-width:160px;">
          <!-- percentile bar -->
          <div style="font-size:.7rem;font-weight:700;color:#64748b;margin-bottom:5px">
            คุณอยู่ใน Top <span style="color:${zone.color};font-size:.88rem;font-weight:900">${stats.rank.toFixed(0)}%</span> แรก
          </div>
          <div style="background:#e0e7ff;border-radius:99px;height:10px;overflow:hidden;">
            <div style="
              width:${stats.rank}%;height:100%;
              background:linear-gradient(90deg,${zone.color},${zone.color}99);
              border-radius:99px;
              transition:width .8s cubic-bezier(.34,1.4,.64,1);
            "></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.63rem;color:#94a3b8;font-weight:600;margin-top:3px;">
            <span>โชคดีสุด</span><span>โชคร้ายสุด</span>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div style="padding:.2rem 1.1rem .6rem;">
        <div style="font-size:.68rem;font-weight:800;color:#94a3b8;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.4rem;padding-left:.3rem">
          การกระจาย — จำนวนครั้งที่ใช้จนครบตู้
        </div>
        <div style="background:#f8faff;border:1.5px solid #dde6ff;border-radius:14px;padding:.8rem .6rem .4rem;">
          ${chart}
          <div style="display:flex;gap:1rem;margin-top:.5rem;padding:0 .3rem;flex-wrap:wrap;">
            <span style="display:flex;align-items:center;gap:4px;font-size:.68rem;font-weight:700;color:#64748b;">
              <span style="display:inline-block;width:14px;height:3px;background:#4f8ef7;border-radius:2px"></span>Distribution
            </span>
            <span style="display:flex;align-items:center;gap:4px;font-size:.68rem;font-weight:700;color:#a78bfa;">
              <span style="display:inline-block;width:14px;height:2px;background:#a78bfa;border-radius:2px;border-top:2px dashed #a78bfa"></span>ค่ากลาง
            </span>
            <span style="display:flex;align-items:center;gap:4px;font-size:.68rem;font-weight:700;color:${zone.color};">
              <span style="display:inline-block;width:10px;height:10px;background:${zone.color};border-radius:50%;"></span>ผลของคุณ
            </span>
          </div>
        </div>
      </div>

      <!-- Stat grid -->
      <div style="padding:.2rem 1.4rem .8rem;">
        <div style="
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(130px,1fr));
          gap:.4rem;
        ">
          ${statRows.map(s => `
            <div style="
              background:#f8faff;border:1.5px solid #e0e7ff;
              border-radius:12px;padding:.45rem .7rem;
            ">
              <div style="font-size:.62rem;font-weight:700;color:#94a3b8">${s.label}</div>
              <div style="font-size:.9rem;font-weight:800;color:#1e2d5a;font-family:'Sora',monospace">${s.val}</div>
            </div>
          `).join('')}
          <!-- ต้นทุนของคุณ -->
          <div style="
            background:linear-gradient(120deg,#eff8ff,#fce7f3);
            border:1.5px solid #c7d2fe;
            border-radius:12px;padding:.45rem .7rem;
            grid-column:1/-1;
          ">
            <div style="font-size:.62rem;font-weight:700;color:#6b7db3">ต้นทุนของคุณรอบนี้</div>
            <div style="font-size:.88rem;font-weight:800;color:#1e2d5a;font-family:'Sora',monospace">${costLabel(actualPulls)}</div>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div style="padding:0 1.4rem .5rem;">
        <div style="
          background:#f8faff;border:1.5px solid #e0e7ff;
          border-radius:12px;padding:.5rem .8rem;
          font-size:.62rem;font-weight:600;color:#94a3b8;
          line-height:1.6;text-align:center;
        ">
          ⚠️ Fan-made simulator for entertainment only. Rates and results may not reflect actual in-game mechanics. Play for fun! · <strong style="color:#6b7db3">#FanHeartopia</strong>
        </div>
      </div>

      <!-- Footer button -->
      <div style="padding:.2rem 1.4rem 1.2rem;display:flex;flex-direction:column;gap:.6rem;">
        <button onclick="downloadStatsCard()" style="
          width:100%;padding:.68rem;
          background:linear-gradient(120deg,#a78bfa,#6366f1);
          border:none;border-radius:var(--r-pill,999px);
          color:#fff;font-weight:800;font-size:.88rem;
          font-family:var(--font-ui,'Noto Sans Thai',sans-serif);
          cursor:pointer;
          box-shadow:0 4px 14px rgba(99,102,241,.3);
          transition:transform .12s,box-shadow .12s;
          display:flex;align-items:center;justify-content:center;gap:6px;
        "
        onmouseover="this.style.transform='translateY(-2px)'"
        onmouseout="this.style.transform=''">
          ⬇️ บันทึกรูปสรุป
        </button>
        <button onclick="closeStatsModal()" style="
          width:100%;padding:.75rem;
          background:linear-gradient(120deg,#4f8ef7,#f472b6);
          border:none;border-radius:var(--r-pill,999px);
          color:#fff;font-weight:800;font-size:.95rem;
          font-family:var(--font-ui,'Noto Sans Thai',sans-serif);
          cursor:pointer;
          box-shadow:0 4px 14px rgba(79,142,247,.3);
          transition:transform .12s,box-shadow .12s;
        "
        onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 7px 20px rgba(79,142,247,.35)'"
        onmouseout="this.style.transform='';this.style.boxShadow='0 4px 14px rgba(79,142,247,.3)'"
        onmousedown="this.style.transform='translateY(2px)'"
        >ปิด</button>
      </div>
    </div>
  </div>

  <style>
    @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
    @keyframes slideUp { from { opacity:0; transform:translateY(30px) scale(.96) } to { opacity:1; transform:none } }
  </style>`;
}

// ══════════════════════════════════════════
// Public API
// ══════════════════════════════════════════

let _shareData = null;

function showStatsModal(cfg, actualPulls) {
  const rawData = runSimulation(cfg);
  rawData._actual = actualPulls;
  const stats = calcStats(rawData);
  const bins  = buildBins(stats.sorted);
  _shareData = { cfg, actualPulls, stats };

  const wrapper = document.createElement('div');
  wrapper.id = 'stats-modal-root';
  wrapper.innerHTML = buildModalHTML(cfg, actualPulls, stats, bins);
  document.body.appendChild(wrapper);
}

function closeStatsModal() {
  const el = document.getElementById('stats-modal-root');
  if (el) el.remove();
}

// ── Download modal as PNG via dom-to-image-more ──
function downloadStatsCard() {
  const modalInner = document.querySelector('#stats-modal-root [onclick="event.stopPropagation()"]');
  if (!modalInner) return;

  function doCapture() {
    const btns = modalInner.querySelectorAll('button');
    btns.forEach(b => { b._origDisplay = b.style.display; b.style.display = 'none'; });

    // clone ออกมา render นอกหน้าจอ เพื่อให้ได้ความสูงเต็ม ไม่ถูก max-height clip
    const clone = modalInner.cloneNode(true);
    const actualWidth = modalInner.getBoundingClientRect().width;
    clone.style.cssText = `
      position:fixed; left:-9999px; top:0;
      width:${actualWidth}px; max-height:none; overflow:visible;
      border-radius:24px; background:#fff;
    `;
    document.body.appendChild(clone);

    setTimeout(() => {
      domtoimage.toPng(clone, {
        scale: 2,
        bgcolor: '#ffffff',
        style: { borderRadius: '24px' }
      }).then(dataUrl => {
        document.body.removeChild(clone);
        btns.forEach(b => { b.style.display = b._origDisplay || ''; });
        const a = document.createElement('a');
        a.href = dataUrl; a.download = 'fan-hearto-result.png';
        a.click();
      }).catch(() => {
        document.body.removeChild(clone);
        btns.forEach(b => { b.style.display = b._origDisplay || ''; });
        alert('ไม่สามารถบันทึกรูปได้ ลองอีกครั้ง');
      });
    }, 300); // รอให้ font/image โหลด
  }

  if (typeof domtoimage === 'undefined') {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/dom-to-image-more/3.4.0/dom-to-image-more.min.js';
    s.onload = doCapture;
    document.head.appendChild(s);
  } else {
    doCapture();
  }
}
