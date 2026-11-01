/* Shared behaviour for every page:
   mobile menu, sticky-nav state, button ripple, scroll reveals,
   click-to-copy, the phishing alert, the external-link check,
   and a small reward for the curious.

   Loaded last on each page (after render.js), so the cards render.js
   builds are already in the DOM when the reveal code below looks for
   them. Each feature checks that its elements exist, so the same file
   works on every page. */

(function () {
  /* honour the OS-level "reduce motion" accessibility setting */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- mobile menu ----- */
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  if (btn && links) {
    /**
     * Open or close the mobile menu. The visual state, aria-expanded
     * (read out by screen readers) and the button label all change
     * together here, so they can never disagree.
     * @param {boolean} open
     */
    const setMenu = function (open) {
      links.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      btn.textContent = open ? '[close]' : '[menu]';
      document.body.classList.toggle('menu-open', open);
      /* the open menu covers the whole screen, so make the page behind it
         inert: Tab can't wander onto links the visitor can't see */
      document.querySelectorAll('main, footer').forEach(function (el) { el.inert = open; });
    };
    /* tell assistive tech which element the button controls */
    if (!links.id) links.id = 'site-menu';
    btn.setAttribute('aria-controls', links.id);
    btn.addEventListener('click', function () {
      setMenu(!links.classList.contains('open'));
    });
    /* event delegation: one listener on the container catches clicks on any
       link inside it, so tapping a link (e.g. "#join") also closes the menu */
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    /* Escape closes the menu for keyboard users and puts focus back on the button */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        setMenu(false);
        btn.focus();
      }
    });
    /* widening the window past the menu breakpoint (styles.css, 900px) while
       the menu is open would otherwise leave the page inert and unscrollable */
    const mobileNav = window.matchMedia('(max-width: 900px)');
    const onBreakpoint = function () { if (!mobileNav.matches) setMenu(false); };
    if (mobileNav.addEventListener) mobileNav.addEventListener('change', onBreakpoint);
  }

  /* ----- nav: compact + elevate once the page scrolls ----- */
  const navEl = document.querySelector('nav');
  if (navEl) {
    const onScroll = function () {
      navEl.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();   /* run once now, in case the page loads already scrolled (refresh, #anchor) */
    /* passive: tells the browser we never call preventDefault(), so it can
       keep scrolling smoothly without waiting for this handler */
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----- button click ripple ----- */
  /* Drop a circle at the pointer that scales up and fades out (CSS animates
     it; we only place it and clean it up). Skipped for disabled buttons and
     when the user prefers reduced motion. */
  if (!reduceMotion) {
    /* one delegated listener on document, so it also covers buttons created later */
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.btn');
      if (!target || target.classList.contains('disabled')) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      /* keyboard activation reports (0,0): fall back to the button centre */
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (x - rect.left - size / 2) + 'px';
      ripple.style.top = (y - rect.top - size / 2) + 'px';
      ripple.addEventListener('animationend', function () { ripple.remove(); });
      target.appendChild(ripple);
    });
  }

  /* ----- scroll reveals with staggered children ----- */
  const revealEls = document.querySelectorAll('.reveal');

  /* items inside a section that cascade in one after another */
  revealEls.forEach(function (el) {
    const items = el.querySelectorAll('.stat, .event, .member, .repo, .resource-row, .post-card, .learn-card');
    items.forEach(function (item, i) {
      item.classList.add('stagger');
      item.style.transitionDelay = (120 + i * 80) + 'ms';
    });
  });

  /* no animation wanted (or an old browser): show everything straight away,
     so no content is ever left invisible */
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  } else {
    /* IntersectionObserver lets the browser report when an element enters the
       viewport, which is cheaper than checking positions on every scroll event */
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);   /* reveal once only; stop watching it */
        }
      });
    }, { threshold: 0.12 });            /* trigger once 12% of the section is visible */
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ----- click-to-copy (e.g. the email address on the contact page) ----- */
  document.querySelectorAll('.bc-copy[data-copy]').forEach(function (btn) {
    const hint = btn.querySelector('.bc-copy-hint');
    let resetTimer;
    /**
     * Show the copy result for 1.8s, then reset. Clearing the previous
     * timer first means a quick second click doesn't get cut short by
     * the first click's reset.
     * @param {boolean} ok true if the copy worked.
     */
    const flash = function (ok) {
      btn.classList.toggle('copied', ok);
      if (hint) {
        /* clear first so an identical repeat message still mutates the
           live region and gets re-announced by screen readers */
        hint.textContent = '';
        hint.textContent = ok ? 'Copied to clipboard' : 'Copy failed — press Ctrl+C';
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        btn.classList.remove('copied');
        if (hint) hint.textContent = '';
      }, 1800);
    };
    btn.addEventListener('click', function () {
      const text = btn.getAttribute('data-copy');
      /* the modern Clipboard API is asynchronous (returns a Promise) and only
         exists on HTTPS pages or localhost */
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flash(true); }, function () { flash(false); });
      } else {
        /* fallback for older browsers / non-secure contexts: select the text in
           an off-screen textarea and use the deprecated execCommand('copy') */
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'absolute';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          flash(true);
        } catch (e) { flash(false); }
      }
    });
  });

  /* ----- phishing alert: homepage pop-up + site-wide banner ----- */
  /* Runs until the end date, then the pop-up AND the banner disappear from
     every page on their own. Set PHISHING_ALERT_ON to false to stop it
     early. The link check further down is not affected. */
  const PHISHING_ALERT_ON = true;
  const PHISHING_ALERT_UNTIL = new Date(2026, 10, 1);   /* 1 Nov 2026, 00:00 (months count from 0) */
  /* compared against the visitor's own clock and time zone, so the exact
     switch-off moment differs slightly from one visitor to another */
  const PHISHING_ALERT = PHISHING_ALERT_ON && new Date() < PHISHING_ALERT_UNTIL;

  const X_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  /* feature detection: both the pop-up and the link check use <dialog>,
     so they are skipped entirely in browsers without it */
  const canDialog = typeof HTMLDialogElement === 'function';

  /**
   * Read from or write to localStorage/sessionStorage without crashing.
   * Storage access can throw (Safari private mode, blocked site data, full
   * quota), and one uncaught error would stop the rest of this file.
   *
   * @param {Storage} store localStorage or sessionStorage.
   * @param {string} key
   * @param {string} [value] Leave this out to read; pass it to write.
   * @returns {string|null|undefined} The stored value when reading (null if
   *   missing or unavailable); undefined after a write.
   */
  const storage = function (store, key, value) {
    try {
      if (value === undefined) return store.getItem(key);
      store.setItem(key, value);
    } catch (e) { return null; }
  };
  /* reuse the nav's own stay-safe link so the URL is right on every page (incl. 404) */
  const navSafe = document.querySelector('.nav-links a[href$="security-basics.html"]');
  const guideHref = (navSafe ? navSafe.getAttribute('href') : 'security-basics.html') + '#phishing';
  const onSafePage = !!document.getElementById('phishing');

  /* pop-up: homepage only, once per visit, after the boot screen has gone.
     sessionStorage is cleared when the tab closes, so "once per visit" means
     once per tab session, not once forever. */
  if (PHISHING_ALERT && canDialog && document.body.classList.contains('home') &&
      !storage(sessionStorage, 'phAlertSeen')) {
    const pop = document.createElement('dialog');
    pop.className = 'ph-pop';
    pop.setAttribute('aria-labelledby', 'ph-pop-title');
    /* fixed markup only; guideHref is set afterwards with setAttribute.
       <form method="dialog"> buttons close the dialog without any JS. */
    pop.innerHTML =
      '<div class="ph-pop-top">' +
        '<p class="ph-live"><span class="ph-dot" aria-hidden="true"></span>PHISHING ALERT <span class="date">· 23 Oct 2026</span></p>' +
        '<form method="dialog"><button class="ph-x" aria-label="Close alert">' + X_ICON + '</button></form>' +
      '</div>' +
      '<div class="ph-pop-body">' +
        '<h2 id="ph-pop-title">Phishing emails are targeting Brunel students</h2>' +
        '<p class="ph-lede">Brunel IT Security has warned about emails posing as training, career or "opportunity" offers that push you to click, register or reply fast.</p>' +
        '<ol class="ph-steps">' +
          '<li><span><strong>Don\'t click or share details</strong> unless you\'re sure it\'s genuine.</span></li>' +
          '<li><span><strong>Don\'t trust the logo.</strong> Brunel branding is easy to fake.</span></li>' +
          '<li><span><strong>Report it</strong> with the Report Phishing button in Outlook.</span></li>' +
          '<li><span><strong>Already clicked?</strong> Contact the Brunel IT Service Desk.</span></li>' +
        '</ol>' +
        '<form method="dialog" class="ph-actions">' +
          '<a class="btn solid ph-guide">How to spot phishing &rarr;</a>' +
          '<button class="btn ghost-btn" autofocus>Got it</button>' +
        '</form>' +
      '</div>';
    pop.querySelector('.ph-guide').setAttribute('href', guideHref);
    document.body.appendChild(pop);
    /* clicking the blurred area outside the box closes it */
    pop.addEventListener('click', function (e) { if (e.target === pop) pop.close(); });

    /* showModal() (not show()) makes the rest of the page inert, traps keyboard
       focus inside the dialog and lets Escape close it */
    const show = function () {
      if (pop.open) return;
      storage(sessionStorage, 'phAlertSeen', '1');
      pop.showModal();
    };
    /* Wait for the boot screen (preloader.js) to finish so the two don't
       overlap. preloader.js has no event to listen for, so a MutationObserver
       watches for its signs of finishing: the "pl-done" class being added,
       or the element being removed from <body>. */
    const pl = document.getElementById('preloader');
    if (!pl || !pl.isConnected || pl.classList.contains('pl-done')) {
      setTimeout(show, 900);
    } else {
      const mo = new MutationObserver(function () {
        if (!pl.isConnected || pl.classList.contains('pl-done')) {
          mo.disconnect();
          setTimeout(show, 700);
        }
      });
      mo.observe(pl, { attributes: true, attributeFilter: ['class'] });
      mo.observe(document.body, { childList: true });
    }
  }

  /* banner: every page except stay-safe; the X hides it on this device for good */
  if (PHISHING_ALERT && !onSafePage && storage(localStorage, 'phBannerClosed') !== '1') {
    const bar = document.createElement('div');
    bar.className = 'ph-banner';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Phishing warning');
    bar.innerHTML =
      '<span class="ph-live"><span class="ph-dot" aria-hidden="true"></span>PHISHING ALERT</span>' +
      '<p class="ph-b-text"><strong>Fake training and career emails are targeting Brunel students.</strong>' +
        '<span class="ph-b-more"> Don\'t click or reply unless you\'re sure.</span></p>' +
      '<a class="ph-b-link">How to spot them &rarr;</a>' +
      '<button class="ph-x" type="button" aria-label="Dismiss phishing warning">' + X_ICON + '</button>';
    /* set via setAttribute, not string concatenation, so the href can never break out of the markup */
    bar.querySelector('.ph-b-link').setAttribute('href', guideHref);
    document.body.appendChild(bar);
    /* the CSS adds bottom padding for this class so the fixed banner never covers the footer */
    document.documentElement.classList.add('has-ph-banner');
    bar.querySelector('.ph-x').addEventListener('click', function () {
      bar.remove();
      document.documentElement.classList.remove('has-ph-banner');
      storage(localStorage, 'phBannerClosed', '1');
    });
  }

  /* ----- "leaving brunelcs.org" check on external links ----- */
  /* Pauses before any link that leaves the site and shows the real
     destination, host in bold. Same-site links, mailto:, the society's
     own official pages (TRUSTED_LINKS) and ctrl/cmd/shift/middle clicks
     are left alone. */
  if (canDialog) {
    const OUR_HOSTS = ['brunelcs.org', 'www.brunelcs.org', location.hostname];

    /* Official society destinations that skip the check, so the warning keeps
       its meaning for everywhere else. Each entry is an exact https origin plus
       a path prefix matched on whole path segments: "github.com/brunelcybersec"
       covers ".../brunelcybersec/ctf-writeups" but NOT "github.com/brunelcybersec-x",
       "evil.github.com", http:// or another port. No wildcards, no subdomains.
       Only add pages the society itself controls, and never a redirector. */
    const TRUSTED_LINKS = [
      'https://brunelstudents.com/organisation/cybersoc/',   /* Students' Union membership page */
      'https://discord.gg/anmggPyVcs',
      'https://www.instagram.com/cybersoc.brunel/',
      'https://github.com/brunelcybersec',
      'https://www.youtube.com/@CyberTutor24',
      'https://chat.whatsapp.com/B50Vr2OEtNP2xswsivr9eI',
      'https://mohammedzuoriki.substack.com/p/'              /* CyberTutor posts on the blog page */
    ].map(function (t) { return new URL(t); });

    /**
     * @param {URL} u Parsed link destination (already normalised by URL(),
     *   so "/brunelcybersec/../x" has become "/x" before we compare).
     * @returns {boolean} true if u is one of the TRUSTED_LINKS pages.
     */
    const isTrusted = function (u) {
      if (u.username || u.password) return false;   /* "https://a@b" tricks */
      return TRUSTED_LINKS.some(function (t) {
        const base = t.pathname.replace(/\/$/, '');
        return u.origin === t.origin &&
          (u.pathname === base || u.pathname.indexOf(base + '/') === 0);
      });
    };

    const dlg = document.createElement('dialog');
    dlg.className = 'leave-dlg';
    dlg.setAttribute('aria-labelledby', 'leave-title');
    dlg.setAttribute('aria-describedby', 'leave-desc leave-url');
    dlg.innerHTML =
      '<form method="dialog" class="leave-inner">' +
        '<p class="leave-tag">// leaving brunelcs.org</p>' +
        '<h2 id="leave-title">Check where this link goes</h2>' +
        '<p id="leave-desc">You\'re about to open an external site. Read the address before you continue, the same way you would in an email.</p>' +
        '<span class="leave-url" id="leave-url"></span>' +
        '<p class="leave-tip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5z"/><path d="M9 12l2 2 4-4"/></svg>' +
          '<span>Phishing links copy real names. The part in bold is the site you\'ll actually land on.</span></p>' +
        '<div class="leave-actions">' +
          '<button class="btn solid" value="go">Open link &#8599;</button>' +
          '<button class="btn ghost-btn" value="stay" autofocus>Stay here</button>' +
        '</div>' +
        '<label class="leave-skip"><input type="checkbox"> don\'t ask again on this device</label>' +
      '</form>';
    document.body.appendChild(dlg);
    /* tapping the dimmed backdrop counts as "Stay here" (returnValue stays ''),
       which helps touch users; Escape and the buttons work as before */
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    const urlEl = dlg.querySelector('.leave-url');
    const skipEl = dlg.querySelector('.leave-skip input');
    /* the link that was intercepted, held here until the dialog closes */
    let pending = null;

    document.addEventListener('click', function (e) {
      /* skip clicks something else already handled, and modified or
         non-left clicks (open in new tab / window), which should behave normally */
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a || storage(localStorage, 'leaveCheckOff') === '1') return;
      /* a.href (the property, not the attribute) is already an absolute URL;
         URL() splits it into protocol/hostname/path for us */
      let u;
      try { u = new URL(a.href, location.href); } catch (err) { return; }
      /* only http(s) links to other sites; mailto:, tel: and our own pages pass through */
      if (!/^https?:$/.test(u.protocol) || OUR_HOSTS.indexOf(u.hostname) !== -1 || isTrusted(u)) return;

      e.preventDefault();
      pending = { href: u.href, newTab: a.target === '_blank' };
      /* textContent only, so a crafted URL can never inject markup */
      const host = document.createElement('strong');
      host.textContent = u.hostname.replace(/^www\./, '');
      const rest = u.href.slice(u.origin.length);
      urlEl.replaceChildren(host, document.createTextNode(rest === '/' ? '' : rest));
      skipEl.checked = false;
      dlg.returnValue = '';   /* Escape keeps the previous value, so a stale "go" must not linger */
      dlg.showModal();
    });

    /* "close" fires however the dialog closes (either button or Escape).
       returnValue is the value of the button that submitted the form, so
       only the "Open link" button continues to the site. */
    dlg.addEventListener('close', function () {
      if (dlg.returnValue === 'go' && pending) {
        /* the "don't ask again" box only counts when the visitor goes ahead */
        if (skipEl.checked) storage(localStorage, 'leaveCheckOff', '1');
        if (pending.newTab) window.open(pending.href, '_blank', 'noopener');
        else location.href = pending.href;
      }
      pending = null;
    });
  }

  /* ----- for the curious ----- */
  /* each %c in the message applies the next CSS string argument to the text after it */
  console.log(
    '%cbrunel_cybersec>_ %cnice instinct, opening the console.\n' +
    'BRUNEL{v1ew_s0urce_h4cker}\n' +
    'Bring that flag to any workshop and introduce yourself.',
    'color:#6FC9D8;font-family:monospace;font-weight:bold;',
    'color:#8E8B8F;font-family:monospace;'
  );
})();
