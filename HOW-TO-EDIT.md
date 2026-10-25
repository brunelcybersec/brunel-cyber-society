# How to edit the website

A friendly guide for committee members. **You don't need to know how to code.**
Almost everything you'll want to change lives in **one file**: `frontend/js/data.js`.

---

## The 3 golden rules

1. **Most content is in `frontend/js/data.js`.** Open it in any text editor (Notepad works,
   but VS Code is nicer). Change the words between the `"quotes"`.
2. **Keep the punctuation.** Every line needs its `"quotes"` and the `,` comma at
   the end. Don't delete a `{`, `}`, `[` or `]`. If something looks like
   `name: "Parmbir",` just change `Parmbir`, leave the rest alone.
3. **Save, then refresh the page** in your browser (press `Ctrl` + `F5` to be sure
   you see the new version).

> ⚠️ Don't use straight double quotes `"` *inside* your text. Use an apostrophe `'`
> instead. For example write `it's great` not `it"s great`. This keeps the page
> from breaking.

---

## Pictures (read this once — it saves a lot of confusion)

To add or change a photo:

1. Put the image file in the **`frontend/assets`** folder.
2. In `frontend/js/data.js`, point to it with the **exact** file name.

**The file name must match exactly, including capital letters.**
`Photo.JPG` is NOT the same as `photo.jpg`. This is the #1 reason a picture
"doesn't show up".

Tips:
- Easiest path: rename your image to something simple and lowercase like
  `assets/parmbir.jpg`, then write `photo: "assets/parmbir.jpg"` in data.js.
- If a photo doesn't appear, it's almost always a name mismatch — check the
  spelling, the `.jpg` vs `.png`, and the capital letters.
- No photo yet? Leave `photo: ""`. The card shows the person's initials instead,
  which looks fine.

---

## Committee members

In `frontend/js/data.js`, find the `committee:` list. Each person is one block like this:

```js
{
  name: "Parmbir Singh Nandha",
  role: "treasurer / co-founder",
  initials: "PN",
  photo: "assets/Parm.JPG",
  accent: "warm",
  bio: "Hey! I'm your Treasurer...",
  duties: [
    "Keep track of society funds",
    "Hand in petty cash on time"
  ]
}
```

- **Change someone's details:** edit the text in the quotes.
- **Add a photo:** put the file in `frontend/assets`, then set `photo: "assets/their-file.jpg"`.
- **No photo:** set `photo: ""` (shows their `initials` instead).
- **Add a bio:** put a sentence in `bio: "..."`. Leave `bio: ""` to hide it.
- **Duties:** each line is `"a duty",` inside the `duties: [ ]` brackets.
  No duties? Use `duties: []`.
- **`accent`:** just `"warm"` or `"cool"` — it only changes the card's tint.
  Keep them alternating (warm, cool, warm, cool…) so the grid looks tidy.

**Add a new member:** copy one whole `{ ... }` block (including its `,`),
paste it where you want them to appear, and change the details.

**Remove a member:** delete their whole `{ ... }` block, including the comma.

**Empty seat to advertise:** set `name: ""` — the card shows
"Your name here" with the role still listed.

---

## Events

In `frontend/js/data.js`, find the `events:` list. Each event looks like:

```js
{
  when:  "05 Oct",
  where: "7:00pm",
  title: "Meet and Greet",
  desc:  "Come say hi and meet the committee.",
  tag:   "social",
  tone:  "",
  date:  "2026-10-05"
}
```

- Events show on the **events page**, split automatically into
  **Upcoming events** and **Past events**, and on the **homepage**
  (the next 3 upcoming ones).
- `date` must be `"YYYY-MM-DD"` and is what the site uses to work out
  whether an event is upcoming or past, so it can't go stale. `when`/`where`
  are just the text shown on the page, so they can say whatever reads
  best (e.g. "28 Oct").
- Keep them in date order, soonest first.
- `tone` sets the little tag colour: `"cool"`, `"warm"`, or `""` for grey.

**Optional hover card:** an event can show a rich pop-up card when you hover it.
Add a `preview` block (note the comma after `tone: ""`):

```js
  tone: "",
  preview: {
    pill:  "social",
    cap:   "FIRST SOCIAL OF THE YEAR",
    title: "Meet and Greet",
    desc:  "A longer description shown in the pop-up.",
    img:   "assets/meetandgreet.jpg",   // or remove this line for a plain gradient
    link:  "#"                           // where 'Read more' goes
  }
```

---

## Blog posts (CyberTutor) — automatic

