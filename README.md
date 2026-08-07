# mcgwire.tech

You've found the source code for my portfolio. This means one of a few things:

1. You're a recruiter doing unusually thorough diligence. Hello. I appreciate the effort.
2. You want to know how the year counter works. Fair. Keep reading.
3. You clicked the wrong link and are now committed to seeing this through.

Whatever brought you here — **the site itself is at [mcgwire.tech](https://mcgwire.tech)**, and it's a
considerably better experience than reading my CSS.

---

## What this is

I'm Johan. I'm a Senior Staff SRE at Coinbase, where I build production systems in Go and TypeScript,
run a lot of Temporal workflows, and have recently been putting agents to work on problems that used to
require a human and a very long spreadsheet.

This repo is the portfolio that describes all of that in nicer typography.

## Things that are true about this site

**The years scroll by as you read.** This is deliberate. A fixed marker counts backwards from 2026 to
2014 as you move through my work history, and each role is paced to its actual duration — so six years
at Coinbase genuinely takes longer to scroll than five months at Leidos. Time is chronically
under-represented on résumés.

**Ohio State and rowing coaching show up alongside the jobs they overlapped with.** Because that's how
they happened. A concurrent panel slides in on the right as the years reach each one.

**The résumé is generated, not written.** `npm run resume` reads the same data the site renders,
lays it out in HTML, and prints it to PDF with headless Chrome. A robot typesets my career, which
feels appropriate. It also means my job titles can't disagree between the site and the PDF — a
problem I only discovered because they already had.

**A Bootstrap 3 site used to live here.** It has been dealt with. The commit that replaced it removed
22,667 lines, most of them jQuery plugins I hadn't thought about since roughly 2015.

## Running it

```bash
npm install
npm run dev        # localhost:5173
npm run build      # production build to dist/
npm run resume     # rebuild the résumé PDF
```

Deploys happen on push to `master` via GitHub Actions, which builds the site and ships it to GitHub
Pages. No manual steps, which is the whole point.

## Stack

Vite · React 18 · TypeScript, with no UI framework and no state library — it's a portfolio, not a
trading platform. Animation is hand-rolled around a single shared scroll listener and a few
IntersectionObservers, because forty components each attaching their own `scroll` handler is how you
turn a nice page into a slideshow.

`prefers-reduced-motion` is respected throughout. If motion isn't your thing, the site will simply
hold still and tell you the same information.

---

Say hello: **[johan@mcgwire.tech](mailto:johan@mcgwire.tech)** · [github.com/Yohan460](https://github.com/Yohan460)
