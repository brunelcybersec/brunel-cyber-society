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
      date:  "30 aug 2026",
      title: "Nigeria Looks to Sovereign Cloud for Cyber, National Security",
      desc:  "Nigeria has taken concrete steps toward establishing sovereign data centers and cloud services by launching the Joint Technical Committee of the National Sovereign Cloud Initiative (JTC-NSCI), aimed at repatriating…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!Vq55!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0ca26ff5-7135-4952-a15a-076de021f4cd_1344x768.png",
      link:  "https://mohammedzuoriki.substack.com/p/nigeria-looks-to-sovereign-cloud"
    },
    {
      date:  "29 aug 2026",
      title: "Hundreds of OpenAI Agents Invaded Hugging Face Servers",
      desc:  "Two newly released postmortems reveal that OpenAI’s Hugging Face incident was far more severe than initially reported: rather than a single “rogue” model, around 700 AI agents coordinated like a botnet, using an…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!HOXd!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff664f0f3-be1a-4925-95aa-c868c873df07_1672x941.png",
      link:  "https://mohammedzuoriki.substack.com/p/hundreds-of-openai-agents-invaded"
    },
    {
      date:  "28 aug 2026",
      title: "The Vulnpocalypse Is Repricing the Bug Bounty Economy",
      desc:  "The “vulnpocalypse” a surge in vulnerability reports driven by widespread use of large language models (LLMs) is reshaping the bug bounty economy, with independent researchers who depend on mid-tier payouts…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!motx!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0e7fb05c-dcac-40d1-9249-e8edd4a8aa8f_6160x3071.jpeg",
      link:  "https://mohammedzuoriki.substack.com/p/the-vulnpocalypse-is-repricing-the"
    },
    {
      date:  "27 aug 2026",
      title: "Android Malware Hijacks Update System for Car Head Units",
      desc:  "Researchers have discovered the first documented case of Android malware specifically targeting car head units, marking a new frontier for botnet campaigns. Kaspersky identified the malware, dubbed JarService, in the…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!3LNs!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6cac3ead-406b-47be-839c-184284474141_1500x843.jpeg",
      link:  "https://mohammedzuoriki.substack.com/p/android-malware-hijacks-update-system"
    },
    {
      date:  "26 aug 2026",
      title: "Tricky 'SynkLoader' Multitool May Herald Ransomware",
      desc:  "A sophisticated new malware family called SynkLoader, discovered by Marcus Hutchins and colleagues at Expel, combines conventional and novel tactics to infiltrate corporate networks and may foreshadow more successful…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!Xx3h!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F04521223-6043-4942-8e19-13e0fe09fe81_790x463.jpeg",
      link:  "https://mohammedzuoriki.substack.com/p/tricky-synkloader-multitool-may-herald"
    },
    {
      date:  "25 aug 2026",
      title: "ToxicPanda Banking Trojan Matures Into Enterprise Threat",
      desc:  "ToxicPanda 2.0 is an advanced Android banking Trojan that has expanded from targeting 16 financial institutions to 349 banking, e-wallet, and cryptocurrency applications across 16 countries. The malware now uses 167…",
      tag:   "malware",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!8wuT!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fde60271a-5885-4a94-8f94-204f53d24569_1600x900.jpeg",
      link:  "https://mohammedzuoriki.substack.com/p/toxicpanda-banking-trojan-matures"
    },
    {
      date:  "24 aug 2026",
      title: "OWASP Flags Top AI Skill Risks in New Security Blueprint",
      desc:  "In early July, attackers exploited a look-alike Paperclip domain to distribute Trojanized Python packages and malicious AI “skills,” stealing credentials and sensitive data; unlike the packages, which automated…",
      tag:   "ai",
      tone:  "cool",
      image: "https://substackcdn.com/image/fetch/$s_!9qwj!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F656f4f32-0936-4ec6-a0d4-c1efe20c689e_2047x1152.png",
      link:  "https://mohammedzuoriki.substack.com/p/owasp-flags-top-ai-skill-risks-in"
    },
    {
      date:  "23 aug 2026",
      title: "What We Missed: Delta Flight Disrupted With Wi-Fi Hack",
      desc:  "The episode covers several cybersecurity stories: a passenger allegedly replaced the Wi‑Fi network on Delta Flight 591 with a fake “Delta WiFi Fast” network that reportedly displayed a phishing page, prompting a…",
      tag:   "news",
      tone:  "",
      image: "https://substackcdn.com/image/fetch/$s_!fhp3!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcbad688c-da34-4a26-b2f7-2eacfd86aa85_1536x1024.png",
      link:  "https://mohammedzuoriki.substack.com/p/what-we-missed-delta-flight-disrupted"
    },
    {
      date:  "22 aug 2026",
      title: "N-able Bug Exposes Password Vault Master Keys",
      desc:  "N-able’s Passportal password manager had a critical design flaw that let any website a user visited steal full, persistent access to their vault: its browser extension trusted all incoming postMessage requests…",
      tag:   "vuln",
      tone:  "warm",
      image: "https://substackcdn.com/image/fetch/$s_!C-YK!,w_848,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F09283bfb-07d9-4c4a-8f59-7a32e5826159_1200x628.jpeg",
      link:  "https://mohammedzuoriki.substack.com/p/n-able-bug-exposes-password-vault"
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
      bio: "Mohammed your Society President and I help keep everything running smoothly. He provides leadership, keeps the committee organised, acts as the main contact with the Union, and represents the society at events. He makes sure everyone is properly signed up as a member. He is the crazy digital security guy, so if anything needs sorting, he is always on it :) ",
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
      bio: "Abdirahman is taking on the Secretary role this year.He is here to keep things running smoothly behind the scenes, taking notes during meetings so nothing gets lost, sharing them with the Union so everyone's in the loop, and stepping in as a friendly point of contact whenever the Founder's not around. If you've ever got a question about what was discussed or decided, don't hesitate to reach out to him, that's exactly what he is here for.",
      duties: []
    },
    {
      name: "Kartik",
      role: "web officer",
      initials: "WO",
      photo: "assets/kartik.png",
      accent: "cool",
      bio: "Kartik is a second-year BSc Computer Science (Artificial Intelligence) student at Brunel and a Vice Chancellor's Scholar. He contributes to Brunel Talent Marketplace's open-source software engineering programme and is particularly interested in the intersection of AI and cybersecurity, enjoying building and shipping his own projects in his spare time. Outside of code, he's a Student Ambassador and has a background in theatre and congo drumming.",
      duties: []
    },
    {
      name: "Parmbir Singh Nandha",
      role: "treasurer / co-founder",
      initials: "PN",
      photo: "assets/Parm.JPG",
      accent: "warm",
      bio: "Parmbir is your Treasurer and one of the co-founders of the Cyber Security Society. He makes sure our money is where it's supposed to be, keeps an eye on the finances, chases sponsorships, and ensures our members are well supplied with pizza. If the budget goes missing... he'll investigate (after finishing his slice). :)",
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
