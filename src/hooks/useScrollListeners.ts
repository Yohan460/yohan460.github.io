// Module-level singleton: one passive scroll listener shared across all subscribers
const subscribers = new Set<(y: number) => void>()
let bound = false

export function subscribeToScroll(cb: (y: number) => void): () => void {
  if (!bound) {
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY
        subscribers.forEach(fn => fn(y))
      },
      { passive: true }
    )
    bound = true
  }
  subscribers.add(cb)
  return () => { subscribers.delete(cb) }
}
