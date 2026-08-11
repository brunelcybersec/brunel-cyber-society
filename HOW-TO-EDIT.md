# How to edit the website

A friendly guide for committee members. **You don't need to know how to code.**
Almost everything you'll want to change lives in **one file**: `js/data.js`.

---

## The 3 golden rules

1. **Most content is in `js/data.js`.** Open it in any text editor (Notepad works,
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

1. Put the image file in the **`assets`** folder.
2. In `js/data.js`, point to it with the **exact** file name.

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

In `js/data.js`, find the `committee:` list. Each person is one block like this:

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
- **Add a photo:** put the file in `assets`, then set `photo: "assets/their-file.jpg"`.
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

In `js/data.js`, find the `events:` list. Each event looks like:

```js
{
  when:  "05 Oct",
  where: "7:00pm",
  title: "Meet and Greet",
  desc:  "Come say hi and meet the committee.",
  tag:   "social",
  tone:  ""
}
```

- Events show on the **events page** (all of them) and the **homepage** (first 3).
- Keep them in date order, soonest first. Delete events once they've happened.
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
  reads the CyberTutor RSS feed, and rewrites the post list in `js/data.js`.
- Want it now? On GitHub open the **Actions** tab → **Sync blog from CyberTutor**
  → **Run workflow**.

**Refresh it from your own computer** (optional — needs Node 18+). In the project
folder run:

```
node tools/sync-cybertutor.mjs
```

> ⚠️ **Don't hand-edit the posts.** Everything between the `CYBERTUTOR:START` and
> `CYBERTUTOR:END` markers in `js/data.js` is overwritten on every sync. To change
> what a post says, edit it on Substack and re-sync. To show more or fewer posts,
> change `COUNT` near the top of `tools/sync-cybertutor.mjs` (currently 9).

---

## "Further reading" links (blog page)

In `js/data.js`, find `reads:`. These are the external links at the bottom of the
blog page. Each one:

```js
{ name: "The Hacker News", url: "https://thehackernews.com/", note: "Daily security news" }
```

Only list sources you actually recommend. Add/remove with the same pattern.

---

## "Learn with" platforms (resources page)

In `js/data.js`, find `learn:`. Each platform card:

```js
{ name: "TryHackMe", url: "https://tryhackme.com/", level: "beginner", note: "Guided rooms with VMs." }
```

`level` is just a label — use `"beginner"`, `"intermediate"`, `"advanced"`,
`"reference"`, or anything short.

---

## Contact details, social links and email

These are NOT in `data.js` — they're in the page files themselves, because they
appear in the footer of **every** page. To change one everywhere, you'll edit each
`.html` file (there are 8). Use your editor's "Find in all files" / "Replace in
Files" feature and search for the old value:

- **Discord invite:** search for `discord.gg/anmggPyVcs` and replace the link.
- **Instagram:** search for `instagram.com/cybersoc.brunel`.
- **Email:** search for `cybersec@brunel.ac.uk` and replace with the real address.
- **GitHub (footer icon):** search for `github.com/brunelcybersec` (no hyphen).
- **YouTube:** search for `youtube.com/@CyberTutor24` and replace with the real channel.

> ⚠️ Note: `resources.html` also links to four project repos —
> `ctf-writeups`, `brunel-ctf-platform`, `workshop-labs`, `brunel-site` —
> under `github.com/brunel-cybersec/...` (with a hyphen). Those repos don't
> exist yet under either spelling; the links are placeholders for projects
> the society hasn't created yet. Once one exists, update its link to the
> real org, `github.com/brunelcybersec` (no hyphen) — same as the footer.

The main contact page layout (the big cards) is in `contact.html`.

> If editing 8 files sounds painful, ask the developer to centralise these into
> `data.js` too — it's a quick change.

---

## Previewing your changes

- The simple way: double-click `index.html` to open it in your browser.
- The nicer way: in VS Code, install the **Live Server** extension, then
  right-click `index.html` → **Open with Live Server**. The page reloads
  automatically every time you save.

---

## If something breaks

If a page goes blank or stops updating after you edit `js/data.js`, you probably
deleted a quote, comma, or bracket by accident.

1. Open the page in your browser.
2. Press `F12` to open developer tools and click the **Console** tab.
3. A red error message usually points at the line number in `data.js`.
4. Check that line for a missing `"`, `,`, `{`, `}`, `[` or `]`.

When in doubt, undo your change (`Ctrl` + `Z`) until the page works again, then
re-do it more carefully. Good luck! 🛡️
