import { useReveal } from '../hooks/useReveal'

export default function Quote() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div className="quote-wrap reveal" ref={ref}>
      <p className="quote-text">"Somewhere, something incredible is waiting to be known."</p>
      <div className="quote-attr">— Carl Sagan</div>
    </div>
  )
}