The blog page mirrors the **CyberTutor Substack** for you, so you don't add posts
by hand. New posts appear on the site within a day of going up on Substack. The
newest post becomes the big featured card; the rest form the grid below it.

**How it stays up to date**

- A scheduled GitHub Action (`.github/workflows/update-blog.yml`) runs once a day,
  reads the CyberTutor RSS feed, and rewrites the post list in `frontend/js/data.js`.
- Want it now? On GitHub open the **Actions** tab → **Sync blog from CyberTutor**
  → **Run workflow**.

**Refresh it from your own computer** (optional — needs Node 18+). In the project
folder run:

```
node backend/tools/sync-cybertutor.mjs
```

> ⚠️ **Don't hand-edit the posts.** Everything between the `CYBERTUTOR:START` and
> `CYBERTUTOR:END` markers in `frontend/js/data.js` is overwritten on every sync. To change
> what a post says, edit it on Substack and re-sync. To show more or fewer posts,
> change `COUNT` near the top of `backend/tools/sync-cybertutor.mjs` (currently 9).

---

## "Further reading" links (blog page)

In `frontend/js/data.js`, find `reads:`. These are the external links at the bottom of the
blog page. Each one:

```js
{ name: "The Hacker News", url: "https://thehackernews.com/", note: "Daily security news" }
```

Only list sources you actually recommend. Add/remove with the same pattern.

---

## "Learn with" platforms (resources page)

In `frontend/js/data.js`, find `learn:`. Each platform card:

```js
{ name: "TryHackMe", url: "https://tryhackme.com/", level: "beginner", note: "Guided rooms with VMs." }
```

`level` is just a label — use `"beginner"`, `"intermediate"`, `"advanced"`,
`"reference"`, or anything short.

---

## Contact details, social links and email

These are NOT in `data.js` — they're in the page files themselves, because they
appear in the footer of **every** page. To change one everywhere, you'll edit each
`.html` file in the `frontend` folder. Use your editor's "Find in all files" / "Replace in
Files" feature and search for the old value:

- **Discord invite:** search for `discord.gg/anmggPyVcs` and replace the link.
- **Instagram:** search for `instagram.com/cybersoc.brunel`.
- **Email:** search for `contact@brunelcs.org` and replace with the real address.
- **GitHub (footer icon):** search for `github.com/brunelcybersec` (no hyphen).
- **YouTube:** search for `youtube.com/@CyberTutor24` and replace with the real channel.

> ⚠️ Note: `frontend/resources.html` also links to four project repos —
> `ctf-writeups`, `brunel-ctf-platform`, `workshop-labs`, `brunel-site` —
> under `github.com/brunel-cybersec/...` (with a hyphen). Those repos don't
> exist yet under either spelling; the links are placeholders for projects
> the society hasn't created yet. Once one exists, update its link to the
> real org, `github.com/brunelcybersec` (no hyphen) — same as the footer.

The main contact page layout (the big cards) is in `frontend/contact.html`.

> If editing every page sounds painful, ask the developer to centralise these into
> `data.js` too — it's a quick change.

---

## Phishing alert (pop-up + banner)

While the phishing campaign is active, the homepage shows a pop-up once per visit
and every page (except Stay safe) shows a small banner at the bottom. Visitors can
close the banner with its **✕**.

**To switch both off** when the campaign is over: open `frontend/js/site.js`, find
`const PHISHING_ALERT = true;` and change `true` to `false`.

The wording lives in the same file, just below that line.

Separately, clicking any link that leaves the site shows a short
"leaving brunelcs.org" check with the real address. That one stays on.

---

## Previewing your changes

- The simple way: double-click `frontend/index.html` to open it in your browser.
- The nicer way: in VS Code, install the **Live Server** extension, then
  right-click `frontend/index.html` → **Open with Live Server**. The page reloads
  automatically every time you save.

---

## If something breaks

If a page goes blank or stops updating after you edit `frontend/js/data.js`, you probably
deleted a quote, comma, or bracket by accident.

1. Open the page in your browser.
2. Press `F12` to open developer tools and click the **Console** tab.
3. A red error message usually points at the line number in `data.js`.
4. Check that line for a missing `"`, `,`, `{`, `}`, `[` or `]`.

When in doubt, undo your change (`Ctrl` + `Z`) until the page works again, then
re-do it more carefully.

---

## Publishing

You don't need to do anything special. Once a change is merged into `main`,
the **Deploy site to GitHub Pages** action publishes the `frontend` folder to
[brunelcs.org](https://brunelcs.org) within a minute or two. You can watch it in
the **Actions** tab. Good luck! 🛡️
