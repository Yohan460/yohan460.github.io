import { useReveal } from '../hooks/useReveal'

const INTERESTS = [
  {
    icon: '🚣',
    name: 'Rowing',
    role: 'Equipment Chair, GCRA · Safety Officer & Boatman, OSU Crew',
    desc: 'Continued rowing after college with the Greater Columbus Rowing Association, serving as Equipment Chair. At Ohio State served as elected Safety Officer and Boatman — managing boat repairs, scheduling, and equipment budgets.',
  },
  {
    icon: '📖',
    name: 'Reading',
    role: 'Douglas Preston & Lincoln Child · John Flanagan',
    desc: 'Favourite authors include Douglas Preston, Lincoln Child, and John Flanagan. Current favourite: Relic by Preston & Child.',
  },
  {
    icon: '🚴',
    name: 'Road Cycling',
    role: 'Amateur · Central Ohio roads',
    desc: 'Road cycling as a way to stay active and clear the head — both long solo rides and group rides with friends through Central Ohio.',
  },
  {
    icon: '🍳',
    name: 'Cooking',
    role: 'Self-taught',
    desc: 'Teaching myself to cook — already makes a pretty solid pasta sauce, apparently.',
  },
]

export default function Interests() {
  const headerRef = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()

  return (
    <section className="interests-section" aria-label="Personal interests">
      <div className="section-header reveal" ref={headerRef}>
        <span className="section-label">Beyond Code</span>
        <h2 className="section-title">Interests</h2>
        <div className="section-rule" />
      </div>
      <div className="interests-grid reveal reveal-delay-1" ref={gridRef}>
        {INTERESTS.map(item => (
          <div className="interest-item" key={item.name}>
            <div className="interest-icon" aria-hidden="true">{item.icon}</div>
            <div className="interest-name">{item.name}</div>
            <div className="interest-role">{item.role}</div>
            <p className="interest-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
