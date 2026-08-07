// Renders the resume to a standalone HTML string for Chrome's print-to-PDF.
//
// ATS constraints drive the structure: one column, real text (nothing baked
// into images), conventional section headings, and no CSS tables or absolute
// positioning. Parsers read this top-to-bottom in DOM order, which is also
// the visual order. Styling stays within those bounds.

const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))

const CONTACT = {
  email: 'johan@mcgwire.tech',
  site: 'mcgwire.tech',
  github: 'github.com/Yohan460',
  location: 'Columbus, OH',
}

const SKILLS = [
  ['Languages', 'Go, TypeScript, Python, Swift, Bash, PowerShell'],
  ['Infrastructure', 'Temporal, Kubernetes, AWS, Terraform, Airflow, GraphQL, Datadog'],
  ['AI Systems', 'Multi-Agent Orchestration, MCP Servers, ReAct Loops'],
  ['Platforms', 'Okta, Jamf, Duo, Active Directory, Azure, macOS MDM'],
  ['Leadership', 'Mentorship, Public Speaking, Technical Demos, Executive and Stakeholder Communication, Incident Command'],
]

const OSS = [
  ['terraform-provider-jamf', 'Terraform provider for Jamf Pro, published to the Terraform Registry. Go.'],
  ['go-jamf-api', 'Go client for the Jamf Pro UAPI with OAuth2, regenerated from upstream OpenAPI schemas.'],
  ['oomnitza', 'Generated Go SDK over the Oomnitza OpenAPI 3 spec, with context-aware server selection.'],
  ['JAMF-Enrollment-Kickstart', 'Known-state enrollment trigger, widely adopted across the MacAdmins community. 85\u2605.'],
]

