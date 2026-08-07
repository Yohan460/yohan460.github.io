#!/usr/bin/env node
// Builds public/og.png — the 1200x630 card that iMessage, Slack, Discord,
// LinkedIn and X show when someone shares mcgwire.tech.
//
// These scrapers never run JavaScript, so the card cannot be the React app;
// it is rendered here from a standalone HTML file and shipped as a static PNG.
//
//   npm run og

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const exec = promisify(execFile)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find(p => existsSync(p))
if (!CHROME) { console.error('No Chrome/Chromium found.'); process.exit(1) }

const b64 = async (p, mime) =>
  `data:${mime};base64,${(await readFile(path.join(root, p))).toString('base64')}`

const syne = await b64('assets/fonts/Syne.ttf', 'font/truetype')
const inst = await b64('assets/fonts/InstrumentSans.ttf', 'font/truetype')
const face = await b64('public/headshot.jpg', 'image/jpeg')

const html = `<!doctype html><meta charset="utf-8"><style>
  @font-face{font-family:'Syne';src:url('${syne}') format('truetype');font-weight:400 800;font-display:block}
  @font-face{font-family:'Instrument Sans';src:url('${inst}') format('truetype');font-weight:400 700;font-display:block}
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;overflow:hidden;
       background:radial-gradient(ellipse 120% 80% at 30% 40%,#0b0d16 0%,#07080d 100%);
       font-family:'Instrument Sans',sans-serif;position:relative}
  .grid{position:absolute;inset:0;
        background-image:linear-gradient(rgba(91,141,245,.05) 1px,transparent 1px),
                         linear-gradient(90deg,rgba(91,141,245,.05) 1px,transparent 1px);
        background-size:60px 60px}
  .glow{position:absolute;width:760px;height:760px;border-radius:50%;top:-260px;right:-200px;
        background:radial-gradient(circle,rgba(91,141,245,.18) 0%,transparent 70%)}
  .wrap{position:relative;height:100%;display:flex;align-items:center;
        justify-content:space-between;padding:0 84px;gap:56px}
  .eyebrow{font-family:'Space Mono',monospace;font-size:17px;letter-spacing:.22em;
           text-transform:uppercase;color:#5b8df5;display:flex;align-items:center;gap:16px}
  .eyebrow::before{content:'';width:40px;height:1px;background:#5b8df5}
  .name{font-family:'Syne',sans-serif;font-weight:800;font-size:92px;line-height:.95;
        letter-spacing:-.03em;color:#fff;margin:26px 0 0}
  .name span{background:linear-gradient(135deg,#5b8df5,#a78bfa);-webkit-background-clip:text;
             -webkit-text-fill-color:transparent}
  .tag{font-size:25px;line-height:1.5;color:#a8aec8;margin-top:24px;max-width:610px}
  .tag b{color:#e8ecff;font-weight:600}
  .domain{font-family:'Space Mono',monospace;font-size:19px;letter-spacing:.14em;
          color:#8f96b3;margin-top:32px}
  .face{width:290px;height:290px;border-radius:50%;object-fit:cover;flex-shrink:0;
        border:4px solid #07080d;outline:3px solid rgba(91,141,245,.55)}
</style>
<div class="grid"></div><div class="glow"></div>
<div class="wrap">
  <div>
    <div class="eyebrow">Systems Engineer &amp; Developer</div>
    <div class="name">Johan<br><span>McGwire</span></div>
    <div class="tag">Senior staff engineer building <b>distributed systems and AI infrastructure</b> at Coinbase.</div>
    <div class="domain">mcgwire.tech</div>
  </div>
  <img class="face" src="${face}" alt="">
</div>`

await mkdir(path.join(root, 'resume/.build'), { recursive: true })
const tmp = path.join(root, 'resume/.build/og.html')
await writeFile(tmp, html)

const out = path.join(root, 'public/og.png')
await exec(CHROME, [
  '--headless', '--disable-gpu', '--no-sandbox',
  '--hide-scrollbars', '--default-background-color=00000000',
  '--run-all-compositor-stages-before-draw', '--virtual-time-budget=6000',
  '--window-size=1200,630', `--screenshot=${out}`, `file://${tmp}`,
])

const { size } = await import('node:fs').then(m => m.promises.stat(out))
console.log(`✓ public/og.png  —  1200x630, ${(size / 1024).toFixed(0)} KB`)
