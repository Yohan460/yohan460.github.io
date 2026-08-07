#!/usr/bin/env node
// Builds public/Johan_McGwire.pdf from src/data/experience.ts — the same data
// the website's Experience section renders — so the two cannot drift apart.
//
// Pipeline: esbuild transpiles the TS data module, the template renders it to
// HTML with the fonts inlined as base64 (keeps the build hermetic and
// guarantees Chrome embeds them), then headless Chrome prints to PDF.
//
//   npm run resume            build the PDF
//   npm run resume -- --png   also write PNG previews for review

import { build } from 'esbuild'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'

const exec = promisify(execFile)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Two variants: the portfolio copy carries a headshot, the ATS copy omits it.
// US recruiting policies commonly require discarding photo-bearing resumes, so
// the plain build is the one to upload to an applicant tracking system.
const VARIANTS = [
  { file: 'Johan_McGwire.pdf',     photo: true,  label: 'portfolio (with photo)' },
  { file: 'Johan_McGwire_ATS.pdf', photo: false, label: 'ATS (no photo)' },
]

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find(p => existsSync(p))

if (!CHROME) {
  console.error('No Chrome/Chromium found — needed to print the PDF.')
  process.exit(1)
}

// esbuild the TS data module so plain Node can import it.
const tmp = path.join(os.tmpdir(), `resume-data-${Date.now()}.mjs`)
await build({
  entryPoints: [path.join(root, 'src/data/experience.ts')],
  outfile: tmp,
  format: 'esm',
  bundle: true,
  platform: 'node',
  logLevel: 'error',
})
const data = await import(`file://${tmp}`)
await rm(tmp, { force: true })

const dataUri = async f =>
  `data:font/truetype;base64,${(await readFile(path.join(root, 'assets/fonts', f))).toString('base64')}`

const { renderResume } = await import(`file://${path.join(root, 'resume/template.mjs')}`)
const instrument = await dataUri('InstrumentSans.ttf')
const headshot = `data:image/jpeg;base64,${(await readFile(path.join(root, 'public/headshot.jpg'))).toString('base64')}`

await mkdir(path.join(root, 'resume/.build'), { recursive: true })

const chromeFlags = [
  '--headless', '--disable-gpu', '--no-sandbox',
  '--no-pdf-header-footer', '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=6000',
]

let htmlPath
for (const v of VARIANTS) {
  const out = path.join(root, 'public', v.file)
  const html = renderResume({
    EMPLOYERS: data.EMPLOYERS,
    UA_COACHING_ROLES: data.UA_COACHING_ROLES,
    fonts: { instrument },
    headshot: v.photo ? headshot : null,
  })
  htmlPath = path.join(root, `resume/.build/${v.file.replace('.pdf', '.html')}`)
  await writeFile(htmlPath, html)
  await exec(CHROME, [...chromeFlags, `--print-to-pdf=${out}`, `file://${htmlPath}`])

  // Chrome stamps its user-agent into /Creator; swap it for a real author.
  // Space-padded to the original byte length so xref offsets stay valid.
  const buf = await readFile(out)
  const raw = buf.toString('latin1')
  const m = raw.match(/\/Creator \((?:[^()\\]|\\.)*\)/)
  if (m) {
    const want = '/Author (Johan McGwire)\n/Creator (Johan McGwire)'
    if (want.length <= m[0].length) {
      await writeFile(out, Buffer.from(
        raw.replace(m[0], want + ' '.repeat(m[0].length - want.length)), 'latin1'))
    }
  }

  const pdf = await readFile(out)
  const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length
  console.log(`✓ public/${v.file}  —  ${pages} page${pages === 1 ? '' : 's'}, ${(pdf.length / 1024).toFixed(0)} KB  — ${v.label}`)
  if (pages > 1) console.log('  ⚠ spilled past one page')
}

if (process.argv.includes('--png')) {
  const png = path.join(root, 'resume/.build/preview.png')
  await exec(CHROME, [...chromeFlags, '--window-size=1100,1424',
    `--screenshot=${png}`, `file://${htmlPath}`])
  console.log(`✓ ${path.relative(root, png)}`)
}
