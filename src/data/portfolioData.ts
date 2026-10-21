export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  featured?: boolean;
  liveUrl?: string;
  thumbnail: string;
  gallery?: string[];
  summary: string;
  description: string;
  role: string;
  techStack: string[];
  highlights: string[];
  challenge?: string;
  solution?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  tier?: string;
  bullets: string[];
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  iconName: string;
}

export const PERSONAL_INFO = {
  name: "Muhammad Daniel Aniq",
  preferredName: "Daniel Aniq",
  brandName: "DA Lab",
  brandLogo: "/assets/aistudio/DA_TACTICAL-01_30c171ae.png",
  title: "Systems Specialist & Telematics Builder",
  headline: "Crafting hardware telemetry, cloud systems & seamless digital experiences.",
  lead: "Senior Customer Success Specialist L4 (Apple Ecosystem at Teleperformance) · Former Intel PG12 VLE Equipment Specialist · Founder of Proton ReLink.",
  phone: "+60195007428",
  email: "danielaniq@danielaniq.com",
  website: "https://www.danielaniq.com",
  github: "https://github.com/danielaniq28",
  location: "Georgetown, Pulau Pinang, Malaysia",
  resumePdf: "/assets/aistudio/new_simple_resume_88eb8aa2.pdf",
  bio: "Passionate systems engineer and technical problem solver with a deep background in hardware validation, network infrastructure, and real-time telematics. Currently operating at the highest escalation tier for Apple ecosystem engineering, with hands-on experience bridging reverse-engineered IoT protocols and clean, consumer-grade digital interfaces.",
  stats: [
    { label: "Availability", value: "99.8%", detail: "Telematics telemetry uptime" },
    { label: "Escalation Tier", value: "Level 4", detail: "Senior technical authority" },
    { label: "Hardware Track Record", value: "4+ Yrs", detail: "Intel PG12 test correlation" },
    { label: "Academic Standing", value: "3.49", detail: "CGPA · PTSS Dean's List" }
  ]
};

export const PROTON_RELINK_PROJECT: Project = {
  id: "proton-relink",
  title: "Proton ReLink",
  subtitle: "Next-Generation Remote Vehicle Control & Telematics Suite for Proton S70",
  category: "Automotive Telematics & IoT",
  year: "2024 — Present",
  featured: true,
  liveUrl: "http://protonrelink.danielaniq.com/",
  thumbnail: "/assets/aistudio/IMG_6635_2bf579e9.PNG",
  gallery: [
    "/assets/aistudio/IMG_6635_2bf579e9.PNG",
    "/assets/aistudio/IMG_6636_97dc09cd.PNG",
    "/assets/aistudio/IMG_6637_7b56e946.PNG",
    "/assets/aistudio/IMG_6638_90189256.PNG",
    "/assets/aistudio/IMG_6639_8e719934.PNG"
  ],
  summary: "A high-performance alternative to the official Proton Link app that gives drivers near-instantaneous remote lock/unlock, cabin pre-cooling, diagnostics, and precise GPS tracking without bloatware.",
  description: "Proton ReLink is a standalone telematics and remote vehicle control application engineered for the Proton S70 (ANQ2882) and compatible Geely BMA platform vehicles. By deconstructing the ACO TECH ATLAS vehicle telematics API, the platform delivers zero-latency commands, real-time CAN-bus metric visualization, and an Apple-inspired minimalist interface that responds smoothly to driver interactions.",
  role: "Lead Systems Architect & Full-Stack Developer",
  techStack: ["TypeScript", "React", "Reverse Engineered ACO TECH ATLAS API", "WebSockets", "OpenStreetMap", "Framer Motion", "Tailwind CSS"],
  highlights: [
    "Sub-500ms remote command execution for door locks, engine remote start, and trunk release",
    "Real-time TPMS tire pressure monitoring (235/246 kPa) and 12.9V battery health monitoring",
    "Precision cabin climate adjustment with 18°C–31°C controls and 3–20 min auto-off timer",
    "Live GPS coordinate positioning (5.40990, 100.32468 Georgetown) with OpenStreetMap telemetry",
    "High security bearer token rotation and hardware safety interlocks"
  ],
  challenge: "The default OEM vehicle companion applications in the market suffer from high connection latencies (frequently 15–30 seconds), clunky interfaces, and frequent timeout errors when issuing critical commands like remote cabin cooling under intense tropical heat.",
  solution: "Re-engineered the complete request lifecycle: implemented optimized session persistence, pre-warmed token handshakes, lightweight JSON payload dispatch, and an intuitive dark-mode interface modeled after Apple CarPlay and CarKey conventions."
};

