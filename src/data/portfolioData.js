export const personalInfo = {
  name: "Aditya Sharma",
  title: "Backend Engineer | AI Systems Developer",
  tagline: "Focused on reliable backend architecture and clean system design.",
  summary: "I build backend systems focused on document processing, AI pipelines, and scalable APIs. My work emphasizes reliability, testing discipline, and maintainable architecture.",
  location: "Ludhiana, India",
  github: "https://github.com/MasterAditya",
  linkedin: "https://www.linkedin.com/in/ursadityasharma",
  resume: "resume.pdf",
  focusAreas: ["Async Processing", "System Reliability", "Clean Architecture", "Testing Discipline"],
  heroStats: [
    { label: "Core Systems", target: 3 },
    { label: "Test Coverage", target: 88, suffix: "%" },
    { label: "Doc Latency", target: 1.2, prefix: "~", suffix: "s", decimals: 1 },
    { label: "Largest Dataset", target: 1000, suffix: "+ pages" }
  ]
};

export const resumeDocuments = [
  {
    id: 1,
    label: "University Template CV",
    labelDe: "Lebenslauf (Universitaetsvorlage)",
    useCase: "Campus Placements",
    useCaseDe: "Campus-Praktika",
    context: "For internships and campus recruitment drives at LPU and partner institutions",
    contextDe: "Fuer Praktika und Campus-Rekrutierung bei LPU und Partnerinstitutionen",
    file: "resumes/university-template-demo.pdf",
    note: "Includes academic profile, internship exposure, and campus-ready format",
    noteDe: "Enthaelt akademisches Profil, Praktikumserfahrung und campusgerechtes Format",
    badge: "Campus"
  },
  {
    id: 2,
    label: "Official English Resume",
    labelDe: "Offizieller Lebenslauf (Englisch)",
    useCase: "International Roles",
    useCaseDe: "Internationale Positionen",
    context: "For roles at global companies and international job applications",
    contextDe: "Fuer Stellen bei globalen Unternehmen und internationale Bewerbungen",
    file: "resumes/official-english-resume-demo.pdf",
    note: "Primary version for international backend and AI systems applications",
    noteDe: "Primaere Version fuer internationale Bewerbungen im Backend- und KI-Systems-Bereich",
    badge: "Global"
  },
  {
    id: 3,
    label: "Official German Resume",
    labelDe: "Offizieller Lebenslauf (Deutsch)",
    useCase: "German & EU Roles",
    useCaseDe: "Deutsche & EU-Positionen",
    context: "For German-speaking companies and EU job applications (German CV format)",
    contextDe: "Fuer deutschsprachige Unternehmen und EU-Bewerbungen (deutsches CV-Format)",
    file: "resumes/official-german-resume-demo.pdf",
    note: "Prepared for German and broader EU engineering applications",
    noteDe: "Vorbereitet fuer deutsche und weitere EU-Engineering-Bewerbungen",
    badge: "Deutsch"
  }
];

export const about = {
  description: "I am a Computer Science student specializing in backend engineering and AI systems. My focus is building dependable backend systems, asynchronous processing pipelines, and data systems designed for reliability." 
};

export const education = {
  degree: "B.Tech in Computer Science (Specialization: Machine Learning)",
  university: "Lovely Professional University, Ludhiana, India",
  cgpa: "7.7/10",
  duration: "2023 - Expected 2027",
  schoolEducation: [
    {
      level: "Senior Secondary School Certificate (12th Grade)",
      school: "Green Land Convent School",
      location: "Ludhiana, Punjab",
      year: "2023",
      scoreLabel: "Percentage",
      score: "80.6%",
      keySubjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
    },
    {
      level: "Secondary School Certificate (10th Grade)",
      school: "Green Land Convent School",
      location: "Ludhiana, Punjab",
      year: "2021",
      scoreLabel: "Percentage",
      score: "95.2%"
    }
  ],
  coursework: [
    "Data Structures & Algorithms",
    "Database Systems",
    "Cloud Computing",
    "Operating Systems"
  ]
};

export const skills = {
  "Programming": ["Python", "C++", "SQL"],
  "Backend": ["FastAPI", "REST APIs", "AsyncIO"],
  "Data": ["PostgreSQL", "Neo4j", "Redis"],
  "Infrastructure": ["Docker", "Kubernetes", "CI/CD"],
  "AI": ["Scikit-learn", "NLP pipelines"],
  "Testing": ["Pytest", "Integration testing"]
};

