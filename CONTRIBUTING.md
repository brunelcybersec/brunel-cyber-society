# Contributing to brunelcs.org

This website is built by students, for students, and **first-time contributors are welcome**. You don't need to be on the committee or know a framework: the site is plain HTML, CSS and JavaScript.

## Good first contributions

- Fix a typo, a broken link or unclear wording.
- Improve accessibility: alt text, keyboard support, colour contrast.
- Add a learning resource you actually use to `frontend/js/data.js` (`learn:`).
- Suggest something new by opening an issue first, so we can agree on it before you build it.

Content updates such as events and committee details are usually made by the committee. See [HOW-TO-EDIT.md](HOW-TO-EDIT.md).

## Run it locally

```bash
git clone https://github.com/brunelcybersec/brunel-cyber-society.git
cd brunel-cyber-society
python -m http.server 8000 --directory frontend   # then open http://localhost:8000
```

Node.js 18+ is needed only for the tools:

```bash
node backend/tools/check-site.mjs       # run before every pull request
node backend/tools/check-contrast.mjs   # if you changed colours
node backend/tools/build-calendar.mjs   # to preview /events.ics locally
```

## Making a pull request

1. Fork the repo and create a branch: `git checkout -b fix-footer-typo`.
2. Keep the change focused: one fix or feature per pull request.
3. Run `node backend/tools/check-site.mjs` and make sure it passes.
4. Check your change in **both themes** (the toggle is in the nav) and at phone width.
5. Open the pull request and describe what changed and why. Screenshots help.

A committee member will review it. The checks run automatically on every pull request.

## House rules for the code

- **No frameworks or build step.** If it needs `npm install` to run, it probably doesn't belong here.
- **No inline `<script>`, `style="..."` or `onclick="..."`.** The Content-Security-Policy blocks them. Put code in `frontend/js/` and styles in `frontend/css/styles.css`.
- **Use the colour tokens** (`var(--text)`, `var(--muted)`, ...) rather than hex codes, so both themes keep working.
- **New third-party resources** (fonts, embeds, images from another site) need a CSP update. See [deploy/security-headers/README.md](deploy/security-headers/README.md).
- **Respect `prefers-reduced-motion`.** Any new animation needs a reduced-motion fallback.
- **Never commit secrets** (tokens, passwords, API keys).

## Security issues

Found a vulnerability in the site? Please **don't** open a public issue. Email [contact@brunelcs.org](mailto:contact@brunelcs.org) with the details and we'll get back to you.
