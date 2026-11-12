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
      date:  "12 nov 2026",
      title: "Japan Pushes Emergency Funding for Cybersecurity as AI-Assisted Breaches Rise",
      desc:  "Japan has announced a ¥10 billion ($63 million) emergency cybersecurity package to counter a sharp rise in cyberattacks and data breaches, funding government-industry response teams, stronger cyber investigations,…",
      tag:   "breach",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!Xlmg!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbb4aac76-c111-42c4-9aea-de8c7db14fa8_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/japan-pushes-emergency-funding-for"
    },
    {
      date:  "11 nov 2026",
      title: "Attackers Say 'Hello' to a Different Scale of Cloud Attack",
      desc:  "Researchers at Era Security discovered “Greeter,” a sophisticated, multistage attack campaign targeting exposed and unpatched Flowise AI-agent servers through the critical code-injection flaw CVE-2024-58351, which…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!9IFO!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdbdcefaf-9062-4448-af4b-c0429d214fa8_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/attackers-say-hello-to-a-different"
    },
    {
      date:  "10 nov 2026",
      title: "Attackers Crash Claude's 'Office Party' Flaw to Run Malicious Code on Linux",
      desc:  "AIR Security researchers have disclosed an unpatched vulnerability, dubbed “Office Party,” in Anthropic Claude’s official DOCX, PPTX, and XLSX document-processing skills that can let an attacker execute malicious…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!obpf!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe4c2b6e7-c736-43dd-8c0d-1859b697c404_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/attackers-crash-claudes-office-party"
    },
    {
      date:  "09 nov 2026",
      title: "AI Gave Your Incident Archive a Second Job",
      desc:  "Security incident records—such as closure notes, rule text, false-positive dispositions, and reasons for suppressing alerts—have traditionally existed to document an organization’s decisions and preserve…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!45yw!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbf9160d6-5328-46bd-b933-0d7c3b1695cc_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/ai-gave-your-incident-archive-a-second"
    },
    {
      date:  "08 nov 2026",
      title: "What We Missed: Knicks Phishing Test Goes Out of Bounds",
      desc:  "Madison Square Garden Sports, owner of the New York Knicks, drew criticism after sending employees a phishing simulation that offered free championship rings just before the team’s banner-raising ceremony; employees…",
      tag:   "phishing",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!HhFN!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd0abe7e1-6219-4f3d-bc2b-06c0f8a76cea_1200x630.jpeg",
      link:  "https://mohammedzuoriki.substack.com/p/what-we-missed-knicks-phishing-test"
    },
    {
      date:  "07 nov 2026",
      title: "UK Wades Into Tech Sovereignty Amid AI Policy Changes",
      desc:  "The UK is investing about $800 million to bolster cyber defences and AI security as it confronts faster, AI-enhanced attacks, while also pursuing digital sovereignty by funding homegrown technology and reducing…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!tvA9!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4b88735c-bf49-4285-9377-182106ea55e1_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/uk-wades-into-tech-sovereignty-amid"
    },
    {
      date:  "06 nov 2026",
      title: "US Government Email Systems Open to Abuse Thanks to Typos",
      desc:  "A study of more than 25,000 government-related domains found that simple DNS errors—such as typos, expired domains, or records pointing to domains later purchased by attackers—can expose public agencies to email…",
      tag:   "policy",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!V0W4!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1e9b265d-f88f-4f20-b339-5625296d4549_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/us-government-email-systems-open"
    },
    {
      date:  "05 nov 2026",
      title: "Google, Partners Disrupt 1.3 Million-Device-Strong XCPE Botnet",
      desc:  "Google and industry partners disrupted the XCPE botnet, which allegedly was built by Android device maker Videostrong and embedded a backdoor in more than 1.3 million Android-based set-top boxes and other IoT devices…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!zNMK!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fed932a1f-9021-4d21-97fa-2f7252873ae2_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/google-partners-disrupt-13-million"
    },
    {
      date:  "04 nov 2026",
      title: "LLMjacking Emerges as Thriving Cybercriminal Enterprise",
      desc:  "Cybercriminals are increasingly monetizing stolen access to commercial large language models through “LLMjacking,” an illicit underground business in which attackers exploit exposed endpoints, stolen cloud identity…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!yHb3!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F35aa9544-e3f4-4a95-9e69-52ad7e8beefe_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/llmjacking-emerges-as-thriving-cybercriminal"
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
