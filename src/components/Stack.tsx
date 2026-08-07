import { useReveal } from '../hooks/useReveal'

type Weight = 'w-primary' | 'w-secondary' | 'w-tertiary' | 'w-quaternary'

const CATEGORIES: Array<{
  label: string
  tags: Array<{ name: string; weight: Weight }>
}> = [
  {
    label: 'Languages',
    tags: [
      { name: 'Go', weight: 'w-primary' },
      { name: 'TypeScript', weight: 'w-secondary' },
      { name: 'Python', weight: 'w-secondary' },
      { name: 'Swift', weight: 'w-tertiary' },
      { name: 'PowerShell', weight: 'w-tertiary' },
      { name: 'Bash', weight: 'w-quaternary' },
    ],
  },
  {
    label: 'Infrastructure',
    tags: [
      { name: 'Kubernetes', weight: 'w-secondary' },
      { name: 'AWS', weight: 'w-secondary' },
      { name: 'Terraform', weight: 'w-secondary' },
      { name: 'MongoDB', weight: 'w-tertiary' },
      { name: 'Datadog', weight: 'w-tertiary' },
      { name: 'Airflow', weight: 'w-quaternary' },
    ],
  },
  {
    label: 'Platforms & Tooling',
    tags: [
      { name: 'Temporal', weight: 'w-primary' },
      { name: 'GraphQL', weight: 'w-secondary' },
      { name: 'React', weight: 'w-secondary' },
      { name: 'Okta', weight: 'w-tertiary' },
      { name: 'Jamf', weight: 'w-tertiary' },
      { name: 'SCCM', weight: 'w-quaternary' },
    ],
  },
]

export default function Stack() {
  const headerRef = useReveal<HTMLDivElement>()
  const bodyRef = useReveal<HTMLDivElement>()

  return (
    <section className="stack-section" aria-label="Technical skills">
      <div className="section-header reveal" ref={headerRef}>
        <span className="section-label">Stack</span>
        <h2 className="section-title">Languages &amp; Tools</h2>
        <div className="section-rule" />
      </div>
      <div className="stack-categories reveal reveal-delay-1" ref={bodyRef}>
        {CATEGORIES.map(cat => (
          <div key={cat.label}>
            <div className="stack-category-label">{cat.label}</div>
            <div className="stack-tag-cloud">
              {cat.tags.map((tag, i) => (
                <span key={tag.name}>
                  <span className={`stack-tag ${tag.weight}`}>{tag.name}</span>
                  {i < cat.tags.length - 1 && (
                    <span className="stack-sep" aria-hidden="true"> /</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
