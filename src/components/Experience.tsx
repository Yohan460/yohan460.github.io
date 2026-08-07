import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useYearCounter } from '../hooks/useYearCounter'
import { subscribeToScroll } from '../hooks/useScrollListeners'
import { EMPLOYERS, OSU_HIGHLIGHTS, UA_COACHING_ROLES, UA_COACHING_BULLETS } from '../data/experience'
import type { Employer } from '../data/experience'

// yearFloat value at which each concurrent card first enters (scrolling down = decreasing yearFloat)
const CARD_ENTRY: Record<string, number> = {
  'Assistant Varsity Coach': 2026,
  'Head Novice Coach':       2021.5,
  'Assistant Novice Coach':  2020.5,
  'osu':                     2018.5,
}
const SLIDE_PX   = 160
const SLIDE_OVER = 0.4  // years of scroll to complete the entry

const VH_PER_YEAR = 80

// Data lives in src/data/experience.ts so the resume PDF builds from the same source.

function EmployerCard({ emp, innerRef }: { emp: Employer; innerRef: RefObject<HTMLDivElement> }) {
  return (
    <div className="employer-inner reveal" ref={innerRef}>
      <div className="employer-header">
        {emp.logo && (
          <div className="employer-logo-wrap">
            <img src={emp.logo} alt={`${emp.name} logo`} loading="lazy" decoding="async" />
          </div>
        )}
        <div className="employer-meta">
          <div className="employer-name">{emp.name}</div>
          <div className="employer-role">{emp.role}</div>
          <div className="employer-period">{emp.period}</div>
        </div>
      </div>
      <p className="employer-desc">{emp.desc}</p>
      <div className="bullet-grid">
        {emp.bullets.map((b, j) => (
          <div className="bullet-item" key={j}>{b}</div>
        ))}
      </div>
      <div className="chip-row">
        {emp.chips.map(c => <span className="chip" key={c}>{c}</span>)}
      </div>
    </div>
  )
}

export default function Experience() {
  const { year, visible: yearVisible, yearFloatRef } = useYearCounter()
  const showOSU = yearVisible && year >= 2016 && year <= 2018
  const coachingRole = yearVisible
    ? UA_COACHING_ROLES.find(r => year >= r.minYear && year < r.maxYear) ?? null
    : null

  // Which card owns the slot right now; ref so the scroll handler avoids stale closures
  const activeKey = showOSU ? 'osu' : (coachingRole?.title ?? null)
  const activeKeyRef = useRef<string | null>(null)
  activeKeyRef.current = activeKey

  // The wrapper div whose transform/opacity we drive directly from scroll position
  const cardWrapRef = useRef<HTMLDivElement>(null)
  const applyStyleRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ticking = { current: false }

    function applyStyle() {
      const el = cardWrapRef.current
      if (!el) return
      const key = activeKeyRef.current
      const enterAt = key !== null ? CARD_ENTRY[key] : undefined

      if (enterAt === undefined) {
        el.style.opacity   = '0'
        el.style.transform = `translateY(${SLIDE_PX}px)`
        return
      }
      if (reduced) {
        el.style.opacity   = '1'
        el.style.transform = 'translateY(0)'
        return
      }
      // 0 at the entry boundary → 1 once SLIDE_OVER years of scroll have passed,
      // then clamped so the card rests in place for the remainder of the role.
      const p = Math.min(1, Math.max(0, (enterAt - yearFloatRef.current) / SLIDE_OVER))
      el.style.opacity   = String(p)
      el.style.transform = `translateY(${SLIDE_PX * (1 - p)}px)`
    }

    applyStyleRef.current = applyStyle
    const unsub = subscribeToScroll(() => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(() => { applyStyle(); ticking.current = false })
      }
    })
    applyStyle()
    return unsub
  }, [yearFloatRef])

  // Re-apply immediately when the slot swaps cards, so the new one starts
  // from its own scroll position instead of inheriting the old one's frame.
  useEffect(() => { applyStyleRef.current?.() }, [activeKey])

  const headerRef = useReveal<HTMLDivElement>()
  const coinbaseRef = useReveal<HTMLDivElement>()
  const leidosRef = useReveal<HTMLDivElement>()
  const denisonRef = useReveal<HTMLDivElement>()
  const battelleRef = useReveal<HTMLDivElement>()
  const osuRef = useReveal<HTMLDivElement>()

  const innerRefs = [coinbaseRef, leidosRef, denisonRef, battelleRef, osuRef]

  return (
    <section className="experience-section" id="experience" aria-label="Work experience">
      <div className="section-header reveal" ref={headerRef}>
        <span className="section-label">Experience</span>
        <h2 className="section-title">Work History</h2>
        <div className="section-rule" />
      </div>

      <div className="experience-grid">
        {/* ── left: employer blocks ── */}
        <div className="experience-employers">
          {EMPLOYERS.map((emp, i) => (
            <div key={emp.id}>
              {i > 0 && <hr className="employer-divider" />}
              <div
                className="employer-block"
                data-employer={emp.id}
                style={{ minHeight: `${emp.yearsSpan * VH_PER_YEAR}vh` }}
              >
                <EmployerCard emp={emp} innerRef={innerRefs[i]} />
              </div>
            </div>
          ))}

          {/* Mobile only: the sticky concurrent rail is hidden below 768px,
              so without this the coaching history is dropped entirely. */}
          <div className="coaching-mobile">
            <hr className="employer-divider" />
            <div className="employer-block">
              <div className="employer-inner">
                <div className="employer-header">
                  <div className="employer-meta">
                    <div className="employer-name">Upper Arlington HS Rowing</div>
                    <div className="employer-role">Women&rsquo;s Rowing Program</div>
                    <div className="employer-period">2019 &ndash; 2026 &middot; Concurrent</div>
                  </div>
                </div>
                <div className="coaching-role-list">
                  {UA_COACHING_ROLES.map(r => (
                    <div className="coaching-role-row" key={r.title}>
                      <span className="coaching-role-title">{r.title}</span>
                      <span className="coaching-role-period">{r.period}</span>
                    </div>
                  ))}
                </div>
                <div className="bullet-grid">
                  {UA_COACHING_BULLETS.map(b => (
                    <div className="bullet-item" key={b}>{b}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── right: shared concurrent slot — position driven by scroll, not time ── */}
        <div className="experience-coaching">
          <div className="coaching-panel" ref={cardWrapRef} style={{ opacity: 0, transform: `translateY(${SLIDE_PX}px)` }}>
            {showOSU ? (
              <>
                <div className="concurrent-label">Concurrent</div>
                <div className="concurrent-card">
                  <div className="concurrent-card-accent" />
                  <div className="concurrent-school">The Ohio State University</div>
                  <div className="concurrent-degree">Computer Science &amp; Engineering</div>
                  <div className="concurrent-period">2014 – May 2018</div>
                  <ul className="concurrent-highlights">
                    {OSU_HIGHLIGHTS.map(h => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              </>
            ) : coachingRole ? (
              <>
                <div className="concurrent-label">Concurrent · UA Rowing</div>
                <div className="concurrent-card ua-card">
                  <div className="concurrent-card-accent ua-accent" />
                  <div className="concurrent-school ua-school">Upper Arlington HS</div>
                  <div className="concurrent-degree">{coachingRole.title}</div>
                  <div className="concurrent-period">{coachingRole.period}</div>
                  <ul className="concurrent-highlights">
                    {UA_COACHING_BULLETS.map(b => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

