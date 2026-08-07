import { useReveal } from '../hooks/useReveal'

export default function Education() {
  const headerRef = useReveal<HTMLDivElement>()
  const card1Ref = useReveal<HTMLDivElement>()
  const card2Ref = useReveal<HTMLDivElement>()
  const card3Ref = useReveal<HTMLDivElement>()

  return (
    <section className="edu-section" id="education" aria-label="Education">
      <div className="section-header reveal" ref={headerRef}>
        <span className="section-label">Education</span>
        <h2 className="section-title">The Ohio State University</h2>
        <div className="section-rule" />
      </div>

      <div className="edu-card reveal" ref={card1Ref}>
        <div className="edu-card-accent" />
        <div className="edu-osu-mark">The Ohio State University · Columbus, Ohio</div>
        <div className="edu-degree">Bachelor of Science in Computer Science &amp; Engineering</div>
        <div className="edu-meta">Graduation May 2018 · Dean's List</div>
        <p className="edu-body">
          Graduated with Dean's List recognition from the College of Engineering. The program built a strong foundation in systems programming, algorithms, and software architecture that directly informs the distributed systems and infrastructure work done since.
        </p>
        <div className="edu-certs">
          <span className="cert-badge">Computer Science &amp; Engineering</span>
          <span className="cert-badge">Dean's List</span>
        </div>
      </div>

      <div className="edu-card reveal reveal-delay-1" ref={card2Ref}>
        <div className="edu-card-accent" />
        <div className="edu-osu-mark">Specialization · The Ohio State University</div>
        <div className="edu-degree">Cybersecurity</div>
        <div className="edu-meta">Graduation May 2018</div>
        <p className="edu-body">
          Focused specialization in network security, attack methodologies, and enterprise risk management. Understanding how security breaches occur — and how to execute them — informs a practical, adversarial approach to building secure infrastructure. Combined with nearly 7 years of hands-on IT experience entering graduation.
        </p>
        <div className="edu-certs">
          <span className="cert-badge">Network Security</span>
          <span className="cert-badge">Host Hardening</span>
          <span className="cert-badge">Risk Management</span>
          <span className="cert-badge">Forensic Investigation</span>
          <span className="cert-badge">CTF</span>
        </div>
      </div>

      <div className="edu-card reveal reveal-delay-2" ref={card3Ref}>
        <div className="edu-card-accent" style={{ background: 'linear-gradient(90deg,#f59e0b,#b45309)' }} />
        <div className="edu-osu-mark" style={{ color: '#d97706' }}>Certifications</div>
        <div className="edu-degree" style={{ fontSize: '1.4rem' }}>Jamf Certified</div>
        <div className="edu-meta">Jamf 200 · Jamf 300</div>
        <p className="edu-body">
          Jamf Certified Technician (Jamf 200) and Jamf Certified Administrator (Jamf 300) — the two primary professional certifications for enterprise Apple device management.
        </p>
        <div className="edu-certs">
          <span className="cert-badge" style={{ borderColor: 'rgba(245,158,11,0.4)', color: '#d97706' }}>
            Jamf 200 – Certified Technician
          </span>
          <span className="cert-badge" style={{ borderColor: 'rgba(245,158,11,0.4)', color: '#d97706' }}>
            Jamf 300 – Certified Administrator
          </span>
        </div>
      </div>
    </section>
  )
}