export const projects = [
  {
    id: 1,
    title: "InsightLens Backend",
    category: "Document Processing Backend",
    description: "Backend system for document ingestion, entity extraction, and relation mapping into Neo4j.",
    problem: "Document-heavy workflows lacked structured extraction and consistent downstream retrieval.",
    architecture: "FastAPI async workers, Neo4j graph schema, containerized deployment, and Pytest-based test suite.",
    decisions: [
      "Async-first pipeline to absorb bursty ingestion traffic",
      "Graph schema tuned for relation-centric traversal",
      "Containerized deployment strategy for predictable releases"
    ],
    tradeoffs: [
      "Higher operational complexity versus single-container simplicity",
      "Strict schema quality gates increased initial implementation time"
    ],
    outcome: "Delivered dependable high-concurrency extraction with more consistent query behavior and lower latency.",
    nextStep: "Add broader observability dashboards and extraction quality monitoring.",
    engineeringFocus: ["Async processing", "Data modeling", "System reliability", "Testing"],
    impact: ["88% test coverage", "~1.2s processing for 5MB+ files", "Reliable high-concurrency parsing"],
    techStack: ["Python", "FastAPI", "Neo4j", "Docker", "Kubernetes", "Pytest"],
    challenge: "Designing an efficient entity extraction pipeline that handles unstructured data while maintaining high test coverage and low latency.",
    github: "https://github.com/MasterAditya/insightlens-backend",
    demo: "",
    status: "Completed",
    year: "2025"
  },
  {
    id: 2,
    title: "Flokka Ingestion Pipeline (RAG)",
    category: "RAG Pipeline",
    description: "Ingestion pipeline for chunking, embedding, and retrieval indexing across large document collections.",
    problem: "Bulk ingestion workloads affected API responsiveness and made retrieval preparation inconsistent.",
    architecture: "Chunking and embedding workers with Redis queue isolation, ChromaDB indexing, and CI checks.",
    decisions: [
      "Background queue isolation to keep API responsiveness stable",
      "Semantic chunking strategy over fixed-length slicing",
      "Automated checks as merge-gate in CI"
    ],
    tradeoffs: [
      "Slightly longer ingestion windows for better retrieval quality",
      "More infra services to operate and monitor"
    ],
    outcome: "Established a reproducible ingestion flow with stable API behavior and structured validation in CI.",
    nextStep: "Introduce retrieval evaluation harness and broader integration test coverage.",
    engineeringFocus: ["Async processing", "Data modeling", "System reliability", "Testing"],
    impact: ["Handled 1000+ pages", "Non-blocking async background jobs", "Automated quality checks per PR"],
    techStack: ["Python", "ChromaDB", "Celery", "Redis", "GitHub Actions"],
    challenge: "Building a scalable ingestion system that handles large documents efficiently while maintaining reliable CI/CD pipelines.",
    github: "https://github.com/MasterAditya/flokka",
    demo: "",
    status: "Completed",
    year: "2025"
  },
  {
    id: 3,
    title: "RLIS - Rural Logistics Intelligence System (Punjab)",
    category: "GeoAI Backend",
    description: "Backend system and NLP pipeline for converting unstructured logistics logs into geospatial incident signals.",
    problem: "Operations teams needed incident context from free-text logs, not only vehicle location status.",
    architecture: "FastAPI services, PostgreSQL/PostGIS data layer, and hybrid NLP pipeline with deterministic safety logic.",
    decisions: [
      "Hybrid ML + deterministic override for safety-first critical event recall",
      "PostGIS-backed spatial indexing for geospatial incident lookups",
      "Glass Box explanation panel to increase operator trust"
    ],
    tradeoffs: [
      "Rule maintenance overhead to preserve deterministic safeguards",
      "Model simplicity favored low-latency interpretability over deep-model complexity"
    ],
    outcome: "Converted raw operational text into structured incident outputs with explainable severity classification.",
    nextStep: "Add live event streaming and stronger end-to-end backend monitoring.",
    engineeringFocus: ["Async processing", "Data modeling", "System reliability", "Testing"],
    impact: ["Parses rural Hinglish phrases like 'chakka jam' and 'fas gaya'", "Glass Box panel exposes AI reasoning for operator trust", "Severity-aware pulsing map gives real-time explainable incident awareness"],
    techStack: ["React", "Vite", "Mantine UI", "React-Leaflet", "Python", "FastAPI", "PostgreSQL", "PostGIS", "Scikit-learn", "Docker Compose"],
    challenge: "Building a safety-first hybrid intelligence engine that balances fast ML inference with deterministic overrides for critical event recall.",
    github: "https://github.com/MasterAditya/rlis-punjab",
    demo: "",
    status: "Completed",
    year: "2026"
  }
];

export const certifications = [
  {
    id: 1,
    name: "Neo4j Certified Developer",
    organization: "Neo4j",
    year: "2025",
    status: "In Progress"
  },
  {
    id: 2,
    name: "DevOps with Kubernetes",
    organization: "University of Helsinki",
    year: "2025",
    status: "In Progress"
  },
  {
    id: 3,
    name: "Full Stack Open",
    organization: "University of Helsinki",
    year: "2025",
    status: "In Progress"
  }
];

