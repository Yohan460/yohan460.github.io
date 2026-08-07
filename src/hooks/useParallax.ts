import { useEffect, useRef } from 'react'
import { subscribeToScroll } from './useScrollListeners'

export function useParallax<T extends HTMLElement = HTMLElement>(factor: number) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const unsub = subscribeToScroll(y => {
      el.style.transform = `translateY(${y * factor}px)`
    })
    return unsub
  }, [factor])

  return ref
}
