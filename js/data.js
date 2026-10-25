/* ============================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO UPDATE CONTENT
   ============================================================

   New here? Read HOW-TO-EDIT.md (same folder as index.html) first.

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
        img:   "assets/meet_and_greet.jpg",
        link:  "#"
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
     OUR OWN POSTS  (shown on blog.html, always listed first)
     ----------------------------------------------------------
     Use this for society announcements, write-ups, or anything we
     want featured - same shape as the posts below, but written by
     us and NEVER touched by the daily CyberTutor sync (it is
     outside the CYBERTUTOR markers), so it is safe to edit here.
       link : leave "" for no link, or point it at a page/section
              on our own site, e.g. "security-basics.html#phishing".
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
      link:  "security-basics.html#phishing"
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
      date:  "24 oct 2026",
      title: "Exposed to PHP2Shell? Cyber Experts Weigh in With Advice",
      desc:  "Organizations are struggling to patch the newly disclosed “PHP2Shell” vulnerabilities (CVE-2026-109618 and CVE-2026-109619) as quickly as attackers are exploiting them: threat activity surged from thousands of…",
      tag:   "breach",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!CS5-!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe647fb11-5b27-4412-ab87-d70d2fdd359d_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/exposed-to-php2shell-cyber-experts"
    },
    {
      date:  "23 oct 2026",
      title: "OVHcloud GitHub Compromise Tied to GlassWorm Threat Actors",
      desc:  "GlassWorm-linked threat actors compromised an OVHcloud developer’s GitHub account—likely via a malicious VS Code extension installed on their personal MacBook—and used it to replace official release binaries in the…",
      tag:   "breach",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!VXPQ!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa98fca62-93df-473b-8346-dc760d5556a4_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/ovhcloud-github-compromise-tied-to"
    },
    {
      date:  "22 oct 2026",
      title: "'PHP2Shell' Bugs Signal Red Alert for Security Industry",
      desc:  "Two critical PHP vulnerabilities, dubbed “PHP2Shell,” allow unauthenticated remote code execution on vulnerable web servers and have been assigned a critical CVSS score of 9.2. The flaws arise from stale memory and…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!J7sb!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a19802c-e811-41f5-8bd2-81e498985630_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/php2shell-bugs-signal-red-alert-for"
    },
    {
      date:  "21 oct 2026",
      title: "Ex-OpenAI Engineer Detained After Planting Secret Recorder at HQ",
      desc:  "A US judge has ordered former OpenAI engineer Abdulrahman Alfozan, a 35-year-old Saudi national, to remain in custody while he awaits trial on charges of secretly installing an audio-recording device in an OpenAI…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!0KfT!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6c341de8-3681-44fc-838c-a8bd584844ae_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/ex-openai-engineer-detained-after"
    },
    {
      date:  "20 oct 2026",
      title: "Researchers Infiltrate Microsoft Tech Support Scam Operation",
      desc:  "Infoblox researchers have exposed Help TDS, a long-running traffic-distribution system operated since at least 2017 by the Russian-language affiliate network Hotejka, which redirects victims from compromised…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!HpzW!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe22cf21e-c535-4bee-8152-5be8c9fe8a5e_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/researchers-infiltrate-microsoft"
    },
    {
      date:  "19 oct 2026",
      title: "BeyondTrust Remote Support Zero-Day Continues Trend of Exploited Edge Bugs",
      desc:  "A suspected China-linked espionage group, Armory Castle (formerly UNC5221/Warp Panda), exploited a critical zero-day in BeyondTrust Remote Support—CVE-2026-102764, CVSS 9.3—since 29 August 2026, using improper origin…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!9ZYr!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F43fd2e4a-e6dd-4e26-aa1b-809908eeba55_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/beyondtrust-remote-support-zero-day-ddb"
    },
    {
      date:  "18 oct 2026",
      title: "AI Takes Control of Robotic Arm in 16 Minutes Flat",
      desc:  "Lab tests by Booz Allen found that frontier AI models could rapidly breach operational technology (OT) environments—such as utilities and factories—by identifying misconfigured devices, traversing multiple network…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!EP6Q!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F72fe633c-dea2-4f53-b07c-c8c4203f381a_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/ai-takes-control-of-robotic-arm-in"
    },
    {
      date:  "16 oct 2026",
      title: "AI Slop Isn't Just for Social Media; It's Ruining Cyberattacks, Too",
      desc:  "Despite alarming headlines claiming that AI is broadly enhancing cyberattacks, threat researchers say the reality is more mixed: some cybercrime groups and even state-sponsored actors are using AI to automate…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!OT3R!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F17cc392f-25e8-41db-b403-1d6a4a91dc78_1264x824.png",
      link:  "https://mohammedzuoriki.substack.com/p/ai-slop-isnt-just-for-social-media"
    },
    {
      date:  "15 oct 2026",
      title: "EU Grocers Pay a Steep Price for Unpatched Fridge Firmware",
      desc:  "Hundreds of French grocery stores lost potentially many millions of euros after hackers remotely manipulated refrigeration controllers overnight on Monday, turning fridges, freezers, and cold-storage rooms into…",
      tag:   "policy",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!_gBa!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F324adbc8-6b4c-4b71-a486-dbcebc5d4418_1280x719.webp",
      link:  "https://mohammedzuoriki.substack.com/p/eu-grocers-pay-a-steep-price-for"
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
    {
      name: "Lawand Salah",
      role: "events officer",
      email: "l.salah@brunelcs.org",
      initials: "LS",
      photo: "assets/lawand.jpg",
      accent: "cool",
      bio: "Lawand Salah serves as Events Officer of Brunel Cyber Security Society. He is responsible for planning and organising the society's workshops, CTF nights, talks and networking events, including venue bookings and coordination with speakers and partners. He also manages event promotion, attendee communications and on-the-day logistics, and works with the committee to ensure events are run cost-effectively and continually improved through member feedback.",
      duties: []
    },
  ]

};