export function renderResume({ EMPLOYERS, UA_COACHING_ROLES, fonts, headshot }) {
  const primary = EMPLOYERS.filter(e => e.resume?.tier === 'primary')
  const past = EMPLOYERS.filter(e => e.resume?.tier === 'past')
  const edu = EMPLOYERS.find(e => e.resume?.tier === 'education')

  const roleLine = emp => {
    // Senior title always leads; the prior title trails behind the arrow.
    const parts = emp.role.split(' \u2190 ')
    return parts.length === 2
      ? `${esc(parts[0])} <span class="arrow">\u2190 ${esc(parts[1])}</span>`
      : esc(emp.role)
  }

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Johan McGwire — Resume</title>
<style>
  @font-face { font-family:'Instrument Sans'; src:url('${fonts.instrument}') format('truetype');
               font-weight:400 700; font-display:block; }

  @page { size: Letter; margin: 0.42in 0.5in; }

  :root {
    --ink:      #16181f;
    --body:     #33363f;
    --muted:    #6b7078;
    --accent:   #2f5fd0;
    --rule:     #d8dbe2;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Instrument Sans', system-ui, sans-serif;
    font-size: 8.7pt;
    line-height: 1.27;
    color: var(--body);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── header ── */
  header { display: flex; align-items: flex-start; justify-content: space-between; gap: 14pt; }
  .header-text { flex: 1; min-width: 0; }
  .portrait {
    flex-shrink: 0;
    width: 58pt; height: 58pt;
    border-radius: 50%;
    object-fit: cover;
  }

  .name {
    font-family: 'Instrument Sans', system-ui, sans-serif;
    font-weight: 700;
    font-size: 21pt;
    letter-spacing: -0.015em;
    color: var(--ink);
    line-height: 1;
  }
  .headline {
    font-size: 9.6pt;
    font-weight: 600;
    color: var(--accent);
    margin-top: 2pt;
  }
  .contact {
    margin-top: 4pt;
    font-size: 8.5pt;
    color: var(--muted);
  }
  .contact a { color: var(--muted); text-decoration: none; }
  .contact span + span::before { content: '  ·  '; color: var(--rule); }

  .head-rule {
    height: 2.2pt;
    margin: 5pt 0 1pt;
    background: linear-gradient(90deg, var(--accent), #7b4fd6 55%, transparent);
  }

  /* ── sections ── */
  section { margin-top: 5pt; }
  h2 {
    font-size: 8.2pt;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink);
    padding-bottom: 2pt;
    border-bottom: 0.75pt solid var(--rule);
    margin-bottom: 4pt;
  }

  .job { margin-bottom: 3.6pt; break-inside: avoid; }
  .job:last-child { margin-bottom: 0; }

  .job-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10pt;
  }
  .employer {
    font-weight: 700;
    font-size: 11pt;
    letter-spacing: -0.01em;
    color: var(--ink);
  }
  .dates {
    font-size: 8.4pt;
    color: var(--muted);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .job-role {
    font-size: 9.2pt;
    font-weight: 600;
    color: var(--accent);
    margin-top: 1pt;
  }
  .job-loc { font-size: 8.4pt; color: var(--muted); font-weight: 400; }
  .arrow { font-weight: 400; color: var(--muted); padding-left: 1pt; }

  ul { list-style: none; margin-top: 3pt; }
  li {
    position: relative;
    padding-left: 10pt;
    margin-bottom: 1.1pt;
  }
  li::before {
    content: '';
    position: absolute;
    left: 1.5pt; top: 4.6pt;
    width: 3pt; height: 3pt;
    border-radius: 50%;
    background: var(--accent);
  }

  .summary { margin-top: 2pt; }

  /* ── compact rows (skills, oss) ── */
  .row { display: flex; gap: 8pt; margin-bottom: 1.1pt; break-inside: avoid; }
  .row-key {
    font-weight: 700;
    color: var(--ink);
    flex: 0 0 66pt;
    font-size: 8.6pt;
  }
  .row-val { flex: 1; font-size: 8.7pt; }
  .oss-name { font-weight: 700; color: var(--ink); }

  .coach-roles { font-size: 8.9pt; margin-top: 2.5pt; }
  .coach-roles b { color: var(--ink); font-weight: 600; }
</style></head>
<body>

  <header>
    <div class="header-text">
    <div class="name">Johan McGwire</div>
    <div class="headline">Senior Staff Site Reliability Engineer</div>
    <div class="contact">
      <span><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></span
      ><span><a href="https://${CONTACT.site}">${CONTACT.site}</a></span
      ><span><a href="https://${CONTACT.github}">${CONTACT.github}</a></span
      ><span>${CONTACT.location}</span>
    </div>
    </div>
    ${headshot ? `<img class="portrait" src="${headshot}" alt="Johan McGwire">` : ''}
  </header>
  <div class="head-rule"></div>

  <section>
    <h2>Experience</h2>
    ${primary.map(emp => `
    <div class="job">
      <div class="job-top">
        <div class="employer">${esc(emp.name)}</div>
        <div class="dates">${esc(emp.period)}</div>
      </div>
      <div class="job-role">${roleLine(emp)}${
        emp.resume.location ? ` <span class="job-loc">· ${esc(emp.resume.location)}</span>` : ''
      }</div>
      <ul>${emp.resume.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    </div>`).join('')}
  </section>

  <section>
    <h2>Open Source</h2>
    ${OSS.map(([n, d]) => `
    <div class="row">
      <div class="row-val"><span class="oss-name">${esc(n)}</span> — ${esc(d)}</div>
    </div>`).join('')}
  </section>

  <section>
    <h2>Earlier Experience</h2>
    ${past.map(emp => `
    <div class="job">
      <div class="job-top">
        <div class="employer">${esc(emp.name)}</div>
        <div class="dates">${esc(emp.period)}</div>
      </div>
      <div class="job-role">${roleLine(emp)}${
        emp.resume.location ? ` <span class="job-loc">· ${esc(emp.resume.location)}</span>` : ''
      }</div>
      <div class="summary">${esc(emp.resume.summary)}</div>
    </div>`).join('')}
  </section>

  <section>
    <h2>Coaching</h2>
    <div class="job">
      <div class="job-top">
        <div class="employer">Upper Arlington High School Rowing</div>
        <div class="dates">2019 – 2026</div>
      </div>
      <div class="job-role">Women's Rowing Program <span class="job-loc">· Upper Arlington, OH</span></div>
      <div class="coach-roles">
        ${UA_COACHING_ROLES.map(r => `<b>${esc(r.title)}</b> (${esc(r.period)})`).join(' · ')}
      </div>
      <div class="summary">On-water coaching and athlete development across novice and varsity levels, plus boat repair, fleet maintenance, and regatta logistics.</div>
    </div>
  </section>

  <section>
    <h2>Education</h2>
    <div class="job">
      <div class="job-top">
        <div class="employer">${esc(edu.name)}</div>
        <div class="dates">${esc(edu.period)}</div>
      </div>
      <div class="job-role">B.S. Computer Science &amp; Engineering, Cybersecurity specialization <span class="job-loc">· Columbus, OH</span></div>
      <div class="summary">Dean's List, College of Engineering. Network hardening, forensic investigation, CTF competition, and enterprise risk management.</div>
    </div>
  </section>

  <section>
    <h2>Skills</h2>
    ${SKILLS.map(([k, v]) => `
    <div class="row"><div class="row-key">${esc(k)}</div><div class="row-val">${esc(v)}</div></div>`).join('')}
  </section>

</body></html>`
}
