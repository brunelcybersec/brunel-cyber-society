# 🔐 Brunel Cyber Security Society

[![Live Demo](https://img.shields.io/badge/demo-live_site-6FC9D8?style=for-the-badge&logo=githubpages&logoColor=white)](https://brunelcybersec.github.io/brunel-cyber-society/)
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

The official website for Brunel University London's Cybersecurity Society. Built with a terminal-inspired aesthetic, modular content management, and responsive design.

**Live site:** [brunelcybersec.github.io/brunel-cyber-society](https://brunelcybersec.github.io/brunel-cyber-society/)

---

## 📋 About

This website serves as the digital home for the society, providing information about:

- **Who we are** – Committee members and our mission
- **What we do** – Workshops, CTF competitions, guest talks
- **Resources** – Learning platforms and open-source tools
- **Blog** – CTF writeups and society news (coming soon)
- **How to join** – Free membership for 2026/27

We run practical workshops covering everything from web exploitation to digital forensics, compete in national CTF events, and host speakers from industry to talk careers, certifications, and real-world security work.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Page structure |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript** | Dynamic content, mobile menu, wave animation |
| **GitHub Pages** | Free hosting and deployment |

**Design tokens:**
- Black background (`#0B0B0D`)
- White/grey text (`#E9E6E3` / `#8E8B8F`)
- Terminal accents in teal (`#6FC9D8`) and orange (`#E08A6D`)

---

## 📁 Project Structure
brunel-cyber-society/
├── index.html # Homepage
├── events.html # Events + CTF team
├── blog.html # Blog (coming soon)
├── resources.html # Learning resources
├── committee.html # Committee members
├── 404.html # Custom error page
├── assets/
│ └── favicon.svg
├── images/
│ └── logo.png
├── css/
│ ├── core.css # Variables, nav, buttons, footer
│ ├── layout.css # Grids, cards, sections
│ └── components.css # Hero, waves, CTF band
├── js/
│ ├── data.js # ALL content (events, posts) – edit this!
│ ├── render.js # Renders content from data.js
│ ├── site.js # Mobile menu, scroll reveals
│ ├── waves.js # Animated wave background
│ └── typing.js # Terminal typing effect
└── README.md

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **Terminal-style hero** | Typing effect and command-line aesthetic |
| **Animated wave background** | Canvas-based wireframe waves |
| **Modular content management** | Events and blog posts stored in `data.js` – edit one file, updates everywhere |
| **Responsive design** | Works on mobile, tablet, and desktop |
| **Committee page** | Real member names and student IDs |
| **Coming soon placeholders** | Honest messaging for a new society |

---

## 🔄 Updating Content

**To update events or blog posts:** Edit `js/data.js` – the homepage, events page, and blog page update automatically.

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
