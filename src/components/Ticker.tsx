const ITEMS = [
  'Go', 'TypeScript', 'Temporal', 'GraphQL', 'Kubernetes', 'AWS',
  'React', 'Terraform', 'Python', 'Swift', 'Jamf', 'MongoDB', 'Datadog', 'Airflow', 'Okta', 'SCCM',
]

const doubled = [...ITEMS, ...ITEMS]

export default function Ticker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker">
        {doubled.map((item, i) => (
          <span className="ticker-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
