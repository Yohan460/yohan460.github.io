// Shared source of truth for the Experience section and the resume PDF.
// scripts/build-resume.mjs reads this same file, so titles and dates
// cannot drift between the site and the PDF the way they did before.

export const EMPLOYERS = [
  {
    id: 'coinbase',
    name: 'Coinbase',
    role: 'Senior Staff Site Reliability Engineer ← Systems Engineer, IT Operations',
    period: 'June 2020 – Present',
    yearsSpan: 6.0,
    logo: '/logos/coinbase.svg',
    iconBorder: 'rgba(0,82,255,0.4)',
    desc: 'Pivoted fully into software engineering here — joining as a Systems Engineer and growing to Senior Staff SRE while building production systems across Go, TypeScript, and AWS that power IT operations at exchange scale. Drove a code-first culture across the broader IT org, shipping multiple platforms from first design through production ownership.',
    bullets: [
      'Built a large-scale corporate data processing platform driven by multiple coordinated agents — custom MCP servers, ReAct reasoning loops, and automated data sanitization, delivered as a full-stack application orchestrated end-to-end with Temporal',
      'Shipped a guided agentic development platform that lets non-developers design and deliver complete applications — turning plain-language intent into working, production-ready builds',
      'Designed a full-service IT Support portal aggregating Okta, Duo, Google, Jamf, Oomnitza, and internal APIs — GraphQL microservice backend with a React frontend, hosted on AWS with Kubernetes',
      'Architected, implemented, and operationalized Temporal for user onboarding and offboarding workflows',
      'Expanded frontend and backend user analytics monitoring via Datadog',
      'Served as Incident Commander leading high-severity internal and external incident remediation',
      'Partnered with senior and executive leadership across cross-org initiatives — translating technical strategy into business framing and driving alignment from proposal through delivery',
      'Mentored engineers across the org through lunch-and-learns, educational sessions, and live demos — raising the technical bar and spreading code-first practice',
      'Stood up a macOS EC2 deployment pipeline powering AutoPkg and retail application releases',
      'Delivered corporate reporting through Python Airflow ETLs spanning Jamf, Google, Okta, Jira, and Duo',
      'Led the company-wide macOS MDM transition including all communications and support',
      'Automated external guest access with a Slack bot for self-service, NDA-signed invitations',
    ],
    chips: ['Go', 'TypeScript', 'Temporal', 'AI Agents', 'MCP', 'GraphQL', 'React', 'Kubernetes', 'AWS', 'Airflow', 'Datadog', 'Terraform', 'MongoDB', 'Okta'],
    resume: {
      tier: 'primary',
      location: 'Remote — Columbus, OH',
      bullets: [
        'Built a large-scale corporate data processing platform driven by multiple coordinated agents — custom MCP servers, ReAct reasoning loops, and automated data sanitization, delivered full-stack and orchestrated end-to-end with Temporal',
        'Shipped a guided agentic development platform enabling non-developers to design and deliver complete, production-ready applications from plain-language intent',
        'Designed a full-service IT Support portal aggregating Okta, Duo, Google, Jamf, and Oomnitza — GraphQL microservice backend, React frontend, AWS and Kubernetes',
        'Architected, implemented, and operationalized Temporal for user onboarding and offboarding workflows',
        'Served as Incident Commander leading high-severity internal and external incident remediation',
        'Partnered with senior and executive leadership on cross-org initiatives, translating technical strategy into business framing and driving alignment through delivery',
        'Mentored engineers across the org through lunch-and-learns, educational sessions, and live demos, spreading code-first practice',
        'Expanded frontend and backend user analytics monitoring via Datadog; corporate reporting via Python Airflow ETLs',
      ],
    },
  },
  {
    id: 'leidos',
    name: 'Leidos',
    role: 'macOS Engineer (Contractor), Corporate IT',
    period: 'January 2020 – May 2020',
    yearsSpan: 0.5,
    logo: '/logos/leidos.svg',
    iconBorder: 'rgba(0,48,135,0.4)',
    desc: 'A large-scale device management modernization for a federal contractor — migrating from legacy corporate imaging to modern user-driven deployment workflows under strict NIST compliance requirements throughout.',
    bullets: [
      'Developed custom NoMAD Login code for seamless mobile-to-local account transitions',
      'Engineered a single-network-service enforcement subsystem satisfying NIST split-tunneling and dual-homing requirements',
      'Built a Privilege Rights Management subsystem leveraging existing account infrastructure and Jamf in a local-account macOS environment, in accordance with NIST regulations',
      'Overhauled machine provisioning and software installation workflow to utilize Jamf Enrollment Kickstart',
      'Designed a corporate communication strategy built on the macOS notification center',
      'Documented enrollment methodologies with custom video walkthroughs',
    ],
    chips: ['Swift', 'Bash', 'Jamf', 'NoMAD', 'NIST', 'macOS'],
    resume: {
      tier: 'past',
      location: 'Remote',
      summary: 'NIST-compliant device management modernization — custom NoMAD Login code, a privilege rights management subsystem, and a rebuilt provisioning workflow on Jamf Enrollment Kickstart.',
    },
  },
  {
    id: 'denison',
    name: 'Denison University',
    role: 'Lead Systems Engineer, Information Technology Services',
    period: 'January 2019 – January 2020',
    yearsSpan: 1.0,
    logo: '/logos/denison.png',
    iconBorder: 'rgba(200,16,46,0.4)',
    desc: 'Sole tier-3 and infrastructure specialist for both Windows and macOS across the entire university — owning endpoint management for hundreds of devices, deployment engineering, and technical direction for student employees.',
    bullets: [
      'Converted Windows imaging from monolithic to provisioning-package and management-agent based workflow',
      'Refactored all Jamf policies to standardize on the Jamf Enrollment Kickstart workflow',
      'Established a single source of truth for all endpoint software deployment information across Windows and macOS',
      'Wrote API scripts to standardize data between Web Help Desk, Jamf, and ZCM',
      'Reconstructed the Windows Update Services infrastructure environment',
      'Served as primary administrator for both ZenWorks Configuration Management (Windows) and Jamf (macOS)',
    ],
    chips: ['Jamf', 'SCCM', 'PowerShell', 'Bash', 'ZCM', 'macOS', 'Windows'],
    resume: {
      tier: 'past',
      location: 'Granville, OH',
      summary: 'Sole tier-3 and infrastructure specialist for Windows and macOS across the university, owning endpoint management for hundreds of devices and all deployment engineering.',
    },
  },
  {
    id: 'battelle',
    name: 'Battelle Memorial Institute',
    role: 'IT Coordinator ← Intern, Corporate Information & Technology',
    period: 'June 2016 – January 2019',
    yearsSpan: 2.6,
    logo: '',
    iconBorder: 'rgba(0,95,135,0.4)',
    desc: 'Started as a technology intern and grew into a full-time IT Coordinator — owning Apple infrastructure across hundreds of devices and serving as backup SCCM administrator for all workstations. First exposure to enterprise-scale device management at a major US research and government contractor.',
    bullets: [
      'Built Battelle\'s macOS management program from scratch — 150+ Jamf policies covering full self-service functionality',
      'Implemented touchless Mac deployment via Apple DEP and Jamf, including DFARS security layers',
      'Wrote PowerShell with Azure user/group queries to automate Microsoft Office license assignment and recovery',
      'Scripted YubiKey (smart card) provisioning for MFA with domain user certificates on Mac and Windows',
      'Configured 802.1X computer-based networking for Mac including NPS server policy reconfiguration',
      'Administered Active Directory, Group Policy, Intune, and all Azure endpoint management integrations',
      'Piloted Windows AutoPilot across user-driven and machine-driven provisioning scenarios',
    ],
    chips: ['Jamf', 'SCCM', 'PowerShell', 'Active Directory', 'Intune', 'Azure', 'DEP', '802.1X'],
    resume: {
      tier: 'past',
      location: 'Columbus, OH',
      summary: "Built Battelle's macOS management program from scratch — 150+ Jamf policies and touchless DEP deployment with DFARS security layers; backup SCCM administrator for all workstations.",
    },
  },
  {
    id: 'osu',
    name: 'The Ohio State University',
    role: 'B.S. Computer Science & Engineering',
    period: 'September 2014 – May 2018',
    yearsSpan: 2.0,
    logo: '/logos/osu.png',
    iconBorder: 'rgba(187,0,0,0.45)',
    desc: 'Four-year undergraduate program in the College of Engineering — the foundation for everything since. From junior year onward, balanced a full academic load with the Battelle internship that converted into a full-time role before graduating in May 2018.',
    bullets: [
      'Cybersecurity specialization — network hardening, forensic investigation, CTF competition, and enterprise risk management',
      'Systems programming, algorithms, and software architecture across Java, C, and Python',
    ],
    chips: ['Java', 'C', 'Python', 'Linux', 'Cybersecurity', 'Networking', 'Algorithms'],
    resume: { tier: 'education' },
  },
]

export const OSU_HIGHLIGHTS = [
  'Cybersecurity specialization',
  'Dean\'s List, College of Engineering',
  'Safety Officer & Boatman, OSU Crew',
]

export const UA_COACHING_ROLES = [
  { minYear: 2022, maxYear: 2027, title: 'Assistant Varsity Coach', period: '2022 – 2026' },
  { minYear: 2021, maxYear: 2022, title: 'Head Novice Coach',       period: '2021 – 2022' },
  { minYear: 2019, maxYear: 2021, title: 'Assistant Novice Coach',  period: '2019 – 2021' },
]

export const UA_COACHING_BULLETS = [
  "Women's Rowing Program",
  'On-water coaching & athlete development',
  'Boat repair & fleet maintenance',
  'Regatta logistics & travel coordination',
]
export type Employer = (typeof EMPLOYERS)[number]
