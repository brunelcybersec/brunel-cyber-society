/* Renders events and blog posts from js/data.js into the pages.
   You should never need to edit this file — edit js/data.js instead. */
(function () {
  const d = window.SITE_DATA || {};

  /* Escape text before putting it in HTML, so titles/descriptions
     containing & < > " (e.g. "Crypto & C2") render correctly and
     can never break the page. */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function pillHtml(item) {
    return '<span class="pill ' + esc(item.tone) + '">[' + esc(item.tag) + ']</span>';
  }

  /* external (http/https) links open in a new tab; same-site links don't */
  function isExternal(link) { return /^https?:/i.test(link || ''); }
  function linkAttrs(link) { return isExternal(link) ? ' target="_blank" rel="noopener"' : ''; }
  function readLabel(link) {
    if (/substack\.com/i.test(link || '')) return 'read on Substack ↗';
    if (isExternal(link)) return 'read more ↗';
    return 'read more →';
  }

  /* optional post image (Substack thumbnail); decorative + lazy-loaded */
  function mediaImg(src, cls) {
    return src
      ? '<div class="' + cls + '"><img src="' + esc(src) + '" alt="" loading="lazy" decoding="async"></div>'
      : '';
  }

  /* optional rich hover card for an event (e.preview) */
  function previewHtml(p) {
    if (!p) return '';
    const media = (p.gallery || []).map(function (item) {
      if (item.type === 'video') {
        return '<video class="ev-video" autoplay muted loop playsinline preload="metadata" poster="' + esc(item.poster || '') + '"><source src="' + esc(item.src) + '" type="video/mp4"></video>';
      }
      return '<img class="ev-img" src="' + esc(item.src) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">';
    }).join('');
    const fallbackImg = !media && p.img
      ? '<img class="ev-img" src="' + esc(p.img) + '" alt="" loading="lazy" decoding="async" onerror="this.remove()">'
      : '';
    const fallbackVideo = !media && p.video
      ? '<video class="ev-video" autoplay muted loop playsinline preload="metadata" poster="' + esc(p.img || '') + '"><source src="' + esc(p.video) + '" type="video/mp4"></video>'
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
          (p.link ? '<a class="ev-more mono" href="' + esc(p.link) + '"' + linkAttrs(p.link) + '>Read more →</a>' : '') +
          (p.socialLink ? '<a class="ev-more mono" href="' + esc(p.socialLink) + '"' + linkAttrs(p.socialLink) + '>View Instagram post ↗</a>' : '') +
        '</div>' +
      '</div></div>'
    );
  }

  function eventRow(e) {
    return (
      '<div class="event' + (e.preview ? ' has-preview' : '') + (e.past ? ' past-event' : '') + '">' +
        '<span class="date">' + esc(e.when) + '<br>' + esc(e.where) + '</span>' +
        '<div class="event-main"><h3>' + esc(e.title) + '</h3><p>' + esc(e.desc) + '</p>' +
          previewHtml(e.preview) +
        '</div>' +
        pillHtml(e) +
      '</div>'
    );
  }

  /* a secondary blog post, rendered as a card in the grid below the featured */
  function postRow(p) {
    return (
      '<a class="post-card' + (p.image ? ' has-media' : '') + '" href="' + esc(p.link || '#') + '"' + linkAttrs(p.link) + '>' +
        mediaImg(p.image, 'post-thumb') +
        '<p class="meta">[' + esc(p.tag) + '] · ' + esc(p.date) + '</p>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.desc) + '</p>' +
        '<span class="read">' + readLabel(p.link) + '</span>' +
      '</a>'
    );
  }

  /* a "learn with" platform card on the resources page */
  function learnRow(l) {
    return (
      '<a class="learn-card" href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
        '<span class="lc-top">' +
          '<span class="lc-name">' + esc(l.name) + ' ↗</span>' +
          (l.level ? '<span class="lc-level">' + esc(l.level) + '</span>' : '') +
        '</span>' +
        '<p class="lc-note">' + esc(l.note || '') + '</p>' +
      '</a>'
    );
  }

  /* an external "further reading" link on the blog page */
  function readRow(r) {
    return (
      '<a class="read-link" href="' + esc(r.url) + '" target="_blank" rel="noopener">' +
        '<span class="rl-name">' + esc(r.name) + ' ↗</span>' +
        (r.note ? '<span class="rl-note">' + esc(r.note) + '</span>' : '') +
      '</a>'
    );
  }

  /* a committee member card */
  function memberRow(m) {
    const accent = (m.accent === 'cool') ? 'cool' : 'warm';
    const img = m.photo
      ? '<img src="' + esc(m.photo) + '" alt="' + esc(m.name || '') + '" width="56" height="56" loading="lazy" decoding="async" onerror="this.remove()">'
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

  /* the big featured blog card (first post) */
  function featuredHtml(p) {
    return (
      '<a class="featured' + (p.image ? ' has-media' : '') + '" href="' + esc(p.link || '#') + '"' + linkAttrs(p.link) + '>' +
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

  /* Fill #id with items run through build(). No-op when the container
     isn't on this page or there's nothing to show. */
  function renderList(id, items, build) {
    const el = document.getElementById(id);
    if (el && items && items.length) el.innerHTML = items.map(build).join('');
  }

  renderList('home-events', (d.events || []).filter(function (e) { return !e.past; }).slice(0, 3), eventRow);  /* homepage: upcoming */
  renderList('all-events', d.events, eventRow);                      /* events page: all */
  renderList('reads-list', d.reads, readRow);                        /* blog: further reading */
  renderList('learn-list', d.learn, learnRow);                       /* resources: learn with */
  renderList('committee-list', d.committee, memberRow);              /* committee page */

  /* homepage: teaser of the latest 3 blog posts */
  const homePosts = document.getElementById('home-posts');
  if (homePosts && d.posts && d.posts.length) {
    homePosts.innerHTML = '<div class="post-grid">' + d.posts.slice(0, 3).map(postRow).join('') + '</div>';
  }

  /* blog page: featured first post + grid of the rest */
  const blog = document.getElementById('blog-list');
  if (blog && d.posts && d.posts.length) {
    blog.innerHTML =
      featuredHtml(d.posts[0]) +
      '<div class="post-grid">' + d.posts.slice(1).map(postRow).join('') + '</div>';
  }
})();
