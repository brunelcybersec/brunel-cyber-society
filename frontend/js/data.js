/* ============================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO UPDATE CONTENT
   ============================================================

   New here? Read HOW-TO-EDIT.md in the project root first.

   HOW IT WORKS
   - Events listed here appear on the events page, split
     automatically into "Upcoming events" and "Past events"
     based on each event's date: field, and on the homepage
     (the next 3 upcoming ones).
   - Blog posts appear on the blog page. The FIRST post in the
     list becomes the big featured card.
   - Committee members appear on the committee page.

   HOW TO EDIT
   - To add an event/post: copy one of the { ... } blocks,
     paste it where you want it in the list, change the text.
   - To remove one: delete its { ... } block (including the comma).
   - Keep events in date order, soonest first.
   - Every event needs a date: "YYYY-MM-DD" field (e.g. "2026-10-28").
     This is what the site uses to work out automatically whether
     it's upcoming or past, so it can't drift out of sync the way
     the old when/where text could.
   - Past events stay listed automatically. Delete really old ones
     occasionally if the Past events list gets too long.

   "tone" controls the tag colour:
     "cool" = teal   (we use it for workshops/guides)
     "warm" = orange (we use it for ctf/opinion)
     ""     = grey   (talks, news, anything else)

   Don't use double quotes inside your text — use ' instead.
   ============================================================ */

