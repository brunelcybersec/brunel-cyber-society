/* Renders events, posts, committee and resource cards from js/data.js into the pages.
   You should never need to edit this file — edit js/data.js instead.

   Every page loads this same file. Each render step looks for its own
   container (#home-events, #blog-list, ...) and quietly does nothing if
   that container isn't on the current page.

   Wrapped in an IIFE (an immediately-invoked function) so its helpers
   stay private instead of becoming globals that could clash with
   site.js or another script. */
(function () {
  /* data.js must load first (see the <script> order in each page);
     the {} fallback keeps the page working if it fails to load. */
  const d = window.SITE_DATA || {};

  /* Remove any <img data-hide-broken> that fails to load. Load errors don't
     bubble, so this listens in the capture phase, which still reaches the
     document. One listener here replaces inline onerror="" attributes, which
     a strict Content Security Policy would block. */
  document.addEventListener('error', function (e) {
    const el = e.target;
    if (el.tagName === 'IMG' && el.hasAttribute('data-hide-broken')) el.remove();
  }, true);

  /**
   * Escape text before putting it in HTML, so titles/descriptions
   * containing & < > " (e.g. "Crypto & C2") render correctly and
   * can never break the page.
   *
   * `&` is replaced first; doing it later would turn the `&lt;` we just
   * produced into `&amp;lt;`. Single quotes are not escaped, which is safe
   * only because every attribute in this file is wrapped in double quotes.
   *
   * @param {*} s Any value; null/undefined become an empty string.
   * @returns {string} Text that is safe inside element content or a "..." attribute.
   */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Only let safe links through: same-site paths, http(s) and mailto.
   * Anything else (javascript:, data:, //other-site ...) becomes "#", so a
   * bad value in data.js or the synced feed can never run code on click.
   *
   * This is an allowlist: known-good schemes pass, and any other
   * "scheme:" prefix is rejected. That is safer than trying to list
   * every dangerous scheme.
   *
   * @param {*} url Raw URL from data.js.
   * @returns {string} The URL, or "#" if it isn't on the allowlist. Not HTML-escaped (see attrUrl).
   */
  function safeUrl(url) {
    /* browsers ignore tabs/newlines inside URLs ("java\tscript:"), so drop them first */
    const s = String(url == null ? '' : url).replace(/[\u0000-\u001F\u007F]/g, '').trim();
    if (/^(https?:|mailto:)/i.test(s)) return s;
    /* any other "scheme:" prefix, or a protocol-relative "//host" / "\\host" */
    if (/^[a-z][a-z0-9+.-]*:/i.test(s) || /^[\/\\]{2}/.test(s)) return '#';
    return s;   /* a relative path such as "assets/x.jpg" or "security-basics.html#phishing" */
  }

  /**
   * Make a URL safe to place inside an href="..." or src="..." attribute:
   * check the scheme, then HTML-escape it.
   * @param {*} url Raw URL from data.js.
   * @returns {string}
   */
  function attrUrl(url) { return esc(safeUrl(url)); }

  /**
   * Tag pill such as "[workshop]". The tone ("cool" / "warm" / "") is used
   * as a CSS class that picks the colour.
   * @param {{tag: string, tone: string}} item
   * @returns {string} HTML
   */
  function pillHtml(item) {
    return '<span class="pill ' + esc(item.tone) + '">[' + esc(item.tag) + ']</span>';
  }

  /* external (http/https) links open in a new tab; same-site links don't.
     rel="noopener" stops the opened page from reaching back to this tab
     through window.opener (an attack called "reverse tabnabbing"). */
  function isExternal(link) { return /^https?:/i.test(link || ''); }
  function linkAttrs(link) { return isExternal(link) ? ' target="_blank" rel="noopener"' : ''; }

  /**
   * Choose the "read more" text: ↗ means the link leaves the site, → means it stays.
   * @param {string} link
   * @returns {string} Plain text. It comes from fixed strings, so it needs no escaping.
   */
  function readLabel(link) {
    if (/substack\.com/i.test(link || '')) return 'read on Substack ↗';
    if (isExternal(link)) return 'read more ↗';
    return 'read more →';
  }

  /* optional post image (Substack thumbnail); decorative + lazy-loaded */
  function mediaImg(src, cls) {
    return src
      ? '<div class="' + cls + '"><img src="' + attrUrl(src) + '" alt="" loading="lazy" decoding="async"></div>'
      : '';
  }

  /**
   * Optional rich hover card for an event (e.preview).
   *
   * Picks the media in this order: a gallery (several images/videos), then a
   * single video, then a single image. Videos are muted because browsers
   * only allow autoplay for muted video. data-hide-broken makes a broken
   * image disappear instead of showing the browser's broken-image icon.
   *
   * @param {Object} [p] The event's preview object: pill, cap, title, desc,
   *   img, video, gallery[], link, socialLink. All fields are optional.
   * @returns {string} HTML, or "" when the event has no preview.
   */
  function previewHtml(p) {
    if (!p) return '';
    const media = (p.gallery || []).map(function (item) {
      if (item.type === 'video') {
        return '<video class="ev-video" autoplay muted loop playsinline preload="metadata" poster="' + attrUrl(item.poster || '') + '"><source src="' + attrUrl(item.src) + '" type="video/mp4"></video>';
      }
      return '<img class="ev-img" src="' + attrUrl(item.src) + '" alt="" loading="lazy" decoding="async" data-hide-broken>';
    }).join('');
    const fallbackImg = !media && p.img
      ? '<img class="ev-img" src="' + attrUrl(p.img) + '" alt="" loading="lazy" decoding="async" data-hide-broken>'
      : '';
    const fallbackVideo = !media && p.video
      ? '<video class="ev-video" autoplay muted loop playsinline preload="metadata" poster="' + attrUrl(p.img || '') + '"><source src="' + attrUrl(p.video) + '" type="video/mp4"></video>'
      : '';
    return (
      '<div class="preview"><div class="ev-card">' +
        '<div class="ev-media' + (media ? ' ev-gallery' : '') + '">' + (media || fallbackVideo || fallbackImg) +
          '<div class="ev-overlay">' +
            (p.pill ? '<span class="ev-pill mono">[' + esc(p.pill) + ']</span>' : '') +
            (p.cap ? '<div class="ev-cap mono">' + esc(p.cap) + '</div>' : '') +
          '</div>' +
        '</div>' +
        '<div class="ev-body">' +
          '<h4 class="ev-title">' + esc(p.title || '') + '</h4>' +
          '<p class="ev-desc">' + esc(p.desc || '') + '</p>' +
          (p.link ? '<a class="ev-more mono" href="' + attrUrl(p.link) + '"' + linkAttrs(p.link) + '>Read more →</a>' : '') +
          (p.socialLink ? '<a class="ev-more mono" href="' + attrUrl(p.socialLink) + '"' + linkAttrs(p.socialLink) + '>View Instagram post ↗</a>' : '') +
        '</div>' +
      '</div></div>'
    );
  }

  /* works out whether an event is in the past from its date: field,
     so events move to Past events automatically - no flag to remember.
     e.past: true still works as a manual override (e.g. a cancelled
     event) if it's ever needed. */

  /**
   * Turn an event's "YYYY-MM-DD" date into a Date at 23:59:59 that day.
   *
   * Using the end of the day keeps an event "upcoming" for its whole day.
   * Adding a time also changes the time zone: a date-only string such as
   * "2026-10-28" is read as midnight UTC, but "2026-10-28T23:59:59" (no
   * "Z") is read as the visitor's local time, which is what we want here.
   *
   * @param {{date?: string}} e Event object.
   * @returns {Date|null} null when the date is missing or invalid.
   */
  function parseEventDate(e) {
    if (!e.date) return null;
    const d = new Date(e.date + 'T23:59:59');
    return isNaN(d.getTime()) ? null : d;   /* an invalid Date's getTime() is NaN */
  }

  /**
   * @param {{past?: boolean, date?: string}} e Event object.
   * @returns {boolean} true if the event is over. An event with no usable
   *   date counts as upcoming, so a typo doesn't hide it.
   */
  function isPastEvent(e) {
    if (e.past) return true;
    const d = parseEventDate(e);
    return d ? d.getTime() < Date.now() : false;
  }

  /**
   * One row in an events list.
   * @param {Object} e Event from SITE_DATA.events (when, where, title, desc, tag, tone, date, preview?).
   * @returns {string} HTML
   */
  function eventRow(e) {
    const past = isPastEvent(e);
    return (
      '<div class="event' + (e.preview ? ' has-preview' : '') + (past ? ' past-event' : '') + '">' +
        '<span class="date">' + esc(e.when) + '<br>' + esc(e.where) + '</span>' +
        '<div class="event-main"><h3>' + esc(e.title) + '</h3><p>' + esc(e.desc) + '</p>' +
          previewHtml(e.preview) +
        '</div>' +
        pillHtml(e) +
      '</div>'
    );
  }

  /**
   * A secondary blog post, rendered as a card in the grid below the featured one.
   * The whole card is a single <a>, so it can be clicked anywhere.
   * @param {Object} p Post (date, title, desc, tag, tone, image, link).
   * @returns {string} HTML
   */
  function postRow(p) {
    return (
      '<a class="post-card' + (p.image ? ' has-media' : '') + '" href="' + attrUrl(p.link || '#') + '"' + linkAttrs(p.link) + '>' +
        mediaImg(p.image, 'post-thumb') +
        '<p class="meta">[' + esc(p.tag) + '] · ' + esc(p.date) + '</p>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.desc) + '</p>' +
        '<span class="read">' + readLabel(p.link) + '</span>' +
      '</a>'
    );
  }

  /**
   * A "learn with" platform card on the resources page.
   * @param {{name: string, url: string, level?: string, note?: string}} l
   * @returns {string} HTML
   */
  function learnRow(l) {
    return (
      '<a class="learn-card" href="' + attrUrl(l.url) + '" target="_blank" rel="noopener">' +
        '<span class="lc-top">' +
          '<span class="lc-name">' + esc(l.name) + ' ↗</span>' +
          (l.level ? '<span class="lc-level">' + esc(l.level) + '</span>' : '') +
        '</span>' +
        '<p class="lc-note">' + esc(l.note || '') + '</p>' +
      '</a>'
    );
  }

  /**
   * An external "further reading" link on the blog page.
   * @param {{name: string, url: string, note?: string}} r
   * @returns {string} HTML
   */
  function readRow(r) {
    return (
      '<a class="read-link" href="' + attrUrl(r.url) + '" target="_blank" rel="noopener">' +
        '<span class="rl-name">' + esc(r.name) + ' ↗</span>' +
        (r.note ? '<span class="rl-note">' + esc(r.note) + '</span>' : '') +
      '</a>'
    );
  }

  /**
   * A committee member card.
   *
   * The initials and the photo share the avatar box, with the photo on
   * top. If the photo is missing or fails to load, data-hide-broken removes
   * it and the initials show through.
   *
   * @param {Object} m Member (name, role, email, initials, photo, accent, bio, duties[]).
   * @returns {string} HTML
   */
  function memberRow(m) {
    /* only two classes are allowed, so data.js can't inject an arbitrary class name */
    const accent = (m.accent === 'cool') ? 'cool' : 'warm';
    const img = m.photo
      ? '<img src="' + attrUrl(m.photo) + '" alt="' + esc(m.name || '') + '" width="56" height="56" loading="lazy" decoding="async" data-hide-broken>'
      : '';
    const name = m.name
      ? '<h3>' + esc(m.name) + '</h3>'
      : '<h3 class="placeholder">Your name here</h3>';
    const bio = m.bio ? '<p class="bio">' + esc(m.bio) + '</p>' : '';
    const email = m.email
      ? '<a class="member-email" href="mailto:' + esc(m.email) + '">email: ' + esc(m.email) + ' ↗</a>'
      : '';
    const duties = (m.duties && m.duties.length)
      ? '<ul class="duties">' +
          m.duties.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
        '</ul>'
      : '';
    return (
      '<div class="member ' + accent + '">' +
        '<div class="avatar">' + esc(m.initials || '') + img + '</div>' +
        name +
        '<p class="role">' + esc(m.role || '') + '</p>' +
        email +
        bio +
        duties +
      '</div>'
    );
  }

  /**
   * The big featured blog card (first post). Same data as postRow, bigger layout.
   * @param {Object} p Post.
   * @returns {string} HTML
   */
  function featuredHtml(p) {
    return (
      '<a class="featured' + (p.image ? ' has-media' : '') + '" href="' + attrUrl(p.link || '#') + '"' + linkAttrs(p.link) + '>' +
        mediaImg(p.image, 'featured-media') +
        '<div class="featured-body">' +
          '<p class="meta"><span class="featured-flag">featured</span>[' + esc(p.tag) + '] · ' + esc(p.date) + '</p>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p>' + esc(p.desc) + '</p>' +
          '<span class="read">' + readLabel(p.link) + '</span>' +
        '</div>' +
      '</a>'
    );
  }

  /**
   * Fill #id with items run through build(). No-op when the container
   * isn't on this page or there's nothing to show.
   *
   * Assigning innerHTML is only safe because every builder above escapes
   * its text with esc() and its URLs with attrUrl().
   *
   * @param {string} id Container element id.
   * @param {Array} [items] Data items.
   * @param {function(Object): string} build Turns one item into an HTML string.
   */
  function renderList(id, items, build) {
    const el = document.getElementById(id);
    if (el && items && items.length) el.innerHTML = items.map(build).join('');
  }

  /**
   * Sort by date: soonest first (dir 1) or newest first (dir -1);
   * events without a usable date always sink to the bottom.
   *
   * This returns a comparator for Array.prototype.sort: negative means
   * a comes first, positive means b comes first, 0 means keep their order.
   * Subtracting two Dates gives the gap in milliseconds; multiplying by
   * dir flips the order.
   *
   * @param {1|-1} dir
   * @returns {function(Object, Object): number}
   */
  function byDate(dir) {
    return function (a, b) {
      const da = parseEventDate(a), db = parseEventDate(b);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return (da - db) * dir;
    };
  }

  const upcomingEvents = (d.events || [])
    .filter(function (e) { return !isPastEvent(e); })
    .sort(byDate(1));
  const pastEvents = (d.events || [])
    .filter(isPastEvent)
    .sort(byDate(-1));

  renderList('home-events', upcomingEvents.slice(0, 3), eventRow);  /* homepage: next 3 upcoming */
  renderList('upcoming-events', upcomingEvents, eventRow);          /* events page: upcoming */
  renderList('past-events', pastEvents, eventRow);                  /* events page: past */

  /* nothing coming up: say so instead of leaving an empty box */
  if (!upcomingEvents.length) {
    ['home-events', 'upcoming-events'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = '<p class="events-empty">Nothing scheduled right now. New dates go up in the ' +
          '<a href="https://discord.gg/anmggPyVcs" target="_blank" rel="noopener">Discord</a> first.</p>';
      }
    });
  }
  renderList('reads-list', d.reads, readRow);                        /* blog: further reading */
  renderList('learn-list', d.learn, learnRow);                       /* resources: learn with */
  renderList('committee-list', d.committee, memberRow);              /* committee page */

  /* our own posts (society announcements etc.) always lead, ahead of
     the synced CyberTutor ones - kept in a separate array in data.js
     so the daily sync never overwrites them. */
  const allPosts = (d.ownPosts || []).concat(d.posts || []);

  /* homepage: teaser of the latest 3 blog posts */
  const homePosts = document.getElementById('home-posts');
  if (homePosts && allPosts.length) {
    homePosts.innerHTML = '<div class="post-grid">' + allPosts.slice(0, 3).map(postRow).join('') + '</div>';
  }

  /* blog page: featured first post + grid of the rest */
  const blog = document.getElementById('blog-list');
  if (blog && allPosts.length) {
    blog.innerHTML =
      featuredHtml(allPosts[0]) +
      '<div class="post-grid">' + allPosts.slice(1).map(postRow).join('') + '</div>';
  }
})();
