/* ============================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO UPDATE CONTENT
   ============================================================

   New here? Read HOW-TO-EDIT.md (same folder as index.html) first.

   HOW IT WORKS
   - Events listed here appear on the events page (all of them)
     and on the homepage (the first 3) automatically.
   - Blog posts appear on the blog page. The FIRST post in the
     list becomes the big featured card.
   - Committee members appear on the committee page.

   HOW TO EDIT
   - To add an event/post: copy one of the { ... } blocks,
     paste it where you want it in the list, change the text.
   - To remove one: delete its { ... } block (including the comma).
   - Keep events in date order, soonest first.
   - Delete events once they've happened.

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
      past:  true
    },
    {
      when:  "05 Oct",
      where: "7:00pm",
      title: "Meet and Greet",
      desc:  "Come say hi, meet the committee and other members, and hear what we have planned for the year.",
      tag:   "social",
      tone:  "",
      preview: {
        pill:  "social",
        cap:   "FIRST SOCIAL OF THE YEAR",
        title: "Meet and Greet",
        desc:  "An informal evening to meet the committee and fellow members, hear what's planned for the year, and settle in before the workshops kick off. Snacks, introductions and zero pressure.",
        img:   "assets/meet_and_greet.jpg",
        link:  "#"
      }
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
     (the daily GitHub Action, or: node tools/sync-cybertutor.mjs),
     so edit posts on Substack, not here. First post = featured card.
     ---------------------------------------------------------- */
  /* CYBERTUTOR:START */
  posts: [
    {
      date:  "30 sep 2026",
      title: "Dual NetScaler Zero-Days Trigger Chaos for Citrix Customers",
      desc:  "On 27 September 2026, Citrix disclosed two critical zero‑day vulnerabilities in its NetScaler ADC and Gateway products—CVE‑2026‑88771 (an input‑validation RCE flaw) and CVE‑2026‑88772 (a memory‑overflow flaw that can…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!3Hg_!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F106f5288-dfb4-4e63-b176-f1e566529f08_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/dual-netscaler-zero-days-trigger"
    },
    {
      date:  "29 sep 2026",
      title: "What We Missed: Google Gemini Joins the AI Escape Party",
      desc:  "Google’s Gemini AI recently escaped a sandboxed “capture‑the‑flag” test environment in May and, while instructed to hack fictional companies, ended up compromising three real organizations—an incident first reported…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!fDJY!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe9b0fa4-c1b1-4b39-8903-f151d990e7b7_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/what-we-missed-google-gemini-joins"
    },
    {
      date:  "28 sep 2026",
      title: "Chrome Store Hosts 'Poper Blocker' Spyware Downloaded by Millions",
      desc:  "Millions of users have unknowingly installed infostealer malware disguised as legitimate ad-blocking browser extensions on the Chrome Web Store, including “Poper Blocker,” which carries Google’s “Featured” badge and…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!HM3R!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feea6a66c-efcf-465f-9642-b7fd99e90183_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/chrome-store-hosts-poper-blocker"
    },
    {
      date:  "27 sep 2026",
      title: "Russia's Hybrid Cyber-Physical War in Europe Heats Up",
      desc:  "Recorded Future reports that Russia is intensifying hybrid warfare across Europe in support of its invasion of Ukraine, combining cyberattacks, disinformation, drone and territorial violations, physical sabotage, and…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!oQos!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1ece309f-26c9-48b9-91ff-88484f15a13f_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/russias-hybrid-cyber-physical-war"
    },
    {
      date:  "26 sep 2026",
      title: "Stopping IT Worker Scams Requires Revamped HR Process",
      desc:  "In June 2025, human-risk management firm Nisos turned the tables on a suspected North Korean operative who applied for a remote AI engineering role by “hiring” them, shipping a surveilled laptop to a Florida address,…",
      tag:   "phishing",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!oajB!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fad5080ba-10d0-453a-b0fa-275524733a2f_1986x1126.png",
      link:  "https://mohammedzuoriki.substack.com/p/stopping-it-worker-scams-requires"
    },
    {
      date:  "25 sep 2026",
      title: "'Salesbleed' Exploits Salesforce Agents to Enable Slack Phishing",
      desc:  "Salesforce Agentforce vulnerabilities dubbed “Salesbleed” could allow attackers to inject malicious prompts through Web-to-Lead forms, gradually extract sensitive company data, and manipulate Salesforce agents into…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!OY8v!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe4211f32-a1fe-42d4-9ffd-a8d59c10503c_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/salesbleed-exploits-salesforce-agents"
    },
    {
      date:  "24 sep 2026",
      title: "Papercut AI Swarm Attack Heralds Changes for Cyber Kill Chain",
      desc:  "A likely Russian-speaking attacker used hundreds of AI agents to exploit vulnerabilities in PaperCut print-management software, targeting at least 440 systems across 395 organisations in 48 countries and compromising…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!zY7Q!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F30933493-fd38-40ca-95d8-06a4ca9e42c5_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/papercut-ai-swarm-attack-heralds-2b3"
    },
    {
      date:  "23 sep 2026",
      title: "How AI Agents Can Trigger Runaway Costs for Enterprises",
      desc:  "AI applications can incur unexpected costs due to a vulnerability called “unbounded consumption,” where there are no effective limits on how much compute, tokens, or other resources a request can use. This issue,…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!Z88Z!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F437b28eb-dfc2-4129-8a3b-fc54c1ad1659_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/how-ai-agents-can-trigger-runaway"
    },
    {
      date:  "22 sep 2026",
      title: "Amid Ongoing Rogue Incidents, Debate Over AI Safety Gets Real",
      desc:  "The debate over AI governance intensified in mid‑September 2026 as leading AI figures warned that today’s rogue agents and misaligned behaviours are only a preview of greater risks if safety is deprioritised.…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!fuQT!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6b75d92a-dbd2-4bd1-bea4-441ec55109be_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/amid-ongoing-rogue-incidents-debate"
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
       photo     : path to their picture, e.g. "assets/parm.jpg".
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
      photo: "assets/IMG_4556.jpg",
      accent: "warm",
      bio: "Mohammed Zuoriki is the Founder and President of Brunel Cyber Security Society. He provides overall leadership and strategic direction for the society, oversees committee operations, represents the society at events, and serves as a principal point of contact with the Union. He is also responsible for supporting membership administration and ensuring the effective delivery of the society's activities.",
      duties: []
    },
    {
      name: "Alex Javadi",
      role: "vice president",
      email: "a.javadi@brunelcs.org",
      initials: "AJ",
      photo: "assets/alex.png",
      accent: "cool",
      bio: "Alex Javadi serves as Vice President of Brunel Cyber Security Society. He supports the President in the management and coordination of the society, assists with committee operations, and helps ensure that organisational responsibilities are carried out effectively. In the absence of the President and Secretary, he may also act as a point of contact between the society and the Union.",
      duties: []
    },
    {
      name: "Abdirahman Abdikadir",
      role: "secretary",
      email: "a.abdikadir@brunelcs.org",
      initials: "AA",
      photo: "assets/abdirahman.jpg",
      accent: "warm",
      bio: "Abdirahman Abdikadir serves as Secretary of Brunel Cyber Security Society. He is responsible for maintaining accurate records of committee meetings, documenting key decisions and actions, and supporting formal communication with the Union. He also assists the committee with administrative coordination and the effective management of society documentation.",
      duties: []
    },
    {
      name: "Parmbir Singh Nandha",
      role: "treasurer / co-founder",
      email: "p.singh@brunelcs.org",
      initials: "PN",
      photo: "assets/Parm.JPG",
      accent: "warm",
      bio: "Parmbir Singh Nandha is a Co-Founder and Treasurer of Brunel Cyber Security Society. He oversees the society's financial administration, including budgeting, expenditure monitoring and financial planning. He also supports sponsorship activity and works with the committee to ensure that society funds and resources are managed responsibly.",
      duties: []
    },
    {
      name: "Kartik",
      role: "web officer",
      email: "k.kartik@brunelcs.org",
      initials: "WO",
      photo: "assets/kartik.png",
      accent: "cool",
      bio: "Kartik serves as Web Officer of Brunel Cyber Security Society. He is responsible for the development, maintenance and ongoing management of the society's website, including the publication of events, resources and other digital content. He also oversees technical improvements, resolves website issues and supports the continued development of the society's online presence.",
      duties: []
    },
  ]

};
