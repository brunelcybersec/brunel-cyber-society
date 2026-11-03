/* Animated wireframe wave background for the hero.
   Each line is drawn three times (warm, cool, white) with a small
   horizontal offset to mimic chromatic aberration.

   Performance notes:
   - The wave SHAPE for a line is computed once per frame, then stroked
     three times with a translate — the three colour layers are identical
     in shape, so there's no need to recompute the (expensive) sine maths
     for each one. This removes ~2/3 of the per-frame work.
   - The static dot grid is rendered once to an offscreen canvas and
     blitted each frame instead of being redrawn dot-by-dot.
   - The loop only runs while the hero is on screen and the tab is
     visible, which saves CPU and phone battery. */
(function () {
  const canvas = document.getElementById('waves');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;   /* very old browser / context lost — bail quietly */
  /* prefers-reduced-motion is watched live, not read once: a visitor who
     turns on "reduce motion" mid-visit gets a still frame straight away */
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = motionQuery.matches;

  /* stroke colours for the three chromatic-aberration layers. They come from
     the --wave-* tokens in styles.css so the canvas follows the dark/light
     theme; read once here and again on 'themechange' (site.js), never per frame. */
  let WARM, COOL, WHITE, DOT;
  function readColours() {
    const cs = getComputedStyle(document.documentElement);
    const get = function (name, fallback) { return cs.getPropertyValue(name).trim() || fallback; };
    WARM = get('--wave-warm', 'rgba(224, 138, 109, 0.5)');
    COOL = get('--wave-cool', 'rgba(111, 201, 216, 0.5)');
    WHITE = get('--wave-ink', 'rgba(233, 230, 227, 0.9)');
    DOT = get('--wave-dot', 'rgba(233, 230, 227, 0.10)');
  }
  readColours();

  /* a page can request a different look with data-variant="b" on the canvas */
  const VARIANT = canvas.dataset.variant || 'a';
  const SPEED = VARIANT === 'b' ? 0.009 : 0.012;
  const DIM = VARIANT === 'b' ? 0.28 : 1;   /* dimmer when used as a full-page background */

  const STEP = 9;                            /* horizontal sampling step (px) — lower = smoother but heavier */
  const ROW_GAP = VARIANT === 'b' ? 22 : 16; /* vertical gap between lines (px) */

  let w, h, dpr, rows, t = 0;
  let xs = [];              /* precomputed x sample positions */
  let grid = null;          /* offscreen canvas holding the static dot grid */
  let rafId = null;
  let inView = true;

  /**
   * Draw the static dot grid (one dot every 90px) onto an offscreen canvas.
   * Called only on resize; render() then copies it in with a single drawImage.
   */
  function buildGrid() {
    grid = document.createElement('canvas');
    grid.width = w * dpr;
    grid.height = h * dpr;
    const g = grid.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = DOT;
    for (let gx = 30; gx < w; gx += 90) {
      for (let gy = 30; gy < h; gy += 90) {
        g.fillRect(gx, gy, 1.5, 1.5);
      }
    }
  }

  /**
   * Match the canvas to its on-screen size and rebuild everything that
   * depends on that size.
   *
   * A canvas has two sizes: its CSS size (clientWidth/Height) and its
   * pixel buffer (width/height). On high-DPI screens (devicePixelRatio 2 or
   * 3) the buffer must be larger or the lines look blurry. setTransform then
   * scales drawing so the rest of the code can keep using CSS pixels. DPR
   * is capped at 2 because a 3x buffer costs more than twice the pixels of
   * a 2x one, for a difference you can barely see.
   */
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;     /* note: setting width/height also clears the canvas */
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rows = Math.floor(h / ROW_GAP);

    /* precompute the x positions once — they don't change between frames */
    xs.length = 0;
    for (let x = -10; x <= w + 10; x += STEP) xs.push(x);

    buildGrid();
    if (rafId === null) render();   /* keep the canvas filled while paused */
  }

  /* Debounce resize: a window drag fires this dozens of times a second, and
     each call reallocates two canvases and rebuilds the dot grid. Wait for
     the gesture to settle before doing that expensive work. */
  let resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer !== null) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resizeTimer = null;
      resize();
    }, 150);
  });

  /**
   * Height of the imaginary wave surface at point (x, y) and time `time`.
   *
   * It adds up three sine waves, each with its own direction (the x/y
   * multipliers), speed (the time multiplier) and height (the trailing
   * number). Adding a few sines with unrelated frequencies gives motion
   * that looks organic and doesn't visibly repeat. This is a cheap
   * alternative to real noise functions.
   *
   * @param {number} x Horizontal position in CSS px.
   * @param {number} y The row's base y position in CSS px.
   * @param {number} time Animation clock `t`.
   * @returns {number} How far to lift the line at this point, in px (can be negative).
   */
  function surface(x, y, time) {
    if (VARIANT === 'b') {
      /* contact background: longer, more diagonal swells moving the other way */
      return (
        Math.sin(x * 0.006 - y * 0.004 + time * 0.34) * 30 +
        Math.sin(x * 0.0022 + y * 0.011 + time * 0.5) * 14 +
        Math.sin(-x * 0.0013 + y * 0.005 - time * 0.2) * 32
      );
    }
    return (
      Math.sin(x * 0.0035 + y * 0.012 + time * 0.45) * 26 +
      Math.sin(x * 0.009 - y * 0.006 + time * 0.3) * 16 +
      Math.sin(x * 0.0016 + y * 0.003 - time * 0.18) * 38
    );
  }

  /* draws one frame at the current time `t` */
  function render() {
    ctx.clearRect(0, 0, w, h);
    if (grid) ctx.drawImage(grid, 0, 0, w, h);
    ctx.lineWidth = 1;

    for (let r = 0; r < rows; r++) {
      const baseY = r * ROW_GAP + 8;

      /* build the line's shape ONCE */
      const path = new Path2D();
      let peak = 0;
      for (let i = 0; i < xs.length; i++) {
        const d = surface(xs[i], baseY, t);
        if (d > peak) peak = d;
        const y = baseY - d;
        if (i === 0) path.moveTo(xs[i], y);
        else path.lineTo(xs[i], y);
      }

      /* rows with taller crests are drawn brighter, which gives a sense of depth */
      const bright = Math.min(1, 0.18 + (peak / 80));

      /* stroke the same path three times, shifted, for the colour fringe.
         save()/restore() undo each translate, so the next layer starts unshifted. */
      ctx.globalAlpha = bright * 0.5 * DIM;
      ctx.strokeStyle = WARM;
      ctx.save(); ctx.translate(-1.4, 0); ctx.stroke(path); ctx.restore();

      ctx.strokeStyle = COOL;
      ctx.save(); ctx.translate(1.4, 0); ctx.stroke(path); ctx.restore();

      ctx.globalAlpha = bright * DIM;
      ctx.strokeStyle = WHITE;
      ctx.stroke(path);
    }
    ctx.globalAlpha = 1;
  }

  /* requestAnimationFrame runs the callback before the next screen repaint
     and pauses by itself in background tabs. t advances by the real time
     elapsed, scaled so SPEED keeps meaning "per 60Hz frame" (~16.7ms); that
     way 60Hz and 120Hz screens animate at the same speed. The 100ms cap
     stops a big jump after a slow frame. */
  let lastTs = null;
  function loop(ts) {
    if (lastTs !== null) t += SPEED * Math.min(ts - lastTs, 100) / (1000 / 60);
    lastTs = ts;
    render();
    rafId = requestAnimationFrame(loop);
  }

  /* start() and stop() use rafId === null to mean "not running", so calling
     start() twice can never set up two loops at once */
  function start() {
    if (reduceMotion) return;
    if (rafId === null && inView && !document.hidden) {
      rafId = requestAnimationFrame(loop);
    }
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
      lastTs = null;   /* so time spent paused isn't counted on resume */
    }
  }

  resize();        /* sizes the canvas and paints one static frame */

  /* start() refuses to run while reduceMotion is true, so these listeners
     are safe to attach unconditionally */
  if ('IntersectionObserver' in window) {
    /* pause the loop whenever the hero scrolls out of view */
    const io = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) start(); else stop();
    }, { threshold: 0 });
    io.observe(canvas);
  }
  /* pause when the tab is hidden, resume when it returns */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });
  const onMotionPref = function () {
    reduceMotion = motionQuery.matches;
    if (reduceMotion) { stop(); render(); } else start();
  };
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionPref);
  /* theme switched: new colours, rebuild the dot grid, repaint at once */
  document.addEventListener('themechange', function () {
    readColours();
    buildGrid();
    render();
  });
  start();
})();
