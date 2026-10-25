# 🔐 Brunel Cyber Security Society

[![Live Demo](https://img.shields.io/badge/demo-live_site-6FC9D8?style=for-the-badge&logo=githubpages&logoColor=white)](https://brunelcs.org)

[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)

[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

The official website for Brunel University London's Cybersecurity Society. Built with a terminal-inspired aesthetic, modular content management, and responsive design.

 **Live site:** [brunelcs.org](https://brunelcs.org)

---

## 📋 About

This website serves as the digital home for the society, providing information about:

- **Who we are** – Committee members and our mission
- **What we do** – Workshops, CTF competitions, guest talks
- **Resources** – Learning platforms and open-source tools
- **Blog** – CTF writeups and society news, auto-synced from our [CyberTutor Substack](https://mohammedzuoriki.substack.com/)
- **How to join** – Free membership for 2026/27
- **Contact & credits** – Ways to reach the committee, and who built the site

We run practical workshops covering everything from web exploitation to digital forensics, compete in national CTF events, and host speakers from industry to talk careers, certifications, and real-world security work.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Page structure – no framework, no build step |
| **CSS3** | Styling, animations, responsive design (single stylesheet) |
| **Vanilla JavaScript** | Dynamic content, mobile menu, wave animation, typing effect |
| **Node.js** (GitHub Action only) | Scheduled script that syncs blog posts from Substack |
| **GitHub Pages** | Free hosting, deployed from `frontend/` (`.github/workflows/deploy.yml`) |
| **GitHub Actions** | Daily automated blog sync (`.github/workflows/update-blog.yml`) |

**Design tokens:**
- Black background (`#0B0B0D`)
- White/grey text (`#E9E6E3` / `#8E8B8F`)
- Terminal accents in teal (`#6FC9D8`) and orange (`#E08A6D`)

---

## 📁 Project Structure

```
brunel-cyber-society/
├── backend/
│   └── tools/
│       └── sync-cybertutor.mjs   # Pulls latest posts from the CyberTutor Substack RSS feed
├── frontend/
│   ├── index.html                # Homepage
│   ├── events.html               # Events + CTF team
│   ├── blog.html                 # Blog (CyberTutor writeups, auto-synced)
│   ├── resources.html            # Learning resources
│   ├── committee.html            # Committee members
│   ├── contact.html              # Contact page
│   ├── credits.html              # Site credits
│   ├── 404.html                  # Custom error page
│   ├── security-basics.html      # Stay-safe guide (passwords, MFA, phishing)
│   ├── crack-the-vault.html      # Vault-cracking reflex mini-game
│   ├── favicon.svg               # Site favicon
│   ├── CNAME                     # Custom domain (brunelcs.org)
│   ├── assets/                   # Images: logos, committee photos, OG image
│   ├── css/
│   │   └── styles.css            # All styling (variables, layout, components)
│   └── js/
│       ├── data.js               # ALL content (events, committee, blog posts) – edit this!
│       ├── render.js             # Renders content from data.js into the pages
│       ├── site.js               # Mobile menu, scroll reveals
│       ├── waves.js              # Animated wave background
│       └── preloader.js          # Page preloader
├── .github/workflows/
│   ├── deploy.yml                # Publishes frontend/ to GitHub Pages on every push to main
│   └── update-blog.yml           # Daily GitHub Action that runs the sync script
├── HOW-TO-EDIT.md                # Non-technical guide for committee members
├── README.md                     # Project overview
├── .gitignore
└── .gitattributes
```

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **Terminal-style hero** | Typing effect and command-line aesthetic |
| **Animated wave background** | Canvas-based wireframe waves |
| **Modular content management** | Events, committee, and blog posts stored in `data.js` – edit one file, updates everywhere |
| **Auto-synced blog** | GitHub Action pulls new CyberTutor Substack posts into the site daily, no manual copy-paste |
| **Responsive design** | Works on mobile, tablet, and desktop |
| **Committee page** | Real member names, photos, and roles |

---

## 🔄 Updating Content

**To update events or committee members:** Edit `frontend/js/data.js` – the homepage, events page, and committee page update automatically.

```javascript
// Example: Adding a new event
events: [
  {
    when:  "wed 15 oct",
    where: "18:00 · LC265",
    title: "Intro to web exploitation",
    desc:  "SQL injection, XSS and how to practise legally.",
    tag:   "workshop",
    tone:  "cool"
  }
]
```

Not comfortable editing code directly? See [`HOW-TO-EDIT.md`](HOW-TO-EDIT.md) for a plain-English guide aimed at non-technical committee members.

**Blog posts are automatic:** a [GitHub Action](.github/workflows/update-blog.yml) runs `backend/tools/sync-cybertutor.mjs` every day at 07:00 UTC, pulls the latest posts from the [CyberTutor Substack feed](https://mohammedzuoriki.substack.com/feed), and commits any changes to `frontend/js/data.js` directly. You can also trigger it manually from the **Actions** tab, or run `node backend/tools/sync-cybertutor.mjs` locally (requires Node 18+, no dependencies).

---

## 🚀 Deployment

`frontend/` is the website; everything else is tooling and docs. The
[deploy workflow](.github/workflows/deploy.yml) uploads `frontend/` to GitHub Pages on every push to
`main` that touches it, so the live URLs stay at the root (`brunelcs.org/events.html`).

**One-time setup:** in the repo go to **Settings → Pages → Build and deployment → Source** and pick
**GitHub Actions**. The custom domain `brunelcs.org` stays as configured there.

**Run locally:** open `frontend/index.html` in a browser, or serve the folder with
`npx serve frontend` so root-absolute links on the 404 page resolve.
