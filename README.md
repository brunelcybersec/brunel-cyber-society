# 🔐 Brunel Cyber Security Society

[![Live website](https://img.shields.io/badge/website-brunelcs.org-6FC9D8?style=for-the-badge&logo=githubpages&logoColor=white)](https://brunelcs.org/)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

The official website for **Brunel University London's Cyber Security Society**. A student-built home for workshops, Capture the Flag (CTF) competitions, learning resources, society events and membership information.

**Live website:** [brunelcs.org](https://brunelcs.org/) · **Membership:** [Brunel Students' Union](https://brunelstudents.com/organisation/cybersoc/)

## About the society

We're a student-run community for anyone interested in understanding how systems work, how they break and how to secure them. Students from any course and experience level are welcome.

The website helps visitors find:

- **Events and CTFs** — workshops, competitions, talks and society activities.
- **Learning resources** — platforms, labs and tools for developing practical skills.
- **Stay Safe** — advice on passwords, MFA, phishing and safer online habits.
- **The committee** — the students running the society.
- **Membership and contact information** — how to join, get involved or reach the team.

The [blog](https://brunelcs.org/pages/blog.html) is **temporarily hidden from the homepage and main navigation**, pending a committee decision. The page and its automated CyberTutor content sync remain intact.

## Society highlight: Operation Cymbal — Cold Room 2026

The **BrunelCS** team participated in **Operation Cymbal: Cold Room 2026 CTF** (29 October–1 November 2026), involving Google Cloud Security, Hack The Box and the Google Cloud Security Community. The challenges provided hands-on experience with Google SecOps and security investigation workflows.

| Reported result | BrunelCS |
| --- | ---: |
| Team ranking | **321st of 1,716 teams** |
| Challenges completed | **18/18** |
| Points earned | **2,075** |

These results are taken from the competition summary shared by a participant. The website's [Events & CTF page](https://brunelcs.org/pages/events.html) is the place for society competitions and future updates.

## Features

- **Custom visual identity:** terminal-inspired styling, dark colour palette, and animated canvas wireframe waves.
- **Responsive pages:** layouts designed for desktop and mobile.
- **Content managed in one place:** events, committee information and learning links are maintained through `frontend/js/data.js`.
- **Automatically dated events:** upcoming and past events are determined from each event's `date` field.
- **Dark and light themes:** the terminal-style dark theme is the default; a nav toggle switches to a light theme and remembers the choice.
- **Accessibility considerations:** skip links, keyboard support, touch-sized mobile menu, live reduced-motion handling, and WCAG AA text contrast in both themes (enforced by `check-contrast.mjs`).
- **Subscribable events calendar:** `/events.ics` is generated from `data.js` on every deploy.
- **Hall of Fame:** CTF results, CTFtime ranking and member spotlights, managed in `data.js`.
- **Strict Content-Security-Policy:** no inline scripts or styles; see [deploy/security-headers](deploy/security-headers/README.md) for HSTS and frame protection.
- **Security awareness:** student-focused guidance and external-link checks.
- **Automated publishing:** GitHub Actions runs site checks before deployment to GitHub Pages.
- **Preserved blog system:** CyberTutor articles can still be updated automatically while the blog is hidden from the primary navigation.

## Tech stack

| Technology | Use |
| --- | --- |
| HTML5 | Semantic page structure; no frontend framework or build step |
| CSS3 | Layout, responsive styling, typography and animation |
| Vanilla JavaScript | Content rendering, navigation, UI behaviour and canvas effects |
| Node.js (tooling) | Site validation and CyberTutor RSS synchronisation |
| GitHub Actions | Pull-request checks, deployment and scheduled blog updates |
| GitHub Pages | Hosting the static `frontend/` directory at `brunelcs.org` |

### Design system

| Element | Value |
| --- | --- |
| Background | `#0B0B0D` |
| Primary text | `#E9E6E3` |
| Muted text | `#8E8B8F` |
| Teal accent | `#6FC9D8` |
| Coral accent | `#E08A6D` |
| Headings | Space Grotesk |
| Body | Inter |
| Technical labels | JetBrains Mono |

The original page layouts were designed in **Figma**, with an intentionally restrained, terminal-inspired identity rather than a generic cybersecurity template.

## Project structure

```text
brunel-cyber-society/
├── frontend/                       # The website: everything here is published as-is
│   ├── index.html                  # Homepage
│   ├── 404.html                    # Custom error page
│   ├── favicon.svg
│   ├── CNAME                       # Custom domain (brunelcs.org)
│   ├── pages/                      # Content pages, published under /pages/
│   │   ├── events.html             # Events, calendar subscribe and CTF team
│   │   ├── hall-of-fame.html       # CTF results, CTFtime ranking, member spotlight
│   │   ├── resources.html          # Learning resources
│   │   ├── security-basics.html    # Password, MFA and phishing guidance
│   │   ├── committee.html          # Committee members
│   │   ├── contact.html            # Contact channels and FAQ
│   │   ├── credits.html            # Design and development credits
│   │   └── blog.html               # Blog (currently unlisted, not deleted)
│   ├── css/
│   │   └── styles.css              # Design tokens (both themes) and all page styles
│   ├── js/
│   │   ├── data.js                 # ← content: events, committee, hall of fame, posts
│   │   ├── head.js                 # Runs in <head>: saved theme + boot-screen skip
│   │   ├── render.js               # Builds page sections from data.js
│   │   ├── site.js                 # Navigation, theme toggle, alerts, link check
│   │   ├── waves.js                # Animated wave canvas
│   │   └── preloader.js            # Boot-screen animation
│   └── assets/
│       ├── brand/                  # Logos and the social-preview image (og-image.png)
│       ├── committee/              # Committee photos, named after the person
│       ├── events/                 # Event photos and videos
│       └── ctf/                    # Competition certificates and screenshots
├── tools/                          # Node scripts for maintainers and CI (not published)
│   ├── check-site.mjs              # Scripts, data, links, asset paths and contrast
│   ├── check-contrast.mjs          # WCAG contrast of colour tokens, both themes
│   ├── build-calendar.mjs          # Generates frontend/events.ics on deploy
│   └── sync-cybertutor.mjs         # Syncs posts from the CyberTutor RSS feed
├── deploy/
│   └── security-headers/           # _headers / .htaccess for HSTS, CSP, X-Frame-Options
├── .github/workflows/
│   ├── check.yml                   # Checks on every pull request
│   ├── deploy.yml                  # Check, build calendar, publish frontend/
│   └── update-blog.yml             # Daily CyberTutor sync
├── CONTRIBUTING.md                 # How to open a pull request
├── HOW-TO-EDIT.md                  # Editing guide for committee members
└── README.md
```

## Run locally

Clone the repository and serve `frontend/` as a static website:

```bash
git clone https://github.com/brunelcybersec/brunel-cyber-society.git
cd brunel-cyber-society
python -m http.server 8000 --directory frontend
```

Open **http://localhost:8000** in your browser. On Windows, use `py` instead of `python` if required. Alternatively, use `npx serve frontend` if you have Node.js installed.

The frontend needs **no dependency installation or build step**. Node.js 18+ is needed only if you want to run the maintenance tools locally.

## Update website content

Most committee updates belong in **`frontend/js/data.js`**. The homepage, Events page and Committee page use this content without having to edit each page manually.

For example, an event entry uses the following structure (**illustrative only — not a real announced event**):

```javascript
{
  when:  "10 Feb",
  where: "18:00 · Room TBC",
  title: "Example security workshop",
  desc:  "A sample event used to demonstrate the data format.",
  tag:   "workshop",
  tone:  "cool",
  date:  "2027-02-10"
}
```

The `date` must be in `YYYY-MM-DD` format. It determines whether the website displays the event as upcoming or past. The `when` and `where` fields are the text visitors see.

For non-technical editing instructions, see **[HOW-TO-EDIT.md](HOW-TO-EDIT.md)**.

### Blog status and restoration

The CyberTutor blog is **hidden, not removed**:

- `frontend/pages/blog.html` is still reachable directly at `/pages/blog.html`.
- The homepage blog section and navigation links are commented out with `BLOG-HIDDEN` markers.
- The [blog sync workflow](.github/workflows/update-blog.yml) still runs at **07:00 UTC daily**, fetching posts from the [CyberTutor RSS feed](https://mohammedzuoriki.substack.com/feed).
- A maintainer can run the sync manually from GitHub Actions or execute `node tools/sync-cybertutor.mjs` locally.

To restore the blog to the main site, search `frontend/` for **`BLOG-HIDDEN`** and carefully remove the corresponding HTML comment wrappers, then run the site checks. The page's code, content and sync automation do not need to be rebuilt.

The workflow uses a repository secret named `GH_PAT` for committing updates in a way that can trigger the deployment workflow. Maintainers should manage that secret through GitHub Actions settings; **never put token values in this repository**.

## Checks and deployment

Before opening a pull request, run:

```bash
node tools/check-site.mjs
```

This checks JavaScript syntax, validates required event dates and verifies that local links and media paths exist with the correct spelling and capitalisation.

- **Pull requests:** [`.github/workflows/check.yml`](.github/workflows/check.yml) runs the checks automatically.
- **Deployments:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs the same checks, then publishes `frontend/` to GitHub Pages after relevant changes are pushed to `main`.
- **Blog sync:** [`.github/workflows/update-blog.yml`](.github/workflows/update-blog.yml) updates the feed data and can trigger a new deployment.

A **README-only change does not trigger a website deployment**, since the deployment workflow watches the website and relevant workflow/tooling paths.

To configure hosting, use **Settings → Pages → Build and deployment → Source → GitHub Actions** in the repository. The `frontend/CNAME` file is used for the custom domain.

## Credits

The website was designed and developed as a Brunel Cyber Security Society student project.

- **Original UI design:** desktop and mobile Figma designs for the homepage, committee, events and CTF pages; design decisions covered typography, colour and layout. The designer's name should be added here once confirmed.
- **Original website development:** **Parmbir Singh Nandha, Mohammed Zuoriki and Abdirahman Abdikadir**.
- **Ongoing maintenance:** the current Brunel Cyber Security Society committee.

See the [Credits page](https://brunelcs.org/pages/credits.html) for design and technical acknowledgements.

## Contributing and contact

Contributions to the website, documentation and society resources are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md), and consult [HOW-TO-EDIT.md](HOW-TO-EDIT.md) before changing content.

- [Discord](https://discord.gg/anmggPyVcs)
- [Instagram](https://www.instagram.com/cybersoc.brunel/)
- [GitHub](https://github.com/brunelcybersec)
- [Email](mailto:contact@brunelcs.org)

If you find a potential security issue, contact the committee privately via email rather than posting exploit details in a public issue.
