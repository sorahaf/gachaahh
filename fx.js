// fx.js — Click Sound & Star Particle FX
// ════════════════════════════════════════
(function () {

  // ── Audio ────────────────────────────────────────────────
  let _ctx = null;
  function ctx() {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    return _ctx;
  }
  function resume() { if (_ctx && _ctx.state === 'suspended') _ctx.resume(); }

  function tone(freq, delay, vol, dur, wave = 'sine') {
    const c    = ctx();
    const osc  = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, c.currentTime + delay);
    gain.gain.setValueAtTime(0,     c.currentTime + delay);
    gain.gain.linearRampToValueAtTime(vol,   c.currentTime + delay + 0.016);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + dur);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime  + delay + dur + 0.02);
  }

  // ── Click sound via Audio element (works on file://) ────────
  const _clickAudio = new Audio('sounds/latent_rick-soft-app-button-tap-sound-3-547874.mp3');
  _clickAudio.volume = 0.85;

  function sfxClick() {
    _clickAudio.currentTime = 0;
    _clickAudio.play().catch(() => {
      // Fallback synthesized ถ้าไฟล์โหลดไม่ได้
      const c = ctx(), now = c.currentTime;
      const osc = c.createOscillator(), gf = c.createGain();
      osc.connect(gf); gf.connect(c.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + .065);
      gf.gain.setValueAtTime(0, now);
      gf.gain.linearRampToValueAtTime(.44, now + .004);
      gf.gain.exponentialRampToValueAtTime(.001, now + .065);
      osc.start(now); osc.stop(now + .07);
    });
  }

  // เสียง compare — ascending 2 โน้ต (คงเดิม)
  function sfxCompare() { tone(500, 0, .42, .17); tone(660, .09, .32, .20); }

  // ── Particles (RAF-based) ─────────────────────────────────
  const PAL   = ['#5B8EF5','#F472B6','#A78BFA','#60a5fa','#F9A8D4','#818cf8','#c084fc'];
  const SHAPE = ['★','✦','✧','◆','✶'];

  function burst(el, count, opts = {}) {
    const r   = el.getBoundingClientRect();
    const cx  = r.left + r.width  / 2;
    const cy  = r.top  + r.height / 2;
    const pal = opts.colors || PAL;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - .5) * .7;
      const dist  = (opts.dist  || 34) + Math.random() * (opts.spread || 44);
      const size  = (opts.size  || 9)  + Math.random() * (opts.range  || 11);
      const dur   = 430 + Math.random() * 260;
      const rot   = (Math.random() > .5 ? 1 : -1) * (70 + Math.random() * 120);
      const tx    = Math.cos(angle) * dist;
      const ty    = Math.sin(angle) * dist;
      const color = pal[Math.floor(Math.random() * pal.length)];
      const shape = SHAPE[Math.floor(Math.random() * SHAPE.length)];
      const t0    = performance.now();

      const s = document.createElement('span');
      s.textContent = shape;
      Object.assign(s.style, {
        position:'fixed', pointerEvents:'none', userSelect:'none',
        zIndex:'99999', lineHeight:'1', fontStyle:'normal',
        left: cx + 'px', top: cy + 'px',
        fontSize: size + 'px', color,
        transform: 'translate(-50%,-50%) scale(0)',
        opacity: '1',
      });
      document.body.appendChild(s);

      (function tick(now) {
        const t    = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const sc   = t < .18 ? (t / .18) * 1.2 : 1.2 - (t - .18) / .82 * .95;
        const op   = t > .38 ? 1 - (t - .38) / .62 : 1;
        s.style.transform =
          `translate(calc(-50% + ${tx * ease}px), calc(-50% + ${ty * ease}px)) ` +
          `scale(${Math.max(0, sc)}) rotate(${rot * ease}deg)`;
        s.style.opacity = Math.max(0, op);
        t < 1 ? requestAnimationFrame(tick) : s.remove();
      })(t0);
    }
  }

  // ── Broad selector: ครอบทุกสิ่งที่คลิกได้ ─────────────────
  const SEL = [
    'button', 'summary',
    '.pull-btn', '.pull1', '.pull10',
    '.sub-btn', '.lang-btn',
    '.banner-card', '.back',
    '.btn-danger', '.compare-btn',
  ].join(',');

  // ── Listener ใช้ capture:true → ยิงก่อน stopPropagation ใดๆ ─
  document.addEventListener('click', (e) => {
    if (!_ctx) ctx();
    resume();

    const btn = e.target.closest(SEL);
    if (!btn) return;
    if (btn.disabled === true) return;

    const cl = btn.classList;

    // ── Banner card: prevent nav → เล่น effect → navigate ──
    if (cl.contains('banner-card')) {
      e.preventDefault();
      const href = btn.href || btn.getAttribute('href');
      sfxClick();
      burst(btn, 9, { size:10, range:12, dist:38, spread:50 });
      if (href) setTimeout(() => { location.href = href; }, 300);
      return;
    }

    // ── Back link ──────────────────────────────────────────
    if (cl.contains('back')) {
      e.preventDefault();
      const href = btn.href || btn.getAttribute('href');
      sfxClick();
      burst(btn, 5, { size:8, range:8, dist:26, spread:26 });
      if (href) setTimeout(() => { location.href = href; }, 260);
      return;
    }

    // ── Compare ───────────────────────────────────────────
    if (cl.contains('compare-btn')) {
      sfxCompare();
      burst(btn, 8, { colors:['#A78BFA','#C4B5FD','#818cf8','#e879f9'], size:10, range:11, dist:36, spread:44 });
      return;
    }

    // ── Pull 1 / Pull 10 ──────────────────────────────────
    if (cl.contains('pull1') || cl.contains('pull10')) {
      sfxClick();
      burst(btn, cl.contains('pull10') ? 14 : 9, { size:11, range:13, dist:40, spread:52 });
      return;
    }

    // ── ทุกปุ่มที่เหลือ (sub-btn, lang-btn, summary, modal btns, reset, etc.) ──
    sfxClick();
    burst(btn, 5, { size:8, range:9, dist:28, spread:30 });

  }, { capture: true }); // capture phase → ไม่ถูกบล็อกโดย stopPropagation

})();
