import { useParallax } from '../hooks/useParallax'

export default function Hero() {
  const gridRef = useParallax<HTMLDivElement>(0.28)
  const glowRef = useParallax<HTMLDivElement>(0.12)

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-grid" ref={gridRef} />
      <div className="hero-glow" ref={glowRef} />
      <div className="hero-content">
        <div className="hero-eyebrow">Systems Engineer &amp; Developer</div>
        <h1 className="hero-name">
          Johan<br /><span>McGwire</span>
        </h1>
        <p className="hero-title">
          Senior staff engineer building <strong>distributed systems and AI infrastructure</strong> at Coinbase.
          Full stack in Go &amp; TypeScript, deep in Temporal, with roots in enterprise MDM and open source tooling.
        </p>
        <div className="hero-links">
          <a href="https://github.com/Yohan460" className="btn btn-primary" target="_blank" rel="noreferrer">
            ↗ GitHub
          </a>
          <a href="/Johan_McGwire.pdf" className="btn btn-ghost" target="_blank" rel="noreferrer">
            Resume ↓
          </a>
          <a href="mailto:johan@mcgwire.tech" className="btn btn-ghost">
            Contact
          </a>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <div className="scroll-line" />
        scroll
      </div>
    </section>
  )
}
