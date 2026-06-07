// i18n.js — Internationalization for Heartopia Gacha Simulator
// To add a new language: add a new key to LANGS with all the same keys as 'th'

const LANGS = {

  th: {
    // index.html
    navBack: 'หน้าหลัก',
    portalTitle:      '✨ Fan-made Hearto Gacha Sim ✨',
    portalSub:        'เลือกตู้สุ่มที่ต้องการทดสอบ',
    groupBig:         '🏛️ ตู้ใหญ่',
    groupSmall:       '🎟️ ตู้ตั๋วเล็ก',
    groupCollab:      '🤩 ตู้คอลแลป',
    groupHeart:       '💙❤️ ตู้หัวใจเล็ก',
    badgePityPool:    'Pity Pool',
    badgeTicketStep:  'Ticket Step',
    badgeHeartStep:   'Heart Step',

    // simulator.html — selector & buttons
    selectCabinet:    '🗂️ เลือกตู้ย่อย',
    pull1:            '🎲 สุ่ม 1 ครั้ง',
    pull10:           '🎰 สุ่ม 10 ครั้ง',
    btnReset:         '🔄 รีเซ็ต',
    btnCompare:       '📊 เปรียบเทียบ',
    stagePlaceholder: '💙 กดปุ่มสุ่มเพื่อเริ่มต้น',
    debugTitle:       '📊 อัตราสุ่ม (Debug)',
    btnResetAll:      '🚨 รีเซ็ตทุกตู้',
    historyTitle:     '📜 ประวัติการสุ่มตู้นี้',

    // simulator.html — chips
    chipPulls:        'สุ่มสะสม',
    chipTickets:      (t) => `🎟️ ${t} ตั๋ว`,
    chipHearts:       'หัวใจสุทธิ',
    chipTHB:          'บาทสะสม',
    chipPity:         (since, limit, rem) => `Pity (อีก ${rem})`,
    chipRare:         'Rare ไม่ซ้ำ',
    chipObtained:     'ได้รับแล้ว',
    chipRemaining:    'เหลือในตู้',
    chipCleared:      '🎉 เคลียร์ตู้สมบูรณ์!',

    // simulator.html — debug box
    debugGuarantee:   (g1, g2) => `${g1} ครั้งแรก / ${g2} ถัดไป`,
    debugItemsLeft:   'ไอเทมคงเหลือ',
    debugTotalCost:   'ราคารวมทั้งตู้',

    // simulator.html — misc
    cabinetCleared:   'ล้างตู้แล้ว',
    toastCleared:     'ตู้นี้เคลียร์ครบแล้ว! กรุณารีเซ็ตก่อน 🏆',
    toastRebate:      (tickets, hearts) => `🎁 รีเบท! ได้ตั๋วฟรี +${tickets} ใบ (ประหยัด ${hearts} 💜)`,
    rebateLabel:      (target, tickets) => `ครบ ${target} ครั้ง — รีเบทตั๋วฟรี`,
    confirmReset:     'รีเซ็ตสถานะตู้ย่อยนี้ใช่ไหม?',
    confirmResetAll:  '🚨 ล้างข้อมูลทุกตู้ทั้งหมด ยืนยัน?',
    cabinetNotFound:  'ไม่พบตู้นี้',

    // stats-modal.js
    statsTitle:       (rounds) => `สถิติการล้างตู้ · ${rounds.toLocaleString()} simulations`,
    statsYourResult:  'ผลของคุณ',
    statsPulls:       (n) => `${n} ครั้ง`,
    statsTopPct:      (pct) => `คุณอยู่ใน Top ${pct}% แรก`,
    statsLucky:       'โชคดีสุด',
    statsUnlucky:     'โชคร้ายสุด',
    statsDistTitle:   'การกระจาย — จำนวนครั้งที่ใช้จนครบตู้',
    statsMedianLabel: (m) => `ค่ากลาง ${m}`,
    statsLegendDist:  'Distribution',
    statsLegendMed:   'ค่ากลาง',
    statsLegendYours: 'ผลของคุณ',
    statRowMean:      'ค่าเฉลี่ย (Mean)',
    statRowMedian:    'ค่ากลาง (Median)',
    statRowSD:        'เบี่ยงเบน (SD)',
    statRowP10:       'โชคดีสุด (P10)',
    statRowP90:       'โชคร้ายสุด (P90)',
    statRowCost:      'ต้นทุนของคุณรอบนี้',
    statValPulls:     (n) => `${n} ครั้ง`,
    btnSaveCard:      '⬇️ บันทึกรูปสรุป',
    btnClose:         'ปิด',
    saveError:        'ไม่สามารถบันทึกรูปได้ ลองอีกครั้ง',

    // zone labels
    zoneSuperLucky:   'โชคดีมาก! 🍀',
    zoneGoodLucky:    'โชคดีกว่าคนส่วนใหญ่ 😊',
    zoneNormal:       'ปกติธรรมดา 😌',
    zoneBadLucky:     'โชคร้ายกว่าเพื่อน 😅',
    zoneSuperBad:     'โชคร้ายมากก 😭',

    // simulator.html — debug panel labels
    debugEngine:         'Engine',
    debugRareRate:       'Rare Rate',
    debugCommonRate:     'Common Rate',
    debugGuaranteeLabel: 'Guarantee',
    debugSpecialAvg:     'Special avg',
    debugRareAvg:        'Rare avg',
    debugNormalAvg:      'Normal avg',

    // compare stat row labels
    compareRowMean:   'Mean',
    compareRowMedian: 'Median',
    compareRowSD:     'SD',
    compareRowMin:    'Min',
    compareRowMax:    'Max',

    // compare-modal.js (th)
    compareTitle:     'เปรียบเทียบการกระจาย',
    compareSysLabel:  (rounds) => `ระบบ (${rounds.toLocaleString()} รอบ)`,
    compareUserLabel: (n) => `จำลองคน (${n.toLocaleString()} คน)`,
    compareAxisY:     'แกน Y = สัดส่วน (%)',
    compareStatsTitle:'สถิติเปรียบเทียบ',
    compareSys:       'ระบบ',
    compareUser:      'คนจริง',
    compareDiff:      'ต่าง',
    compareP10:       'P10 (โชคดี)',
    compareP90:       'P90 (โชคร้าย)',
    compareResim:     'จำลองใหม่:',
    compareMax:       (max) => `max ${max.toLocaleString()}`,
    btnRun:           '▶ รัน',
  },

  en: {
    // index.html
    navBack:          'Home',
    portalTitle:      '✨ Fan-made Hearto Gacha Sim ✨',
    portalSub:        'Select a gacha to test',
    groupBig:         '🏛️ Big Gacha',
    groupSmall:       '🎟️ Small Ticket Gacha',
    groupCollab:      '🤩 Collab Gacha',
    groupHeart:       '💙❤️ Small Heart Gacha',
    badgePityPool:    'Pity Pool',
    badgeTicketStep:  'Ticket Step',
    badgeHeartStep:   'Heart Step',

    // simulator.html — selector & buttons
    selectCabinet:    '🗂️ Select Sub-Gacha',
    pull1:            '🎲 Pull 1',
    pull10:           '🎰 Pull 10',
    btnReset:         '🔄 Reset',
    btnCompare:       '📊 Compare',
    stagePlaceholder: '💙 Press pull to start',
    debugTitle:       '📊 Pull Rates (Debug)',
    btnResetAll:      '🚨 Reset All Gachas',
    historyTitle:     '📜 Pull History',

    // simulator.html — chips
    chipPulls:        'Total Pulls',
    chipTickets:      (t) => `🎟️ ${t} tickets`,
    chipHearts:       'Hearts Used',
    chipTHB:          'THB Spent',
    chipPity:         (since, limit, rem) => `Pity (${rem} left)`,
    chipRare:         'Unique Rares',
    chipObtained:     'Obtained',
    chipRemaining:    'Remaining',
    chipCleared:      '🎉 Gacha Cleared!',

    // simulator.html — debug box
    debugGuarantee:   (g1, g2) => `1st guarantee: ${g1} · After: ${g2}`,
    debugItemsLeft:   'Items Remaining',
    debugTotalCost:   'Total Gacha Cost',

    // simulator.html — misc
    cabinetCleared:   'Gacha Cleared',
    toastCleared:     'Gacha fully cleared! Please reset first 🏆',
    toastRebate:      (tickets, hearts) => `🎁 Rebate! +${tickets} free tickets (saved ${hearts} 💜)`,
    rebateLabel:      (target, tickets) => `${target} pulls — free ticket rebate`,
    confirmReset:     'Reset this sub-gacha?',
    confirmResetAll:  '🚨 Clear ALL gacha data? Confirm?',
    cabinetNotFound:  'Gacha not found',

    // stats-modal.js
    statsTitle:       (rounds) => `Gacha Clear Stats · ${rounds.toLocaleString()} simulations`,
    statsYourResult:  'Your Result',
    statsPulls:       (n) => `${n} pulls`,
    statsTopPct:      (pct) => `You are in the top ${pct}%`,
    statsLucky:       'Luckiest',
    statsUnlucky:     'Unluckiest',
    statsDistTitle:   'Distribution — pulls to clear gacha',
    statsMedianLabel: (m) => `Median ${m}`,
    statsLegendDist:  'Distribution',
    statsLegendMed:   'Median',
    statsLegendYours: 'Your Result',
    statRowMean:      'Mean',
    statRowMedian:    'Median',
    statRowSD:        'Std Dev (SD)',
    statRowP10:       'Luckiest (P10)',
    statRowP90:       'Unluckiest (P90)',
    statRowCost:      'Your Cost This Run',
    statValPulls:     (n) => `${n} pulls`,
    btnSaveCard:      '⬇️ Save Summary Card',
    btnClose:         'Close',
    saveError:        'Failed to save image, please try again',

    // zone labels
    zoneSuperLucky:   'Super Lucky! 🍀',
    zoneGoodLucky:    'Luckier Than Most 😊',
    zoneNormal:       'Average 😌',
    zoneBadLucky:     'Unluckier Than Most 😅',
    zoneSuperBad:     'Really Unlucky 😭',

    // simulator.html — debug panel labels
    debugEngine:         'Engine',
    debugRareRate:       'Rare Rate',
    debugCommonRate:     'Common Rate',
    debugGuaranteeLabel: 'Guarantee',
    debugSpecialAvg:     'Special avg',
    debugRareAvg:        'Rare avg',
    debugNormalAvg:      'Normal avg',

    // compare stat row labels
    compareRowMean:   'Mean',
    compareRowMedian: 'Median',
    compareRowSD:     'SD',
    compareRowMin:    'Min',
    compareRowMax:    'Max',

    // compare-modal.js
    compareTitle:     'Distribution Comparison',
    compareSysLabel:  (rounds) => `System (${rounds.toLocaleString()} rounds)`,
    compareUserLabel: (n) => `Simulated Users (${n.toLocaleString()})`,
    compareAxisY:     'Y-axis = proportion (%)',
    compareStatsTitle:'Stats Comparison',
    compareSys:       'System',
    compareUser:      'Users',
    compareDiff:      'Diff',
    compareP10:       'P10 (Lucky)',
    compareP90:       'P90 (Unlucky)',
    compareResim:     'Re-simulate:',
    compareMax:       (max) => `max ${max.toLocaleString()}`,
    btnRun:           '▶ Run',
  }

};

