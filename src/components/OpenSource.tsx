import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    accent: 'linear-gradient(90deg,#0052ff,#a78bfa)',
    dotColor: '#0052ff',
    tag: 'Go · Terraform',
    name: 'terraform-provider-jamf',
    desc: 'A full Terraform provider for Jamf Pro — enabling infrastructure-as-code for enterprise macOS device management. Published to the Terraform Registry with 8 releases.',
    stats: ['★ 15', '⑂ 8', 'Go 98%'],
    href: 'https://github.com/Yohan460/terraform-provider-jamf',
    linkLabel: 'View on GitHub',
  },
  {
    accent: 'linear-gradient(90deg,#6b7296,#3d4260)',
    dotColor: '#6b7296',
    tag: 'Go · SDK',
    name: 'oomnitza',
    desc: 'Auto-generated Golang library wrapping the Oomnitza OpenAPI 3 spec — supporting context-aware server selection, templated URLs, and proxy configuration for enterprise asset management.',
    stats: ['Go', 'OpenAPI 3'],
    href: 'https://github.com/Yohan460/oomnitza',
    linkLabel: 'View on GitHub',
  },
  {
    accent: 'linear-gradient(90deg,#f59e0b,#ef4444)',
    dotColor: '#f59e0b',
    tag: 'Shell · Bash',
    name: 'JAMF-Enrollment-Kickstart',
    desc: 'A reliable enrollment trigger maintaining a known-order, known-network, known-login-state initial configuration for Jamf-managed machines. Widely adopted in the MacAdmins community.',
    stats: ['★ 85', '⑂ 3', 'Shell'],
    href: 'https://github.com/Yohan460/JAMF-Enrollment-Kickstart',
    linkLabel: 'View on GitHub',
  },
  {
    accent: 'linear-gradient(90deg,#34d399,#5b8df5)',
    dotColor: '#34d399',
    tag: 'Go · API',
    name: 'go-jamf-api',
    desc: 'A full-featured Go client for the Jamf Pro UAPI with OAuth2 support. Includes a generate script to re-generate the client from updated Jamf swagger schemas.',
    stats: ['★ 5', '⑂ 7', 'Go'],
    href: 'https://github.com/Yohan460/go-jamf-api',
    linkLabel: 'View on GitHub',
  },
  {
    accent: 'linear-gradient(90deg,#a78bfa,#ec4899)',
    dotColor: '#a78bfa',
    tag: 'Shell · Bash',
    name: 'Automatic Secure Token Granting',
    desc: 'Automates SecureToken assignment for the Jamf-assigned user via a known-state admin account — enabling a fully hands-off FileVault 2 management workflow without exposing admin credentials.',
    stats: ['★ 50', '⑂ 3', 'Shell'],
    href: 'https://github.com/Yohan460/Automatic-Secure-Token-Granting-Workflow',
    linkLabel: 'View on GitHub',
  },
  {
    accent: 'linear-gradient(90deg,#0070c0,#003087)',
    dotColor: '#0070c0',
    tag: 'Swift · Obj-C',
    name: 'NoMAD Login / Authchanger',
    desc: 'Contributor to NoMAD Login 1.4 — major SecureToken / FileVault support. Led the primary refactor of Authchanger, now shipping inside Jamf Connect. (Orchard & Grove)',
    stats: ['Swift', 'Obj-C', 'Jamf Connect'],
    href: 'https://gitlab.com/orchardandgrove-oss/NoMADLogin-AD',
    linkLabel: 'View on GitLab',
  },
]

export default function OpenSource() {
  const headerRef = useReveal<HTMLDivElement>()
  const gridRef = useReveal<HTMLDivElement>()

  return (
    <section className="oss-section" aria-label="Open source projects">
      <div className="section-header reveal" ref={headerRef}>
        <span className="section-label">Open Source</span>
        <h2 className="section-title">Pinned Projects</h2>
        <div className="section-rule" />
      </div>
      <div className="oss-grid reveal reveal-delay-1" ref={gridRef}>
        {PROJECTS.map(p => (
          <div className="oss-card" key={p.name}>
            <div className="oss-accent" style={{ background: p.accent }} />
            <div className="oss-tag">
              <div className="oss-tag-dot" style={{ background: p.dotColor }} />
              {p.tag}
            </div>
            <div className="oss-name">{p.name}</div>
            <p className="oss-desc">{p.desc}</p>
            <div className="oss-stats">
              {p.stats.map(s => <span className="oss-stat" key={s}>{s}</span>)}
            </div>
            <a href={p.href} className="oss-link" target="_blank" rel="noreferrer">
              {p.linkLabel} →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
