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
      date:  "21 sep 2026",
      title: "The Vulnerability Gap: Why Discovery Is Outrunning Repair",
      desc:  "Advanced AI models have collapsed the timeline for discovering serious vulnerabilities in widely used open source software from weeks or months to hours, but this speed-up has exposed a structural bottleneck:…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!UZAT!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5a754b38-44eb-4665-bc50-6b57955cdca9_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/the-vulnerability-gap-why-discovery"
    },
    {
      date:  "20 sep 2026",
      title: "China's FamousSparrow APT Spies on US Politics in Latin America",
      desc:  "The Chinese cyber-espionage group “FamousSparrow” has shifted its focus since mid‑2025 to infiltrate government agencies and key industries across Central and South America using a newly built, modular C++ backdoor…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!fmH2!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9809886c-d82e-4444-a5b3-bb616bbca3c6_1986x1114.png",
      link:  "https://mohammedzuoriki.substack.com/p/chinas-famoussparrow-apt-spies-on"
    },
    {
      date:  "19 sep 2026",
      title: "AI Agent Breaches Spanish Organization, Modifies Personal Data",
      desc:  "A Spanish organization suffered a personal-data breach after a human-controlled agentic AI system discovered exposed credentials and exploited a vulnerability in an enterprise application. According to Spain’s…",
      tag:   "breach",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!qiil!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff5801f74-563b-4c4f-bbea-7e98ea56c210_1666x1118.png",
      link:  "https://mohammedzuoriki.substack.com/p/ai-agent-breaches-spanish-organization"
    },
    {
      date:  "18 sep 2026",
      title: "CISA Ditches Weekly Vulnerability Roundups for Risk-Based Focus",
      desc:  "The US Cybersecurity and Infrastructure Security Agency (CISA) will stop publishing its weekly vulnerability bulletins on 28 September, arguing that the surge in disclosures—driven in part by AI-assisted flaw hunting…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!us-T!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa96035d2-0c29-4d4f-ba84-a3fbedce9b46_1984x1116.png",
      link:  "https://mohammedzuoriki.substack.com/p/cisa-ditches-weekly-vulnerability"
    },
    {
      date:  "17 sep 2026",
      title: "Cyber Op Targets South Korean Media & Automotive Sectors",
      desc:  "North Korean–linked APT37 (aka InkySquid/ScarCruft/Ricochet Chollima) is assessed with medium confidence to have conducted stealthy, long‑running espionage operations against South Korean media and automotive firms…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!ME8i!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3d3c9874-4f1e-41e5-bda7-c6e82ac40521_828x462.jpeg",
      link:  "https://mohammedzuoriki.substack.com/p/cyber-op-targets-south-korean-media"
    },
    {
      date:  "16 sep 2026",
      title: "Microsoft Issues Emergency Fixes After Massive Patch Tuesday",
      desc:  "Microsoft issued emergency out-of-band patches on Monday to fix critical problems introduced by September’s record-breaking Patch Tuesday, which addressed 974 CVEs and highlighted how AI-driven vulnerability…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!gzes!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97de33d4-0ab0-42ab-a535-e69322d78dfb_1974x1110.png",
      link:  "https://mohammedzuoriki.substack.com/p/microsoft-issues-emergency-fixes"
    },
    {
      date:  "15 sep 2026",
      title: "'Sandworm' Chains Cisco Vulnerabilities to Deploy Cyclops Blink",
      desc:  "A likely Russia-linked threat actor, possibly associated with the GRU-linked Sandworm group, is exploiting two Cisco Secure Firewall Management Center vulnerabilities—CVE-2026-20079, a critical authentication-bypass…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!v2st!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F32af7c76-ceaf-4cd1-99f2-a7a103c262ca_1984x1116.png",
      link:  "https://mohammedzuoriki.substack.com/p/sandworm-chains-cisco-vulnerabilities"
    },
    {
      date:  "14 sep 2026",
      title: "Voice Callers Exploit BYOD to Reach Microsoft 365, Corporate Data",
      desc:  "Initial access brokers (IABs) such as Microsoft-tracked Storm-3032 and Storm-3121 are bypassing corporate defenses by targeting employees’ personal devices—typically via vishing (voice phishing) or smishing (SMS…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!Wq_c!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F57153d02-8f9a-41ca-8a8d-7fc8dca3db6b_1980x1110.png",
      link:  "https://mohammedzuoriki.substack.com/p/voice-callers-exploit-byod-to-reach"
    },
    {
      date:  "13 sep 2026",
      title: "Threat Actor Generates 1M Personalized Fraud Emails in 3 Days",
      desc:  "AI is making phishing attacks far more scalable and convincing, as demonstrated by a campaign that sent over one million personalised emails in three days, targeting accounts-payable departments with realistic…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!Kye4!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbb1ceb40-c7e2-4dcc-8453-c4920e648870_1968x1108.png",
      link:  "https://mohammedzuoriki.substack.com/p/threat-actor-generates-1m-personalized"
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
      bio: "Mohammed is the Founder and President of the Cyber Security Society. He leads the committee, keeps everything running smoothly, acts as the main contact with the Union, and represents the society at events. He also makes sure members are properly signed up and is always on hand when anything needs sorting :)",
      duties: []
    },
    {
      name: "Alex Javadi",
      role: "vice chair / president",
      email: "a.javadi@brunelcs.org",
      initials: "AJ",
      photo: "assets/alex.png",
      accent: "cool",
      bio: "",
      duties: [
       "Alex is taking on the Vice President role this year. He is here to support the Founder and President in running the society, helping keep committee matters on track and running effectively behind the scenes. When the Founder and President and Secretary aren't available, he steps in as the Union's point of contact, so there's always someone to turn to. If you've ever got a question or need a hand, don't hesitate to reach out, that's exactly what he is here for."
      ]
    },
    {
      name: "Abdirahman Abdikadir",
      role: "secretary",
      email: "a.abdikadir@brunelcs.org",
      initials: "AA",
      photo: "assets/abdirahman.jpg",
      accent: "warm",
      bio: "Abdirahman is taking on the Secretary role this year.He is here to keep things running smoothly behind the scenes, taking notes during meetings so nothing gets lost, sharing them with the Union so everyone's in the loop, and stepping in as a friendly point of contact whenever the Founder's not around. If you've ever got a question about what was discussed or decided, don't hesitate to reach out to him, that's exactly what he is here for.",
      duties: []
    },
    {
      name: "Parmbir Singh Nandha",
      role: "treasurer / co-founder",
      email: "p.singh@brunelcs.org",
      initials: "PN",
      photo: "assets/Parm.JPG",
      accent: "warm",
      bio: "Parmbir is your Treasurer and one of the co-founders of the Cyber Security Society. He makes sure our money is where it's supposed to be, keeps an eye on the finances, chases sponsorships, and ensures our members are well supplied with pizza. If the budget goes missing... he'll investigate (after finishing his slice). :)",
      duties: []
    },
    {
      name: "Kartik",
      role: "web officer",
      email: "k.kartik@brunelcs.org",
      initials: "WO",
      photo: "assets/kartik.png",
      accent: "cool",
      bio: "Kartik is a second-year BSc Computer Science (Artificial Intelligence) student at Brunel and a Vice Chancellor's Scholar. He contributes to Brunel Talent Marketplace's open-source software engineering programme and is particularly interested in the intersection of AI and cybersecurity, enjoying building and shipping his own projects in his spare time. Outside of code, he's a Student Ambassador and has a background in theatre and congo drumming.",
      duties: []
    },
  ]

};