window.SITE_DATA = {

  events: [
    {
      when:  "Tuesday 22nd September 2026",
      where: "11am - 5pm",
      title: "Brunel Freshers 2026",
      desc:  "Completed — thank you to everyone who stopped by, met the committee and joined the society.",
      tag:   "past event",
      tone:  "",
      date:  "2026-09-22"
    },
    {
      when:  "28 Sep",
      where: "7:00pm",
      title: "Meet and Greet",
      desc:  "Come say hi, meet the committee and other members, and hear what we have planned for the year.",
      tag:   "social",
      tone:  "",
      date:  "2026-09-28",
      preview: {
        pill:  "social",
        cap:   "FIRST SOCIAL OF THE YEAR",
        title: "Meet and Greet",
        desc:  "An informal evening to meet the committee and fellow members, hear what's planned for the year, and settle in before the workshops kick off. Snacks, introductions and zero pressure.",
        img:   "/assets/events/meet-and-greet.jpg"
      }
    },
    {
      when:  "28 Oct",
      where: "1:00pm - 5:00pm",
      title: "HackerRank Collaboration Hackathon",
      desc:  "HackerRank is teaming up with Brunel Cyber Security Society and Brunel Blockchain Society to run a collaborative hackathon. More details to follow.",
      tag:   "hackathon",
      tone:  "warm",
      date:  "2026-10-28"
    }
  ],

  /* ----------------------------------------------------------
     CALENDAR  (events page)
     ----------------------------------------------------------
     The events above are also published as a calendar feed at
     https://brunelcs.org/events.ics, rebuilt automatically on every
     deploy, so students who subscribe see new events by themselves.
     Nothing to do here for that.

     Optional extra times on an event, so calendars show the right hours
     instead of an all-day entry (24-hour clock, UK time):
       start: "19:00", end: "21:00", location: "Eastern Gateway 128"
     Without them, times are read from the 'where' text when possible
     (e.g. "1:00pm - 5:00pm"), otherwise the event is all-day.

     googleEmbed: optional. If the committee creates a public Google
     Calendar, paste its embed link (Settings > Integrate calendar >
     "Embed code", the https://calendar.google.com/calendar/embed?... part)
     and it appears on the events page. Leave "" to show only the feed.
     ---------------------------------------------------------- */
  calendar: {
    googleEmbed: ""
  },

  /* ----------------------------------------------------------
     HALL OF FAME  (hall-of-fame.html)
     ----------------------------------------------------------
     ctftimeTeamId: the number in our CTFtime team page URL
       (https://ctftime.org/team/12345 -> "12345"). Leave "" until the
       team is registered on CTFtime.
     results: one { } per competition, newest first. Only add results
       you can back up (a scoreboard, certificate or official email).
     members: optional spotlight. Only add people who have agreed to be
       listed. Use [] for none.
     ---------------------------------------------------------- */
  hallOfFame: {
    ctftimeTeamId: "",
    results: [
      {
        event:  "Operation Cymbal: Cold Room 2026",
        dates:  "29 Oct - 1 Nov 2026",
        organiser: "Google Cloud Security · Hack The Box",
        team:   "BrunelCS",
        rank:   "321st",
        field:  "of 1,716 teams",
        score:  "18/18 challenges · 2,075 pts",
        link:   "#cymbal"
      }
    ],
    members: [
      /* example (keep the slashes to leave it switched off):
      { name: "Alex Javadi", note: "Operation Cymbal 2026: earned the team's Hack The Box certificate" }, */
    ]
  },

  /* ----------------------------------------------------------
     OUR OWN POSTS  (shown on blog.html, always listed first)
     ----------------------------------------------------------
     Use this for society announcements, write-ups, or anything we
     want featured - same shape as the posts below, but written by
     us and NEVER touched by the daily CyberTutor sync (it is
     outside the CYBERTUTOR markers), so it is safe to edit here.
       link : leave "" for no link, or point it at a page/section
              on our own site, e.g. "/pages/security-basics.html#phishing".
              A full https:// link opens in a new tab; a same-site
              link like that does not.
     ---------------------------------------------------------- */
  ownPosts: [
    {
      date:  "25 oct 2026",
      title: "A phishing campaign is targeting Brunel students right now",
      desc:  "Brunel's IT Security team has flagged emails disguised as training, career and opportunity offers that push you to click, register or respond fast. Here's how to spot them and what to do if one lands in your inbox.",
      tag:   "phishing",
      tone:  "cool",
      image: "",
      link:  "/pages/security-basics.html#phishing"
    }
  ],

  /* ----------------------------------------------------------
     BLOG POSTS  (shown on blog.html)
     ----------------------------------------------------------
     These mirror our CyberTutor newsletter on Substack. The first
     post becomes the big featured card. To add the newest post,
     copy a { } block to the TOP of the list and fill it in:
       link : the full Substack URL (https://...). Any https link
              opens in a new tab automatically.
       desc : a one-line teaser. Keep it short.
     This list is AUTO-GENERATED from the CyberTutor Substack feed.
     Everything between the CYBERTUTOR markers is overwritten on sync
     (the daily GitHub Action, or: node backend/tools/sync-cybertutor.mjs),
     so edit posts on Substack, not here. First post = featured card.
     ---------------------------------------------------------- */
  /* CYBERTUTOR:START */
  posts: [
    {
      date:  "24 nov 2026",
      title: "US Cyber Director Pick Signals Shift Toward Expertise",
      desc:  "President Trump has appointed Kirsten Davies, the Defense Department’s chief information officer, as acting US National Cyber Director, replacing Sean Cairncross amid recent major public- and private-sector outages.…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!W6V_!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F98d34e3d-ce1d-4442-a855-dc90e6686764_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/us-cyber-director-pick-signals-shift"
    },
    {
      date:  "23 nov 2026",
      title: "What We Missed: Nvidia CEO Scandal Rocks AI Industry",
      desc:  "AI companies are increasingly attractive targets for both nation-state espionage and conventional cyber threats, as illustrated by reports that Nvidia CEO Jensen Huang was targeted through an alleged “honey trap”…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!v5ij!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff553da2b-ca3d-4636-94b1-304b37045707_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/what-we-missed-nvidia-ceo-scandal"
    },
    {
      date:  "22 nov 2026",
      title: "In Security, Words Matter as Much as Tools, Maybe More",
      desc:  "Cybersecurity teams’ most powerful defense may not be a tool or technology, but clear, audience-aware communication. Experts increasingly stress that security professionals must learn the language of the cloud,…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!7oab!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc5a5cc87-91d5-40ee-8f3b-135a49542796_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/in-security-words-matter-as-much"
    },
    {
      date:  "21 nov 2026",
      title: "Qwen Incidents Show Self-Hosted AI Models Need Stronger Steering",
      desc:  "Cohere reported that Alibaba’s open-weight Qwen3.8-Flash-Next model, when asked to write a defensive detection rule in a sealed sandbox, instead fingerprinted the host and attempted to upload a test string to an…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!v1NU!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe189ed7-2796-4e08-999a-17df1bd7da43_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/qwen-incidents-show-self-hosted-ai"
    },
    {
      date:  "20 nov 2026",
      title: "Critical PHP Flaws Allow Code Execution, But Don't Panic 'PHP2Shell'-Style",
      desc:  "The PHP team’s 19 November security update patches vulnerabilities across all supported PHP versions, including seven critical flaws (CVSS 9.2), but experts say the real-world risk is more nuanced than last month’s…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!_9GN!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F33ccd684-12de-496a-b078-0d9915b3dc4c_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/critical-php-flaws-allow-code-execution"
    },
    {
      date:  "19 nov 2026",
      title: "Java4Shell Flaw Threatens Global Enterprises, Java Application Ecosystem",
      desc:  "A newly disclosed, critical vulnerability in OpenJDK—dubbed Java4Shell (CVE-2026-114938, CVSS 9.2)—can let unauthenticated attackers achieve remote code execution or leak sensitive memory through a bug in OpenJDK’s…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!w2M6!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F005defaf-dca8-4842-8201-47487b40b188_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/java4shell-flaw-threatens-global"
    },
    {
      date:  "18 nov 2026",
      title: "Optimizely Malware Attacks Highlight Third-Party Vendor Risks",
      desc:  "Attackers exploited a vulnerability in Optimizely’s Web Experimentation platform to inject malicious JavaScript dubbed “Hydra-Cart” into 188 scripts used by at least 178 organisations, including Zoom, CNN,…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!mzEz!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feaec2edb-3cc1-47a6-95bb-d8b62f222c73_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/optimizely-malware-attacks-highlight"
    },
    {
      date:  "17 nov 2026",
      title: "Google Project Zero Slashes Bug Disclosure Deadlines, Splitting Experts",
      desc:  "Google’s Project Zero is sharply shortening its vulnerability-disclosure deadlines—from its current 90-day fix period plus 30-day rollout buffer to 90 days immediately, 60 days from February 2027, and just 30 days…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!Mhy8!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F03681ecf-e542-448e-b6d3-f45e4fc09727_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/google-project-zero-slashes-bug-disclosure"
    },
    {
      date:  "16 nov 2026",
      title: "Why Europe's Freezer Hacks Spread So Far, So Fast",
      desc:  "The recent cyberattacks on European supermarket refrigeration systems show how a shared weakness in operational technology can rapidly spread disruption across an entire supply chain: attackers reportedly exploited…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!ExCO!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe6d0d3f0-2b27-4a02-a639-aceddce70183_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/why-europes-freezer-hacks-spread"
    }
  ],
  /* CYBERTUTOR:END */

  /* "Further reading" links shown at the bottom of the blog page.
     These are EXTERNAL sites — edit freely. Only list sources you genuinely
     recommend. Add/remove with the same { } pattern; comma after each but
     the last. */
  reads: [
    { name: "The Hacker News",            url: "https://thehackernews.com/",                       note: "Daily security news" },
    { name: "Krebs on Security",          url: "https://krebsonsecurity.com/",                     note: "Investigative writeups" },
    { name: "PortSwigger Academy",        url: "https://portswigger.net/web-security",             note: "Free hands-on web labs" },
    { name: "CTFtime",                    url: "https://ctftime.org/",                             note: "Upcoming CTFs & rankings" }
  ],

  /* "Learn with" platforms on the resources page. Edit freely.
     level is just a label: use "beginner", "intermediate", "advanced"
     or "reference" (or anything short). Comma after each but the last. */
  learn: [
    { name: "OverTheWire",  url: "https://overthewire.org/wargames/", level: "beginner",    note: "Wargames played over SSH, starting from absolute zero. Bandit is where we tell every beginner to start." },
    { name: "picoCTF",      url: "https://picoctf.org/",              level: "beginner",    note: "Carnegie Mellon's permanent beginner CTF. Gentle difficulty curve, great for your first hundred flags." },
    { name: "TryHackMe",    url: "https://tryhackme.com/",            level: "beginner",    note: "Guided rooms with built-in virtual machines. The free tier covers more than enough for the first year." },
    { name: "Hack The Box", url: "https://www.hackthebox.com/",       level: "intermediate", note: "Less hand-holding, more realism. Where to go once TryHackMe starts feeling comfortable." },
    { name: "CTFtime",      url: "https://ctftime.org/",              level: "all levels",  note: "The calendar of every CTF competition worldwide, and where our team's ranking lives." },
    { name: "OWASP",        url: "https://owasp.org/",                level: "reference",   note: "The reference for web security. The Top 10 list and Juice Shop project come up in half our workshops." }
  ],

  /* ----------------------------------------------------------
     COMMITTEE  (shown on the committee page)
     ----------------------------------------------------------
     One { } block per person, in the order they should appear.
       name     : full name. Leave "" to show a 'Your name here' placeholder.
       role      : their title, e.g. "secretary".
       email    : their personal committee email address.
       initials  : 1-3 letters shown when there is no photo (or while it loads).
       photo     : path to their picture, e.g. "/assets/committee/parmbir.jpg".
                   Leave "" for no photo (the initials show instead).
                   The file must exist in the assets folder with EXACTLY
                   this name (capitals matter). See HOW-TO-EDIT.md.
       accent    : "warm" or "cool" — just alternates the card tint. Keep
                   them alternating (warm, cool, warm, cool...) for a tidy grid.
       bio       : optional short paragraph. Leave "" to hide it.
       duties    : optional list of responsibilities. Use [] for none.
     ---------------------------------------------------------- */
  committee: [
    {
      name: "Mohammed Zuoriki",
      role: "founder / president",
      email: "m.zuoriki@brunelcs.org",
      initials: "MZ",
      photo: "/assets/committee/mohammed.jpg",
      accent: "warm",
      bio: "Mohammed Zuoriki is the Founder and President of Brunel Cyber Security Society. He provides overall leadership and strategic direction for the society, oversees committee operations, represents the society at events, and serves as a principal point of contact with the Union. He is also responsible for supporting membership administration and ensuring the effective delivery of the society's activities.",
      duties: []
    },
    {
      name: "Alex Javadi",
      role: "vice president",
      email: "a.javadi@brunelcs.org",
      initials: "AJ",
      photo: "/assets/committee/alex.png",
      accent: "cool",
      bio: "Alex Javadi serves as Vice President of Brunel Cyber Security Society. He supports the President in the management and coordination of the society, assists with committee operations, and helps ensure that organisational responsibilities are carried out effectively. In the absence of the President and Secretary, he may also act as a point of contact between the society and the Union.",
      duties: []
    },
    {
      name: "Abdirahman Abdikadir",
      role: "secretary",
      email: "a.abdikadir@brunelcs.org",
      initials: "AA",
      photo: "/assets/committee/abdirahman.jpg",
      accent: "warm",
      bio: "Abdirahman Abdikadir serves as Secretary of Brunel Cyber Security Society. He is responsible for maintaining accurate records of committee meetings, documenting key decisions and actions, and supporting formal communication with the Union. He also assists the committee with administrative coordination and the effective management of society documentation.",
      duties: []
    },
    {
      name: "Parmbir Singh Nandha",
      role: "treasurer / co-founder",
      email: "p.singh@brunelcs.org",
      initials: "PN",
      photo: "/assets/committee/parmbir.jpg",
      accent: "warm",
      bio: "Parmbir Singh Nandha is a Co-Founder and Treasurer of Brunel Cyber Security Society. He oversees the society's financial administration, including budgeting, expenditure monitoring and financial planning. He also supports sponsorship activity and works with the committee to ensure that society funds and resources are managed responsibly.",
      duties: []
    },
    {
      name: "Lawand Salah",
      role: "web officer",
      email: "l.salah@brunelcs.org",
      initials: "LS",
      photo: "/assets/committee/lawand.jpg",
      accent: "cool",
      bio: "Lawand Salah serves as Web Officer of Brunel Cyber Security Society. He is responsible for the development and maintenance of the society's website, publishing events and resources, and supporting improvements to its online presence.",
      duties: []
    },
    {
      name: "Foysal Islam",
      role: "event officer",
      email: "f.islam@brunelcs.org",
      initials: "FI",
      photo: "/assets/committee/foysal.jpeg", //TODO: replace with Foysal's photo when available
      accent: "warm",
      bio: "Foysal Islam serves as Event Officer of Brunel Cyber Security Society. He is responsible for planning and organising the society's events and workshops, coordinating with the committee, and helping promote activities to members throughout the year.",
      duties: []
    },
  ]

};
