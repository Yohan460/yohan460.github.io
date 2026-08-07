import { useState, useEffect, useRef } from 'react'
import { subscribeToScroll } from './useScrollListeners'

const YEAR_ZONES = [
  { selector: '[data-employer="coinbase"]', startYear: 2026, endYear: 2020 },
  { selector: '[data-employer="leidos"]',   startYear: 2020, endYear: 2020 },
  { selector: '[data-employer="denison"]',  startYear: 2020, endYear: 2019 },
  { selector: '[data-employer="battelle"]', startYear: 2019, endYear: 2016 },
  { selector: '[data-employer="osu"]',      startYear: 2016, endYear: 2014 },
]

function getScrollTop(el: Element): number {
  let top = 0
  let node: Element | null = el
  while (node instanceof HTMLElement) {
    top += node.offsetTop
    node = node.offsetParent as Element | null
  }
  return top
}

const YEAR_START = 2026
const YEAR_END = 2014

export function useYearCounter() {
  const [state, setState] = useState<{ year: number; visible: boolean; progress: number }>({
    year: 2026, visible: false, progress: 0,
  })
  // yearFloat: continuous (un-rounded) year value, updated without re-render
  const yearFloatRef = useRef(2026)
  const ticking = useRef(false)

  useEffect(() => {
    function update() {
      const viewMid = window.scrollY + window.innerHeight * 0.5

      for (const zone of YEAR_ZONES) {
        const el = document.querySelector(zone.selector) as HTMLElement | null
        if (!el) continue
        const top = getScrollTop(el)
        const bottom = top + el.offsetHeight
        if (viewMid >= top && viewMid <= bottom) {
          const t = (viewMid - top) / (bottom - top)
          const yearFloat = zone.startYear + (zone.endYear - zone.startYear) * t
          yearFloatRef.current = yearFloat
          const year = Math.round(yearFloat)
          const progress = Math.min(1, Math.max(0, (YEAR_START - year) / (YEAR_START - YEAR_END)))
          setState(s => (s.year === year && s.visible && s.progress === progress) ? s : { year, visible: true, progress })
          return
        }
      }

      setState(s => s.visible ? { ...s, visible: false } : s)
    }

    const unsub = subscribeToScroll(() => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(() => { update(); ticking.current = false })
      }
    })
    update()
    return unsub
  }, [])

  return { ...state, yearFloatRef }
}
