/* Boot screen: plays once per browser session, then gets out of the way.
   The inline <head> script adds .booted to <html> on repeat visits so the
   overlay never even flashes; this file runs the animation on first visit.

   Robustness:
   - every timer is tracked and cleared on exit (no work against a removed node)
   - finish() runs at most once (normal end, skip, or safety all funnel here)
   - the exit waits for the page to actually load (capped by a safety timeout)
   - a click or Esc/Enter skips it; background scroll is locked while it shows */
(function () {
  const pl = document.getElementById('preloader');
  if (!pl) return;
  const root = document.documentElement;

  /* --- timer bookkeeping so nothing leaks past finish() --- */
  /* after() and every() are setTimeout/setInterval wrappers that remember
     each timer id, so clearTimers() can cancel all of them in one go. */
  let timers = [];
  function after(fn, ms) { const id = setTimeout(fn, ms); timers.push(id); return id; }
  function every(fn, ms) { const id = setInterval(fn, ms); timers.push(id); return id; }
  function clearTimers() {
    /* timeout and interval ids come from the same pool in browsers, so
       calling both clear functions on every id is harmless */
    timers.forEach(function (id) { clearTimeout(id); clearInterval(id); });
    timers = [];
  }

  let done = false;
  /**
   * Tear the boot screen down: stop all timers, unlock scrolling, remember
   * that this session has booted, fade out, then remove the element.
   * Safe to call more than once (the `done` flag makes extra calls no-ops),
   * which matters because the normal end, a skip and the safety timer can
   * all call it.
   */
  function finish() {
    if (done) return;            /* only ever tear down once */
    done = true;
    clearTimers();
    document.removeEventListener('keydown', onKey);
    try { sessionStorage.setItem('booted', '1'); } catch (e) {}
    root.classList.remove('pl-lock');
    pl.classList.add('pl-done');   /* CSS fades opacity to 0 over 0.55s */
    /* remove from the DOM only after that fade has finished */
    after(function () { if (pl.parentNode) pl.parentNode.removeChild(pl); }, 600);
  }

  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
  }

  /* skip instantly on repeat visits this session, or if reduced motion */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (root.classList.contains('booted') || reduce) {
    try { sessionStorage.setItem('booted', '1'); } catch (e) {}
    if (pl.parentNode) pl.parentNode.removeChild(pl);
    return;
  }

  /* let impatient visitors bail out */
  pl.addEventListener('click', finish);
  document.addEventListener('keydown', onKey);
  root.classList.add('pl-lock');               /* freeze background scroll */

  /* only hide once the page is genuinely ready (or the safety timeout wins).
     'load' fires once images, fonts and stylesheets have arrived, later than
     DOMContentLoaded, so the visitor never sees a half-loaded page. */
  let pageReady = document.readyState === 'complete';
  if (!pageReady) {
    window.addEventListener('load', function () { pageReady = true; }, { once: true });
  }
  function exitWhenReady() {
    if (pageReady) finish();
    else window.addEventListener('load', finish, { once: true });
  }

  const logEl = pl.querySelector('.pl-log');
  const fillEl = pl.querySelector('.pl-fill');
  const pctEl = pl.querySelector('.pl-pct');
  const statusEl = pl.querySelector('.pl-status');
  const brandEl = pl.querySelector('.pl-brand-text');

  /* skip hint (added here so the markup stays simple in every page) */
  const inner = pl.querySelector('.pl-inner');
  if (inner) {
    const hint = document.createElement('div');
    hint.className = 'pl-skip';
    hint.textContent = '[ click anywhere to skip ]';
    inner.appendChild(hint);
  }

  const lines = [
    '> initializing brunel_cybersec',
    '> mounting /dev/curiosity ... ok',
    '> loading modules: workshops · ctf · talks',
    '> establishing secure channel ... ok',
    '> decrypting payload'
  ];

  function addLine(text, ok) {
    const d = document.createElement('div');
    if (ok) d.className = 'ok';
    d.textContent = text;
    logEl.appendChild(d);
  }

  /* progress bar (CSS width transition) + counting percentage.
     Both are for show only; they don't measure real loading progress.
     The width is set inside requestAnimationFrame so the browser first
     paints the bar at its starting width; otherwise there's no "before"
     state and the CSS transition wouldn't play. */
  requestAnimationFrame(function () { fillEl.style.width = '100%'; });
  let pct = 0;
  const pctId = every(function () {
    pct = Math.min(100, pct + 3 + Math.floor(Math.random() * 9));
    pctEl.textContent = pct + '%';
    if (pct >= 100) clearInterval(pctId);
  }, 95);

  /* type the boot lines one by one with a little jitter.
     A chain of setTimeouts (each line schedules the next) is used instead of
     setInterval so every gap can have its own random length. */
  let i = 0;
  (function nextLine() {
    if (i < lines.length) {
      addLine(lines[i]);
      i++;
      after(nextLine, 210 + Math.floor(Math.random() * 160));
    } else {
      after(reveal, 240);
    }
  })();

  /**
   * Scramble-decrypt the brand wordmark, then glitch out.
   * On each 38ms tick, the first `frame` characters show the real text and
   * the rest are random glyphs, so the name "locks in" left to right.
   */
  function reveal() {
    addLine('> access granted', true);
    statusEl.textContent = 'access granted';
    statusEl.className = 'pl-status ok';

    const target = 'brunel_cybersec';
    const glyphs = '01<>/|_=+#$%&*[]{}abcdef0123456789';
    let frame = 0;
    const scrambleId = every(function () {
      let out = '';
      for (let c = 0; c < target.length; c++) {
        out += (c < frame)
          ? target.charAt(c)
          : glyphs.charAt(Math.floor(Math.random() * glyphs.length));
      }
      brandEl.textContent = out;
      frame++;
      if (frame > target.length) {
        clearInterval(scrambleId);     /* stop only the scramble; safety timer stays armed */
        brandEl.textContent = target;
        pl.classList.add('pl-flash');
        after(exitWhenReady, 460);
      }
    }, 38);
  }

  /* hard safety: never trap the visitor, whatever happens (e.g. 'load' never
     fires because one image hangs). The CSS pl-failsafe animation (starts at
     5s) is the backup for when JS doesn't run at all; this fires at the same
     moment so the scroll lock is released as the overlay fades, not after. */
  after(function () { finish(); }, 5000);
})();
