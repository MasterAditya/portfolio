import { useEffect, useMemo, useState } from 'react';
import {
  personalInfo,
  about,
  projects,
  aiImpact,
  currentlyBuilding,
  projectFilters,
  resumeDocuments,
  engineeringReliability,
  credibility,
  complianceLinks,
  contact
} from '../data/portfolioData';
import { Github, Linkedin, Download, ArrowUpRight, CheckCircle2, Mail, Phone, ChevronDown } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';

const Home = ({ language }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(() =>
    personalInfo.heroStats.map(() => 0)
  );

  const copy = {
    en: {
      portfolioLabel: 'Backend Engineering Portfolio',
      viewProjects: 'View Engineering Projects',
      resume: 'Resume',
      contactMe: 'Contact Me',
      performanceSnapshot: 'Performance Snapshot',
      currentlyBuilding: 'Current Engineering Work',
      about: 'About',
      focus: 'Engineering Focus',
      principles: 'Engineering Principles',
      principlesHelper: 'Core practices behind how I design and ship backend systems',
      impact: 'System Metrics',
      reliability: 'Engineering Reliability',
      readiness: 'Engineering Practices',
      readinessHelper: 'Practical practices used in day-to-day backend delivery',
      resumeSection: 'Resumes',
      resumeHelper: 'University template and official CV versions',
      credibility: 'Documentation and Collaboration Signals',
      caseStudies: 'Backend Engineering Projects',
      filterHelper: 'Filter by stack or domain',
      euSignalOne: 'Interested in backend engineering environments common in German and European product teams.',
      workingLanguage: 'Working language: English | Learning German.',
      noMatch: 'No projects match this filter yet.',
      rights: 'All rights reserved.',
      policy: 'Privacy Policy',
      legal: 'Legal Notice'
    },
    de: {
      portfolioLabel: 'Backend-Engineering-Portfolio',
      viewProjects: 'Engineering-Projekte ansehen',
      resume: 'Lebenslauf',
      contactMe: 'Kontakt',
      performanceSnapshot: 'Leistungsueberblick',
      currentlyBuilding: 'Aktuelle Engineering-Arbeit',
      about: 'Ueber Mich',
      focus: 'Engineering-Fokus',
      principles: 'Engineering-Prinzipien',
      principlesHelper: 'Kernpraktiken, nach denen ich Backend-Systeme entwerfe und ausliefere',
      impact: 'Systemmetriken',
      reliability: 'Engineering-Zuverlaessigkeit',
      readiness: 'Engineering-Praktiken',
      readinessHelper: 'Praktische Arbeitsweisen fuer taegliche Backend-Umsetzung',
      resumeSection: 'Lebenslaeufe',
      resumeHelper: 'Universitaetsvorlage und offizielle CV-Versionen',
      credibility: 'Dokumentations- und Kollaborationssignale',
      caseStudies: 'Backend-Engineering-Projekte',
      filterHelper: 'Nach Stack oder Bereich filtern',
      euSignalOne: 'Interesse an Backend-Engineering-Umfeldern, wie sie in deutschen und europaeischen Produktteams ueblich sind.',
      workingLanguage: 'Arbeitssprache: Englisch | Deutsch im Aufbau.',
      noMatch: 'Keine Projekte entsprechen diesem Filter.',
      rights: 'Alle Rechte vorbehalten.',
      policy: 'Datenschutz',
      legal: 'Impressum'
    }
  };
  const t = copy[language];

  const localizedProfile = useMemo(() => {
    if (language === 'de') {
      return {
        title: 'Backend Engineer | KI-Systems-Entwickler',
        tagline: 'Fokus auf zuverlaessige Backend-Architektur und sauberes Systemdesign.',
        summary:
          'Ich entwickle Backend-Systeme fuer Dokumentenverarbeitung, KI-Pipelines und skalierbare APIs. Meine Arbeit legt den Fokus auf Zuverlaessigkeit, Testdisziplin und wartbare Architektur.',
        about:
          'Ich bin Informatikstudent mit Schwerpunkt Backend-Engineering und KI-Systeme. Mein Fokus liegt auf zuverlaessigen Backend-Systemen, asynchronen Verarbeitungs-Pipelines und Datensystemen mit klarem Zuverlaessigkeitsfokus.',
        focusAreas: ['Asynchrone Verarbeitung', 'Systemzuverlaessigkeit', 'Saubere Architektur', 'Testdisziplin'],
        currentlyBuilding: [
          'CI/CD-Workflows fuer Backend-Systeme',
          'Containerisierte API-Deployments mit reproduzierbaren Umgebungen',
          'Strukturierte technische Dokumentation fuer Engineering-Handover'
        ]
      };
    }

    return {
      title: personalInfo.title,
      tagline: personalInfo.tagline,
      summary: personalInfo.summary,
      about: about.description,
      focusAreas: personalInfo.focusAreas,
      currentlyBuilding
    };
  }, [language]);

  const localizedImpact = useMemo(() => {
    if (language !== 'de') {
      return aiImpact;
    }

    const de = {
      1: { title: 'Verarbeitungszeit', detail: 'Gemessene Dokumentenverarbeitung fuer 5MB+ Dateien in asynchronen Pipeline-Durchlaeufen.' },
      2: { title: 'Testabdeckung', detail: 'Abdeckung auf zentralen Backend-Modulen mit Pytest Unit- und Integrationstests.' },
      3: { title: 'Datensatzgroesse', detail: 'Verarbeitete und indizierte Seiten in Backend-Ingestion-Workflows.' }
    };

    return aiImpact.map((item) => ({
      ...item,
      title: de[item.id]?.title || item.title,
      detail: de[item.id]?.detail || item.detail
    }));
  }, [language]);

  const localizedProjects = useMemo(() => {
    if (language !== 'de') {
      return projects;
    }

    const de = {
      1: {
        description: 'Backend-System fuer Dokumenten-Ingestion, Entitaetenextraktion und Beziehungsabbildung in Neo4j.',
        problem: 'Dokumentenlastige Workflows hatten keine konsistente Extraktion und nachgelagerte Retrieval-Struktur.',
        architecture: 'FastAPI-Worker, Neo4j-Graph-Schema, containerisierte Auslieferung und Pytest-Testsuite.',
        impact: ['88% Testabdeckung', '~1.2s Verarbeitung fuer 5MB+ Dateien', 'Stabile Verarbeitung unter Parallel-Last'],
        decisions: [
          'Asynchrone Pipeline fuer Lastspitzen bei der Ingestion',
          'Graph-Schema fuer relationenorientierte Traversierung',
          'Containerisierte Releases fuer reproduzierbare Auslieferung'
        ],
        tradeoffs: [
          'Hoehere Betriebs-Komplexitaet gegenueber Single-Container-Ansatz',
          'Strenge Schema-Qualitaetspruefung erhoeht initialen Implementierungsaufwand'
        ],
        outcome: 'Zuverlaessige Extraktion unter Last mit konsistenteren Abfrageergebnissen und niedrigerer Latenz.',
        nextStep: 'Erweiterte Observability-Dashboards und Qualitaetsmonitoring fuer Extraktion.',
        status: 'Abgeschlossen',
        category: 'Document Processing Backend'
      },
      2: {
        description: 'Ingestion-Pipeline fuer Chunking, Embedding und Retrieval-Indizierung grosser Dokumentmengen.',
        problem: 'Hohe Ingestion-Last beeintraechtigte API-Reaktionszeiten und Konsistenz der Retrieval-Vorbereitung.',
        architecture: 'Chunking- und Embedding-Worker mit Redis-Queue-Isolation, ChromaDB-Indizierung und CI-Pruefungen.',
        impact: ['1000+ Seiten verarbeitet', 'Nicht-blockierende Hintergrundjobs', 'Automatisierte Qualitaetspruefung pro PR'],
        decisions: [
          'Isolierte Background-Queues fuer stabile API-Reaktionszeiten',
          'Semantisches Chunking statt fixer Zeichenlaenge',
          'Automatisierte Qualitaetspruefung als Merge-Gate'
        ],
        tradeoffs: [
          'Etwas laengere Ingestion-Zeit fuer bessere Retrieval-Qualitaet',
          'Mehr Infrastruktur-Komponenten fuer Betrieb und Monitoring'
        ],
        outcome: 'Reproduzierbarer Ingestion-Workflow mit stabilerem API-Verhalten und strukturierter CI-Validierung.',
        nextStep: 'Evaluations-Harness fuer Retrieval und breitere Integrationstests.',
        status: 'Abgeschlossen',
        category: 'RAG-Pipeline'
      },
      3: {
        description: 'Backend-System und NLP-Pipeline zur Umwandlung unstrukturierter Logistikmeldungen in georaeumliche Vorfallsignale.',
        problem: 'Betriebsteams brauchten Vorfallkontext aus Freitextlogs, nicht nur Positionsdaten.',
        architecture: 'FastAPI-Services, PostgreSQL/PostGIS-Datenebene und hybride NLP-Pipeline mit deterministischer Sicherheitslogik.',
        impact: ['Verarbeitet unstrukturierte Logistikmeldungen', 'Erklaerbare Klassifikation fuer Betriebsentscheidungen', 'Lagebild mit Schweregrad-Einstufung'],
        decisions: [
          'Hybrides ML plus deterministische Overrides fuer sicherheitskritische Recall-Ziele',
          'PostGIS-Indexierung fuer performante georaeumliche Vorfallabfragen',
          'Erklaerungspanel zur Nachvollziehbarkeit von Modellausgaben'
        ],
        tradeoffs: [
          'Regelpflege-Aufwand fuer robuste Sicherheitsheuristiken',
          'Bewusst einfaches Modell fuer Interpretierbarkeit und niedrige Latenz'
        ],
        outcome: 'Freitext-Meldungen werden in strukturierte Vorfallsignale mit erklaerbarer Schweregradklassifikation ueberfuehrt.',
        nextStep: 'Live-Event-Streaming und erweitertes End-to-End-Monitoring integrieren.',
        status: 'Abgeschlossen',
        category: 'GeoAI Backend'
      }
    };

    return projects.map((project) => ({
      ...project,
      ...(de[project.id] || {})
    }));
  }, [language]);

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setAnimatedStats(
        personalInfo.heroStats.map((item) => Number((item.target * progress).toFixed(item.decimals ?? 0)))
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  const formatStat = (item, value) => {
    const decimals = item.decimals ?? 0;
    const formattedValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
    return `${item.prefix ?? ''}${formattedValue}${item.suffix ?? ''}`;
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return localizedProjects;
    }

    return localizedProjects.filter(
      (project) =>
        project.category === activeFilter ||
        project.techStack.includes(activeFilter)
    );
  }, [activeFilter, localizedProjects]);

  const getFilterLabel = (filter) => {
    if (language !== 'de') {
      return filter;
    }

    const map = {
      All: 'Alle',
      'Document Processing Backend': 'Dokumentenverarbeitungs-Backend',
      'RAG Pipeline': 'RAG-Pipeline',
      'GeoAI Backend': 'GeoKI-Backend'
    };

    return map[filter] || filter;
  };

  const localizedReliability = useMemo(() => {
    if (language !== 'de') {
      return engineeringReliability;
    }

    const labels = {
      'Engineering Practice': 'Engineering-Praktik',
      'CI workflows with automated testing': 'CI-Workflows mit automatisierten Tests',
      'Containerized deployment pipelines': 'Containerisierte Deployment-Pipelines',
      'Async processing architecture': 'Asynchrone Verarbeitungsarchitektur',
      'Structured testing coverage': 'Strukturierte Testabdeckung',
      'Pull requests run structured checks before merge.': 'Pull Requests durchlaufen strukturierte Pruefungen vor dem Merge.',
      'Services are packaged consistently for reproducible deployment.': 'Services werden konsistent verpackt fuer reproduzierbare Deployments.',
      'Background workers keep APIs responsive under ingestion load.': 'Hintergrund-Worker halten APIs unter Ingestion-Last reaktionsfaehig.',
      'Unit and integration tests are maintained on core service paths.': 'Unit- und Integrationstests werden auf zentralen Service-Pfaden gepflegt.'
    };

    return engineeringReliability.map((item) => ({
      ...item,
      label: labels[item.label] || item.label,
      metric: labels[item.metric] || item.metric,
      detail: labels[item.detail] || item.detail
    }));
  }, [language]);

  const engineeringPrinciples = useMemo(() => {
    if (language === 'de') {
      return [
        'Testgetriebene Entwicklungs-Denkweise',
        'Observability-orientiertes Backend-Design',
        'Datenschutzbewusste Datenverarbeitung',
        'Reproduzierbare Deployments',
        'Dokumentationsorientierte Entwicklung'
      ];
    }

    return [
      'Test-driven development mindset',
      'Observability-first backend design',
      'Privacy-aware data processing',
      'Reproducible deployments',
      'Documentation-first development'
    ];
  }, [language]);

  const engineeringReadiness = useMemo(() => {
    if (language === 'de') {
      return [
        'Setzt CI/CD-Workflows in Projekten praktisch ein',
        'Entwickelt containerisierte Services',
        'Folgt strukturierten Testpraktiken',
        'Pflegt reproduzierbare Projekt-Setups',
        'Schreibt technische Dokumentation fuer Uebergaben'
      ];
    }

    return [
      'Practices CI/CD workflows',
      'Builds containerized services',
      'Follows structured testing practices',
      'Maintains reproducible project setups',
      'Writes technical documentation'
    ];
  }, [language]);

  const engineeringFocus = useMemo(() => {
    if (language === 'de') {
      return [
        'Backend-Systeme',
        'KI-Systeme',
        'Verteilte Verarbeitung',
        'Datenengineering',
        'Systemzuverlaessigkeit'
      ];
    }

    return [
      'Backend Systems',
      'AI Systems',
      'Distributed Processing',
      'Data Engineering',
      'System Reliability'
    ];
  }, [language]);

  return (
    <div className="pt-16">
      <section id="home" className="min-h-screen flex items-center euro-grid relative overflow-hidden section-reveal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div className="max-w-3xl">
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="mono text-xs uppercase tracking-[0.2em] text-[var(--primary)]">{t.portfolioLabel}</p>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/My Image.jpg"
                  alt="Portrait of Aditya Sharma"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  className="rounded-2xl w-24 h-24 md:w-28 md:h-28 object-cover ring-2 ring-[var(--border)]"
                />
                <div>
                  <p className="mono text-sm text-gray-600">{personalInfo.location}</p>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                {personalInfo.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-3">
                {localizedProfile.title}
              </p>
              <p className="text-lg text-gray-700 mb-6">{localizedProfile.tagline}</p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {localizedProfile.summary}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {localizedProfile.focusAreas.map((item) => (
                  <span key={item} className="mono chip">
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="btn-accent inline-flex items-center gap-2"
                >
                  {t.viewProjects} <ArrowUpRight size={18} />
                </a>
                <div
                  className="relative"
                  onMouseEnter={() => setContactMenuOpen(true)}
                  onMouseLeave={() => setContactMenuOpen(false)}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={contactMenuOpen}
                    onClick={() => setContactMenuOpen((prev) => !prev)}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    {t.contactMe}
                    <ChevronDown size={16} />
                  </button>

                  {contactMenuOpen && (
                    <div
                      role="menu"
                      className="absolute left-0 mt-2 w-56 rounded-xl border border-[var(--border)] bg-[var(--card)] z-30 p-2"
                    >
                      <a
                        href={`mailto:${contact.email}`}
                        role="menuitem"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-primary)] hover:bg-[#f3f4f6]"
                      >
                        <Mail size={16} className="icon-primary" />
                        {language === 'de' ? 'E-Mail senden' : 'Send Email'}
                      </a>
                      <a
                        href={`tel:${contact.phone}`}
                        role="menuitem"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-primary)] hover:bg-[#f3f4f6]"
                      >
                        <Phone size={16} className="icon-primary" />
                        {language === 'de' ? 'Anrufen' : 'Call'}
                      </a>
                      <a
                        href={contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-primary)] hover:bg-[#f3f4f6]"
                      >
                        <Github size={16} className="icon-primary" />
                        GitHub
                      </a>
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-primary)] hover:bg-[#f3f4f6]"
                      >
                        <Linkedin size={16} className="icon-primary" />
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
                <a
                  href={resumeDocuments[1].file}
                  download
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Download size={20} />
                  {t.resume}
                </a>
              </div>
            </div>

            <div className="card card-accent">
              <p className="mono text-xs uppercase tracking-widest text-gray-500 mb-5">{t.performanceSnapshot}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {personalInfo.heroStats.map((item, index) => (
                  <div key={item.label} className="card">
                    <p className="mono text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="text-2xl font-semibold text-gray-900">{formatStat(item, animatedStats[index])}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-[var(--secondary)] text-white p-6">
                <p className="mono text-xs uppercase tracking-wider mb-2 text-gray-300">{t.currentlyBuilding}</p>
                <ul className="space-y-2 text-sm">
                  {localizedProfile.currentlyBuilding.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="mt-0.5 icon-action" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-[var(--background)] section-reveal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">{t.about}</h2>
          <div className="max-w-4xl mx-auto card">
            <p className="text-lg text-gray-700 leading-relaxed">
              {localizedProfile.about}
            </p>
            <div className="mt-6 pt-6 border-t border-stone-200">
              <p className="text-sm text-gray-600">{t.euSignalOne}</p>
              <p className="text-sm text-gray-600 mt-1">{t.workingLanguage}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="focus" className="py-20 bg-[var(--background)] section-reveal" aria-labelledby="focus-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="focus-heading" className="section-title">{t.focus}</h2>
          <div className="max-w-4xl mx-auto flex flex-wrap gap-3 justify-center">
            {engineeringFocus.map((item) => (
              <span key={item} className="mono chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="principles" className="py-20 bg-[var(--background)] section-reveal" aria-labelledby="principles-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="principles-heading" className="section-title">{t.principles}</h2>
          <p className="section-subtitle">{t.principlesHelper}</p>
          <div className="max-w-4xl mx-auto card">
            <ul className="grid md:grid-cols-2 gap-3">
              {engineeringPrinciples.map((item) => (
                <li key={item} className="text-sm text-[var(--text-primary)] border border-[var(--border)] rounded-lg px-4 py-3 bg-[var(--card)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="resume" className="py-20 bg-[var(--background)] section-reveal" aria-labelledby="resume-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="resume-heading" className="section-title">{t.resumeSection}</h2>
          <p className="section-subtitle">{t.resumeHelper}</p>

          <div className="grid md:grid-cols-3 gap-6">
            {resumeDocuments.map((doc) => (
              <div key={doc.id} className="card overflow-hidden flex flex-col h-full">
                <div className="px-6 pt-6 pb-3 bg-[var(--card)] border-b border-[var(--border)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block px-3 py-1 bg-[var(--primary)] text-white text-xs font-semibold rounded-full">
                      {doc.badge}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--primary)]">
                    {language === 'de' ? doc.useCaseDe : doc.useCase}
                  </p>
                </div>

                <div className="px-6 py-4 flex-grow">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {language === 'de' ? doc.labelDe : doc.label}
                  </p>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {language === 'de' ? doc.contextDe : doc.context}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    {language === 'de' ? doc.noteDe : doc.note}
                  </p>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-[var(--border)]">
                  <a
                    href={doc.file}
                    download
                    className="w-full btn-secondary inline-flex items-center justify-center gap-2 text-sm"
                  >
                    <Download size={16} />
                    {language === 'de' ? 'PDF Herunterladen' : 'Download PDF'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--background)] section-reveal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">{t.impact}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {localizedImpact.map((item) => (
              <div key={item.id} className="card">
                <p className="mono text-xs text-gray-500 uppercase tracking-widest mb-2">{item.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{item.metric}</p>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--background)] section-reveal" aria-labelledby="reliability-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="reliability-heading" className="section-title">{t.reliability}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {localizedReliability.map((item) => (
              <article key={item.id} className="card">
                <p className="mono text-xs uppercase tracking-widest text-gray-500 mb-2">{item.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{item.metric}</p>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Education language={language} />
      <Skills language={language} />

      <section id="readiness" className="py-20 bg-[var(--secondary)] section-reveal" aria-labelledby="readiness-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="readiness-heading" className="section-title text-white">{t.readiness}</h2>
          <p className="section-subtitle text-gray-300">{t.readinessHelper}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {engineeringReadiness.map((item) => (
              <article key={item} className="rounded-xl border border-white/20 bg-white/5 p-6">
                <p className="text-sm text-gray-100">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-[var(--background)] section-reveal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="section-title section-title-left mb-0">{t.caseStudies}</h2>
            <p className="mono text-xs text-gray-500 uppercase tracking-widest">{t.filterHelper}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`mono text-xs px-3 py-2 rounded-full border ${
                  activeFilter === filter
                    ? 'bg-[var(--secondary)] text-white border-[var(--secondary)]'
                    : 'bg-[var(--card)] text-[var(--text-primary)] border-[var(--secondary)] hover:bg-[#f3f4f6] hover:border-[var(--primary)]'
                }`}
              >
                {getFilterLabel(filter)}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} language={language} />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <p className="text-sm text-gray-500 mt-6">{t.noMatch}</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-[var(--background)] section-reveal" aria-labelledby="credibility-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="credibility-heading" className="section-title">{t.credibility}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {credibility.map((item) => (
              <article key={item.id} className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Certifications language={language} />
      <Achievements language={language} />
      <Contact language={language} />

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. {t.rights}</p>
          <div className="mt-3 flex items-center justify-center gap-6 text-sm">
            <a href={`#${complianceLinks.privacyId}`} className="text-gray-300 hover:text-white">
              {t.policy}
            </a>
            <a href={`#${complianceLinks.legalId}`} className="text-gray-300 hover:text-white">
              {t.legal}
            </a>
          </div>
        </div>
      </footer>

      <section id={complianceLinks.privacyId} className="py-20 bg-[var(--background)] section-reveal" aria-labelledby="privacy-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="privacy-heading" className="text-2xl font-semibold text-gray-900 mb-4">{t.policy}</h2>
          <p className="text-gray-700 leading-relaxed">
            {language === 'de'
              ? 'Diese Website verarbeitet keine personenbezogenen Daten fuer Analysezwecke ohne Zustimmung. Externe Links zu GitHub und LinkedIn unterliegen den Datenschutzrichtlinien der jeweiligen Plattformen.'
              : 'This website does not process personal analytics data without consent. External links to GitHub and LinkedIn are governed by the privacy policies of those platforms.'}
          </p>
        </div>
      </section>

      <section id={complianceLinks.legalId} className="py-20 bg-[var(--background)] section-reveal" aria-labelledby="legal-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="legal-heading" className="text-2xl font-semibold text-gray-900 mb-4">{t.legal}</h2>
          <p className="text-gray-700 leading-relaxed">
            {language === 'de'
              ? 'Inhaltlich verantwortlich: Aditya Sharma. Kontakt: aditya.828777@gmail.com. Diese Seite dient der beruflichen Darstellung von Projekten, Forschung und Engineering-Erfahrung.'
              : 'Responsible for content: Aditya Sharma. Contact: aditya.828777@gmail.com. This website is intended for professional presentation of projects, research, and engineering experience.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
