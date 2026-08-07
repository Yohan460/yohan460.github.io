#!/usr/bin/env node
// Bakes the rendered DOM into dist/index.html after `vite build`.
//
// Googlebot does execute JavaScript, but it does so in a second pass that can
// trail the initial crawl by days. Until then a crawler sees an empty <div
// id="root"> and roughly nothing to rank. This renders the app once with
// headless Chrome and writes the resulting markup into the shell, so the
// content is present on the very first fetch.
//
// React still boots normally and re-renders over it — the baked markup exists
// for crawlers, not for hydration, so no hydration contract is implied.
//
// Skips cleanly when Chrome is unavailable (e.g. a CI runner without it); the
// site still works, it just loses the SEO benefit.

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync, createReadStream, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const exec = promisify(execFile)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find(p => existsSync(p))

if (!CHROME) {
  console.log('· prerender skipped (no Chrome found) — shipping the SPA shell')
  process.exit(0)
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
  '.xml': 'application/xml', '.txt': 'text/plain',
}

// Assets are referenced with absolute paths, so file:// will not resolve them.
const server = createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0])
  let file = path.join(dist, url === '/' ? 'index.html' : url)
  if (!existsSync(file) || statSync(file).isDirectory()) file = path.join(dist, 'index.html')
  res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream')
  createReadStream(file).pipe(res)
})

await new Promise(r => server.listen(0, '127.0.0.1', r))
const port = server.address().port

try {
  const { stdout } = await exec(CHROME, [
    '--headless', '--disable-gpu', '--no-sandbox',
    '--virtual-time-budget=8000', '--run-all-compositor-stages-before-draw',
    '--dump-dom', `http://127.0.0.1:${port}/`,
  ], { maxBuffer: 32 * 1024 * 1024 })

  // Vite hoists the module script into <head>, so #root is the last element in
  // <body>. Slice structurally rather than pattern-matching a following tag.
  const OPEN = '<div id="root">'
  const start = stdout.indexOf(OPEN)
  const bodyEnd = stdout.lastIndexOf('</body>')
  if (start === -1 || bodyEnd === -1) throw new Error('could not locate #root in the DOM dump')

  let inner = stdout.slice(start + OPEN.length, bodyEnd).trimEnd()
  if (!inner.endsWith('</div>')) throw new Error('unexpected markup tail after #root')
  inner = inner.slice(0, -'</div>'.length)

  let markup = inner
    // Reveal animations start at opacity 0 and are switched on by an
    // IntersectionObserver. In baked markup that never runs, so strip the
    // classes and inline opacity — otherwise the crawler's copy is invisible.
    .replace(/ class="([^"]*)"/g, (full, cls) => {
      const kept = cls.split(/\s+/).filter(c => c !== 'reveal' && !/^reveal-delay/.test(c))
      return kept.length ? ` class="${kept.join(' ')}"` : ''
    })
    .replace(/opacity:\s*0;?/g, '')

  const shell = await readFile(path.join(dist, 'index.html'), 'utf8')
  const out = shell.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
  await writeFile(path.join(dist, 'index.html'), out)

  const text = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  console.log(`✓ prerendered — ${(out.length / 1024).toFixed(0)} KB shell, ${text.length} chars of crawlable text`)
} finally {
  server.close()
}
