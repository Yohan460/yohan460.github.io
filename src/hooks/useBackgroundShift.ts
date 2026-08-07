import { useEffect, useRef } from 'react'
import { subscribeToScroll } from './useScrollListeners'

type RGB = [number, number, number]

const BG_KEYFRAMES: Array<{ selector: string; color: RGB }> = [
  { selector: '.hero',                      color: [7,   8,  13] },
  { selector: '[data-employer="coinbase"]', color: [4,  28,  95] },
  { selector: '[data-employer="leidos"]',   color: [3,  16,  70] },
  { selector: '[data-employer="denison"]',  color: [80,   6,  16] },
  { selector: '[data-employer="battelle"]', color: [3,  35,  62] },
  { selector: '.oss-section',               color: [7,   8,  13] },
  { selector: '.edu-section',               color: [40,   4,   8] },
  { selector: 'footer',                     color: [7,   8,  13] },
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function getScrollTop(el: Element): number {
  let top = 0
  let node: Element | null = el
  while (node instanceof HTMLElement) {
    top += node.offsetTop
    node = node.offsetParent as Element | null
  }
  return top
}

export function useBackgroundShift() {
  const ticking = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    function updateBg() {
      const viewMid = window.scrollY + window.innerHeight * 0.5

      const points = BG_KEYFRAMES
        .map(k => {
          const el = document.querySelector(k.selector)
          return el ? { pos: getScrollTop(el), color: k.color } : null
        })
        .filter((p): p is { pos: number; color: RGB } => p !== null)
        .sort((a, b) => a.pos - b.pos)

      if (points.length === 0) return

      let c0 = points[0]
      let c1 = points[0]

      for (let i = 0; i < points.length - 1; i++) {
        if (viewMid >= points[i].pos && viewMid < points[i + 1].pos) {
          c0 = points[i]; c1 = points[i + 1]; break
        }
        if (i === points.length - 2 && viewMid >= points[i + 1].pos) {
          c0 = points[i + 1]; c1 = points[i + 1]
        }
      }

      const span = c1.pos - c0.pos
      const t = span > 0 ? Math.max(0, Math.min(1, (viewMid - c0.pos) / span)) : 0

      const r = Math.round(lerp(c0.color[0], c1.color[0], t))
      const g = Math.round(lerp(c0.color[1], c1.color[1], t))
      const b = Math.round(lerp(c0.color[2], c1.color[2], t))

      const cr = Math.min(255, r + 14)
      const cg = Math.min(255, g + 10)
      const cb = Math.min(255, b + 8)

      document.body.style.background =
        `radial-gradient(ellipse 140% 90% at 50% 35%, rgb(${cr},${cg},${cb}) 0%, rgb(${r},${g},${b}) 100%)`
    }

    const unsub = subscribeToScroll(() => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(() => { updateBg(); ticking.current = false })
      }
    })

    window.addEventListener('resize', updateBg)
    updateBg()

    return () => {
      unsub()
      window.removeEventListener('resize', updateBg)
    }
  }, [])
}
