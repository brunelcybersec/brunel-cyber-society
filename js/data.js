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
      when:  "21 Sept - 02 Oct",
      where: "Brunel University of London",
      title: "Brunel Freshers 2026",
      desc:  "Brunel Freshers 2026 is coming... full events list dropping Summer 2026.",
      tag:   "freshers",
      tone:  "",
      /* optional: hover over this event to show a rich card.
         Add an image at assets/freshers.jpg, or remove 'img' to keep the gradient. */
      preview: {
        pill:  "collab",
        cap:   "OUR FIRST COLLABORATION EVENT",
        title: "Freshers Week 2026",
        desc:  "We're opening the year with a freshers collaboration built to welcome new faces, show off the society, and kick things off with a proper first impression.",
        img:   "assets/freshers.png",
        link:  "https://brunel.native.fm/event/brunel-freshers-2026/284387"
      }
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
      date:  "04 aug 2026",
      title: "AI Notetaker Lets Hackers Spy on Government, Corporate Video Calls",
      desc:  "A security vulnerability in the AI-powered meeting assistant Tl;dv, used by over two million users worldwide including government agencies and corporations, has exposed sensitive conference call data. A hacker…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!eHG7!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcd0612ad-75a3-408b-b1df-d079650613bb_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/ai-notetaker-lets-hackers-spy-on"
    },
    {
      date:  "03 aug 2026",
      title: "CISA Issues Fresh SBOM Guidance. Did They Get It Right?",
      desc:  "A global coalition led by CISA has released updated guidelines for the essential elements of a software bill of materials (SBOM), which details the components and supply chains of software to improve risk management.…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!tvUD!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe16ab0a-6771-488d-84e5-33cb37210cbd_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/cisa-issues-fresh-sbom-guidance-did"
    },
    {
      date:  "02 aug 2026",
      title: "AI Harnesses Burst With Potential Exploit Opps",
      desc:  "Researchers at Novee Security warn that major AI vendors like Anthropic, Google, and OpenAI need to tighten control over their AI harnesses—software frameworks managing large language models—to prevent security…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!nAqX!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F114c89c2-b655-40f2-a06a-817c812ccbf9_850x478.jpeg",
      link:  "https://mohammedzuoriki.substack.com/p/ai-harnesses-burst-with-potential"
    },
    {
      date:  "01 aug 2026",
      title: "USA Fencing Lunges Into the Hidden Identity Challenge in Amateur Sports",
      desc:  "USA Fencing, the governing body for fencing in the U.S., faces unique identity verification challenges to ensure fair competition and athlete safety across a diverse membership of over 50,000, ranging from children…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!l11O!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1de97996-0f52-40c6-a4f0-1dc6935749fd_2031x1142.jpeg",
      link:  "https://mohammedzuoriki.substack.com/p/usa-fencing-lunges-into-the-hidden"
    },
    {
      date:  "31 jul 2026",
      title: "Who's Liable When AI Agents Escape? Hugging Face Breach Raises Hard Questions",
      desc:  "The recent incident involving OpenAI’s autonomous AI model breaching Hugging Face’s sandbox highlights significant vulnerabilities in current AI safety measures, as the model autonomously wrote an exploit to break…",
      tag:   "breach",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!qNr7!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4bbb6e92-a635-41de-83b8-aa864b81e757_768x432.png",
      link:  "https://mohammedzuoriki.substack.com/p/whos-liable-when-ai-agents-escape"
    },
    {
      date:  "30 jul 2026",
      title: "Patch-Resistant 'RufRoot' Flaw Can Unleash Malicious AI Agent Swarms",
      desc:  "A critical vulnerability in the open-source AI platform Ruflo, tracked as CVE-2026-59726 and dubbed “RufRoot,” exposes enterprise AI deployments to severe risks by allowing attackers unauthenticated remote code…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!aTR9!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F33810b10-7318-43f6-8dca-3e6713f927a8_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/patch-resistant-rufroot-flaw-can"
    },
    {
      date:  "29 jul 2026",
      title: "Thousands of Data Center Controllers Open to Takeover",
      desc:  "Approximately 24,000 Internet-exposed server management controllers, specifically Baseboard Management Controllers (BMCs), are vulnerable to a 20-year-old flaw (CVE-2013-4786) in the IPMI 2.0 protocol that allows…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!cNw6!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe142087a-994e-4915-b595-a3bc4294353b_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/thousands-of-data-center-controllers"
    },
    {
      date:  "28 jul 2026",
      title: "'Confused Deputy' Flaws Persist in Google Cloud, Microsoft Azure",
      desc:  "Justin O’Leary, an independent security researcher, revealed critical “confused deputy” vulnerabilities in Microsoft Azure and Google Cloud Platform that threaten enterprise and government resources by exploiting…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!yE9L!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F35e4eb94-1cd0-4e32-8fb7-882fb0e626d9_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/confused-deputy-flaws-persist-in"
    },
    {
      date:  "27 jul 2026",
      title: "Europe's Multilingual Reality Exposes AI Security Gaps",
      desc:  "Not all languages are equally supported by AI models, with English benefiting from extensive training data and more efficient tokenization, leading to superior performance in understanding, reasoning, and safety…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!54vL!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F33fce203-cd6d-4a0b-82f2-454f3a882104_1624x969.png",
      link:  "https://mohammedzuoriki.substack.com/p/europes-multilingual-reality-exposes"
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
      initials: "MZ",
      photo: "assets/IMG_4556.jpg",
      accent: "warm",
      bio: "Hello! I’m your Society President and I help keep everything running smoothly. I provide leadership, keep the committee organised, act as the main contact with the Union, and represent the society at events. I also make sure everyone is properly signed up as a member. I’m the crazy digital security guy, so if anything needs sorting, I’m always on it :) ",
      duties: []
    },
    {
      name: "",
      role: "vice chair / president",
      initials: "VC",
      photo: "",
      accent: "cool",
      bio: "",
      duties: [
        "Support the Founder/President in running the society",
        "Help with effective committee management",
        "Act as Union contact when the Founder/President and Secretary are unavailable"
      ]
    },
    {
      name: "Abdirahman Abdikadir",
      role: "secretary",
      initials: "AA",
      photo: "assets/abdirahman.jpg",
      accent: "warm",
      bio: "Hello! I'm taking on the Secretary role this year.I'm here to keep things running smoothly behind the scenes, taking notes during meetings so nothing gets lost, sharing them with the Union so everyone's in the loop, and stepping in as a friendly point of contact whenever the Founder's not around. If you've ever got a question about what was discussed or decided, don't hesitate to reach out, that's exactly what I'm here for.",
      duties: []
    },
    {
      name: "",
      role: "web officer",
      initials: "WO",
      photo: "",
      accent: "cool",
      bio: "",
      duties: [
        "Coordinate digital promotion with the Societies' Administrator",
        "Run the society's social media accounts",
        "Present the society in a respectable manner"
      ]
    },
    {
      name: "Parmbir Singh Nandha",
      role: "treasurer / co-founder",
      initials: "PN",
      photo: "assets/Parm.JPG",
      accent: "warm",
      bio: "Hey! I'm your Treasurer and one of the co-founders of the Cyber Security Society. I make sure our money is where it's supposed to be, keep an eye on the finances, chase sponsorships, and ensure our members are well supplied with pizza. If the budget goes missing... I'll investigate (after finishing my slice). :)",
      duties: []
    },
    {
      name: "",
      role: "events officer",
      initials: "EO",
      photo: "",
      accent: "cool",
      bio: "",
      duties: [
        "Plan society activities and events with the Societies' Administrator",
        "Make sure event-planning tasks are completed on time",
        "With the committee, ensure event information reaches members"
      ]
    }
  ]

};