export const aiImpact = [
  {
    id: 1,
    title: "Processing Time",
    metric: "~1.2s",
    detail: "Measured document processing time for 5MB+ files in async pipeline runs."
  },
  {
    id: 2,
    title: "Test Coverage",
    metric: "88%",
    detail: "Coverage maintained on core backend modules with Pytest unit and integration tests."
  },
  {
    id: 3,
    title: "Dataset Size",
    metric: "1000+",
    detail: "Pages processed and indexed in backend ingestion workflows."
  }
];

export const engineeringReliability = [
  {
    id: 1,
    label: "Engineering Practice",
    metric: "CI workflows with automated testing",
    detail: "Pull requests run structured checks before merge."
  },
  {
    id: 2,
    label: "Engineering Practice",
    metric: "Containerized deployment pipelines",
    detail: "Services are packaged consistently for reproducible deployment."
  },
  {
    id: 3,
    label: "Engineering Practice",
    metric: "Async processing architecture",
    detail: "Background workers keep APIs responsive under ingestion load."
  },
  {
    id: 4,
    label: "Engineering Practice",
    metric: "Structured testing coverage",
    detail: "Unit and integration tests are maintained on core service paths."
  }
];

export const credibility = [
  {
    id: 1,
    title: "Technical Writing",
    detail: "Publishing implementation notes for RAG and backend architecture decisions."
  },
  {
    id: 2,
    title: "Open Source Readiness",
    detail: "Projects structured with reproducible setup, CI checks, and clear docs."
  },
  {
    id: 3,
    title: "Community Focus",
    detail: "Building systems around real operator workflows and domain feedback loops."
  }
];

export const achievements = [
  {
    id: 1,
    title: "Test coverage maintained across core backend systems",
    titleDe: "Testabdeckung in zentralen Backend-Systemen stabil gehalten",
    detail: "Maintained 88% unit and integration test coverage on service-critical paths using Pytest.",
    detailDe: "88% Unit- und Integrationstest-Abdeckung auf servicekritischen Pfaden mit Pytest gehalten.",
    year: "2025",
    proofLabel: "InsightLens Repository",
    proofLabelDe: "InsightLens Repository",
    proofUrl: "https://github.com/MasterAditya/insightlens-backend"
  },
  {
    id: 2,
    title: "Async architecture used to keep APIs responsive",
    titleDe: "Asynchrone Architektur fuer stabile API-Reaktionszeiten eingesetzt",
    detail: "Separated ingestion and processing into background workers to prevent API blocking under load.",
    detailDe: "Ingestion und Verarbeitung in Hintergrund-Worker getrennt, um API-Blockierung unter Last zu vermeiden.",
    year: "2025",
    proofLabel: "Flokka Repository",
    proofLabelDe: "Flokka Repository",
    proofUrl: "https://github.com/MasterAditya/flokka"
  },
  {
    id: 3,
    title: "Distributed processing applied for large document workloads",
    titleDe: "Verteilte Verarbeitung fuer grosse Dokument-Workloads umgesetzt",
    detail: "Used worker queues and containerized services for stable processing of 1000+ page corpora.",
    detailDe: "Worker-Queues und containerisierte Services fuer stabile Verarbeitung von 1000+ Seiten genutzt.",
    year: "2025",
    proofLabel: "Pipeline Repository",
    proofLabelDe: "Pipeline Repository",
    proofUrl: "https://github.com/MasterAditya/flokka"
  },
  {
    id: 4,
    title: "Performance improved through indexing and schema decisions",
    titleDe: "Performance durch Indexierung und Schema-Entscheidungen verbessert",
    detail: "Reduced high-volume query time from 240ms to 95ms via schema normalization and composite indexing.",
    detailDe: "Abfragezeit hoher Datenmengen durch Schema-Normalisierung und Composite-Indexing von 240ms auf 95ms reduziert.",
    year: "2025",
    proofLabel: "Case Study",
    proofLabelDe: "Fallstudie",
    proofUrl: "https://github.com/MasterAditya/insightlens-backend"
  }
];

export const complianceLinks = {
  privacyId: "privacy",
  legalId: "legal",
  privacyTitle: "Privacy Policy",
  legalTitle: "Legal Notice"
};

export const currentlyBuilding = [
  "CI/CD workflows for backend systems",
  "Containerized API deployments with reproducible environments",
  "Structured technical documentation for engineering handover"
];

export const projectFilters = ["All", "Document Processing Backend", "RAG Pipeline", "GeoAI Backend", "FastAPI", "Neo4j", "ChromaDB", "Kubernetes", "PostGIS"];

export const contact = {
  email: "aditya.828777@gmail.com",
  phone: "+91-7696983106",
  github: "https://github.com/MasterAditya",
  linkedin: "https://www.linkedin.com/in/ursadityasharma",
  location: "Ludhiana, Punjab, India",
  openTo: "Interested in Backend Engineering | AI Systems | Platform Engineering roles"
};

export const seo = {
  title: "Aditya Sharma | Backend Engineer and AI Systems Developer",
  description: "Engineering portfolio focused on backend systems, AI systems, reliability practices, and scalable APIs for European product environments.",
  image: "/og-banner.svg"
};