// ── Active language (default: th) ──
let _lang = localStorage.getItem('hearto_lang') || 'th';

function setLang(lang) {
  if (!LANGS[lang]) return;
  _lang = lang;
  localStorage.setItem('hearto_lang', lang);
}

function getLang() { return _lang; }

// t('key') or t('key', arg1, arg2, ...)
function t(key, ...args) {
  const val = LANGS[_lang]?.[key] ?? LANGS['th']?.[key] ?? key;
  return typeof val === 'function' ? val(...args) : val;
}

// ══════════════════════════════════════════
// Apply translations to data-i18n elements
// ══════════════════════════════════════════
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = LANGS[_lang]?.[key] ?? LANGS['th']?.[key];
    if (val && typeof val === 'string') el.textContent = val;
  });
  document.documentElement.lang = _lang;
}

// ══════════════════════════════════════════
// Language Switcher UI
// Call this once after DOM ready
// ══════════════════════════════════════════
function renderLangSwitcher(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const langNames = { th: '🇹🇭', en: '🌐 EN' };
  container.innerHTML = Object.keys(LANGS).map(lang =>
    `<button onclick="switchLang('${lang}')" class="lang-btn ${_lang === lang ? 'active' : ''}"
      style="padding:4px 10px;border-radius:99px;border:1.5px solid ${_lang===lang?'#4f8ef7':'#dde6ff'};
      background:${_lang===lang?'#4f8ef7':'#fff'};color:${_lang===lang?'#fff':'#64748b'};
      font-size:.75rem;font-weight:700;cursor:pointer;transition:all .15s">
      ${langNames[lang] || lang.toUpperCase()}
    </button>`
  ).join('');
}

function switchLang(lang) {
  setLang(lang);
  applyI18n();
  renderLangSwitcher('lang-switcher');
  // re-render dynamic UI if available
  if (typeof render === 'function') render();         // index.html
  if (typeof updateUI === 'function') updateUI();     // simulator.html
  // re-render stats modal ถ้าเปิดอยู่
  if (typeof _shareData !== 'undefined' && _shareData &&
      document.getElementById('stats-modal-root')) {
    closeStatsModal();
    showStatsModal(_shareData.cfg, _shareData.actualPulls);
  }
  // re-render compare modal ถ้าเปิดอยู่
  if (typeof _compareCfg !== 'undefined' && _compareCfg &&
      document.getElementById('compare-modal-root')) {
    rerunCompare();
  }
}