export const OTHER_PROJECTS: Project[] = [
  {
    id: "e-pusat-islam",
    title: "e-Pusat Islam Attendance System",
    subtitle: "Cloud Data Storage & Rapid QR Code Scanning Platform",
    category: "Cloud Systems & Mobile Automation",
    year: "2018 — 2019",
    thumbnail: "/assets/aistudio/e-Pusat_islam_e774dede.png",
    summary: "Paperless QR-code verification and cloud attendance system built for Politeknik Tuanku Syed Sirajuddin.",
    description: "Developed an automated attendance capture and student record verification system for Islamic center lectures and academic congregations. Utilized Google Cloud Platform backends to provide instant student registration, QR code generation, dynamic check-ins, and automated attendance reporting for faculty administrators.",
    role: "Project Lead & Cloud Developer (Final Year Project)",
    techStack: ["Google Cloud Platform", "QR Scanner Protocol", "Android SDK", "Firebase / Cloud Datastore"],
    highlights: [
      "Eliminated manual paper sign-ins for over 1,000+ campus students",
      "Showcased at TECHREAVERY 2018 with MDEC industrial validation and mentorship",
      "Sub-second QR scan-to-cloud commit with offline queue capability"
    ],
    challenge: "Long congestion lines during mandatory campus gatherings caused substantial delays and forged attendance signatures.",
    solution: "Designed high-speed camera scanning with dynamic QR hashing tied to individual student IDs, storing records immutably on Google Cloud Platform."
  },
  {
    id: "e-aduan-abm",
    title: "e-Aduan ABM Reporting System",
    subtitle: "Enterprise Facility Maintenance & Defect Incident Triage",
    category: "Enterprise Cloud Platforms",
    year: "2019",
    thumbnail: "/assets/aistudio/unnamed_ea251aaa.png",
    summary: "Cloud-based incident reporting and facility tracking system for Akademi Binaan Malaysia.",
    description: "Constructed an agile, mobile-first facility reporting platform enabling Akademi Binaan Malaysia (ABM) students, instructors, and maintenance crew to log structural defects, broken equipment, and equipment inquiries with attached photographic evidence and instant routing.",
    role: "Systems Developer",
    techStack: ["Google Cloud Platform", "Form Automation", "Cloud Storage", "Responsive Mobile Web"],
    highlights: [
      "Categorized report channels: Aduan (Complaints), Pertanyaan (Inquiries), Cadangan (Suggestions), and Penghargaan (Appreciation)",
      "Automated ticket dispatch to campus technicians with status tracking",
      "Reduced repair resolution time by 60% through instant visual defect logging"
    ]
  },
  {
    id: "halal-audit-system",
    title: "Halal Audit Application System",
    subtitle: "Digital Compliance Inspection & Certification Architecture",
    category: "Enterprise Compliance & Cloud",
    year: "2019",
    thumbnail: "/assets/aistudio/unnamed_26304eac.jpg",
    summary: "Digital audit checklist engine with Google Cloud Platform storage for food and premise compliance.",
    description: "Created an interactive audit workflow system that digitizes the traditionally paper-heavy Halal compliance inspection lifecycle. Supports auditor authentication, granular multi-section compliance checklists, real-time non-conformance flag logging, and automated compliance report generation.",
    role: "Full-Stack System Architect",
    techStack: ["Google Cloud Platform", "Mobile UI", "Cloud Auth", "Automated Reporting"],
    highlights: [
      "Standardized multi-criteria audit inspections into a streamlined mobile flow",
      "Instant synchronization to secure cloud storage for audit trail integrity",
      "Designed for both field auditors and internal quality assurance officers"
    ]
  },
  {
    id: "intel-validation",
    title: "Intel PG12 VLE Hardware Validation",
    subtitle: "Automated Correlation & Semiconductor Test Bench Operations",
    category: "Hardware Engineering & Instrumentation",
    year: "2021 — 2024",
    thumbnail: "/assets/aistudio/images_330e6deb.png",
    summary: "Test bench correlation, PCB board diagnostics, and equipment validation at Intel PG12 with Sophic Automation.",
    description: "Spearheaded test bench setups, machine correlation, and hardware debugging at Intel's PG12 semiconductor facility. Executed comprehensive product validation test runs, analyzed parametric test results, and collaborated directly with automation and test engineers to maintain zero equipment downtime.",
    role: "VLE Equipment Specialist (Sophic Automation Sdn Bhd)",
    techStack: ["Test Bench Correlation", "PCB Diagnostics", "Signal Oscilloscopes", "Automated Test Software", "Fluke Cabling Testers"],
    highlights: [
      "Maintained 99%+ test correlation fidelity across high-throughput production lines",
      "Identified board-level anomalies and component level fault lines on complex multi-layer PCBs",
      "Ensured stringent ISO and Intel cleanroom hardware engineering standards"
    ]
  },
  {
    id: "irdeco-digital",
    title: "DecoHouze / IRDECO Digital Platform",
    subtitle: "Brand Identity, Commercial Video Production & Web Architecture",
    category: "Digital Marketing & Brand Engineering",
    year: "2020 — 2021",
    thumbnail: "/assets/aistudio/decohouse_5aa707c3.png",
    summary: "End-to-end digital branding, company web deployment (irdeco.my/new), and viral video campaign production.",
    description: "Designed, launched, and managed DecoHouze by IRDECO's corporate web platform. Directed high-retention video commercials, social media branding campaigns across Instagram and Facebook, and implemented digital conversion funnels.",
    role: "Graphic Designer & Internet Marketer",
    techStack: ["Web Design & Deployment", "Adobe Premiere Pro / After Effects", "Social Media Analytics", "Creative Direction"],
    highlights: [
      "Designed and deployed irdeco.my/new with seamless catalog browsing",
      "Produced multi-platform marketing video assets driving tens of thousands of views",
      "Established core brand style guides and visual typography systems"
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "tp-apple",
    role: "Customer Success Specialist L4 (Project Orchard)",
    company: "Teleperformance MY — TP Livingston",
    location: "Penang, Malaysia",
    period: "07/2025 — Present",
    tier: "Senior Technical Support · Highest Escalation Path",
    bullets: [
      "Serves as the highest technical escalation tier for Apple Ecosystem issues across iOS, macOS, iPhone, and Mac hardware/software.",
      "Diagnoses complex multi-factor customer failure modes, triaging kernel/firmware regressions and escalating verified reproducible bugs to Apple Engineering.",
      "Performs deep case logging, telemetry extraction, and diagnostic correlation ensuring actionable technical handover packages.",
      "Mentors Tier 1–3 specialists in Apple diagnostics, device log capture, and root-cause analysis."
    ],
    skills: ["Apple Ecosystem", "iOS / macOS Kernel Diagnostics", "Engineering Escalations", "Technical Root-Cause Analysis", "Telematics Triage"]
  },
  {
    id: "sophic-intel",
    role: "VLE Equipment Specialist",
    company: "Sophic Automation Sdn Bhd @ Intel PG12",
    location: "Penang, Malaysia",
    period: "04/2021 — 12/2024",
    tier: "Semiconductor Hardware & Test Automation",
    bullets: [
      "Conducted rigorous product test validation execution and automated test machine correlation for semiconductor manufacturing lines.",
      "Configured, calibrated, and maintained high-speed test benches and industrial testing fixtures.",
      "Troubleshot and debugged intricate multi-layer PCB boards, power delivery rails, and digital signaling lines.",
      "Collaborated continuously with lead Intel test engineers to optimize test recipes and minimize test false-alarm rates."
    ],
    skills: ["Test Bench Correlation", "PCB Diagnostics", "Hardware Validation", "Industrial Automation", "Quality Assurance"]
  },
  {
    id: "irdeco",
    role: "Graphic Designer & Internet Marketer",
    company: "DecoHouze by IRDECO",
    location: "Penang, Malaysia",
    period: "02/2020 — 02/2021",
    tier: "Web Deployment & Creative Direction",
    bullets: [
      "Architected, built, and launched the company web platform at irdeco.my/new.",
      "Produced commercial marketing video campaigns, motion graphics, and social media creative for Facebook and Instagram.",
      "Coordinated content distribution strategy and analyzed digital campaign analytics to maximize conversion rates."
    ],
    skills: ["Web Development", "Video Editing", "Creative Direction", "Conversion Rate Optimization"]
  }
];

export const LEADERSHIP_AND_EDUCATION = [
  {
    institution: "Politeknik Tuanku Syed Sirajuddin",
    location: "Perlis, Malaysia",
    degree: "Diploma in Digital Technology (Networking)",
    period: "06/2016 — 01/2019",
    grade: "CGPA: 3.49",
    honors: "Dean's List for Academic Excellence",
    highlights: [
      "Specialized in enterprise routing & switching, network defense, Linux systems administration, and embedded IoT.",
      "Class Representative (WAKAS) across all semesters, leading cohort operations and faculty dispute resolutions."
    ]
  },
  {
    institution: "PTSS Hacking Team (Umnonymous)",
    location: "Perlis, Malaysia",
    degree: "Team Leader & Primary Penetration Tester",
    period: "2017 — 2019",
    grade: "Competitive CTF Team",
    honors: "National Cyber Security Competitions",
    highlights: [
      "Led primary penetration testing and offensive security assignments during high-intensity Capture The Flag (CTF) tournaments.",
      "Orchestrated team communications, vulnerability identification, reverse engineering, and exploit proof-of-concepts."
    ]
  },
  {
    institution: "TECHREAVERY 2018 (Technology & Creative Innovation Discovery)",
    location: "Malaysia",
    degree: "MDEC Industry Innovation Fellow",
    period: "2018",
    grade: "Product Pitch & Commercialization",
    honors: "MDEC & Industry Partner Mentorship",
    highlights: [
      "Strengthened venture pitching and technical design through MDEC industrial panels.",
      "Reviewed FYP marketability and user-centric architecture alongside industry leaders."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Certified Cabling Test Technician",
    issuer: "Fluke Networks",
    year: "Credentialed",
    iconName: "Network"
  },
  {
    name: "CyberSecurity Essentials",
    issuer: "CyberSecurity Malaysia",
    year: "Credentialed",
    iconName: "ShieldCheck"
  }
];
