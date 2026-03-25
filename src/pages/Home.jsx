import { useEffect, useMemo, useState, useRef } from 'react';
import {
  personalInfo,
  projects,
  resumeDocuments,
  contact
} from '../data/portfolioData';
import { Github, Linkedin, Download, ArrowUpRight, CheckCircle2, Mail, Phone, ChevronDown } from 'lucide-react';
import { skills } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import ProjectDetailView from '../components/ProjectDetailView';
import EngineeeringCapabilities from '../components/EngineeeringCapabilities';
import CollapsibleFooterSection from '../components/CollapsibleFooterSection';
import HumanCheckModal from '../components/HumanCheckModal';

const Home = ({ language }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(() =>
    personalInfo.heroStats.map(() => 0)
  );
  const [verificationRequest, setVerificationRequest] = useState(null);
  const contactMenuRef = useRef(null);

  // Handle click outside to close contact menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target)) {
        setContactMenuOpen(false);
      }
    };

    if (contactMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [contactMenuOpen]);

  const copy = {
    en: {
      portfolioLabel: 'Backend Engineering Portfolio',
      viewProjects: 'Explore Projects',
      contactMe: 'Contact',
      performanceSnapshot: 'Performance Snapshot',
      noMatch: 'No projects found.',
      rights: 'All rights reserved.',
      policy: 'Privacy Policy',
      legal: 'Legal Notice',
      resumeSection: 'Resumes',
      resumeHelper: 'University template and official CV versions',
      otherProjects: 'Other Projects',
      skillsSection: 'Skills & Expertise',
      skillsHelper: 'Core backend systems, AI/ML, and reliable infrastructure',
      exploreFull: 'Explore Full Skills',
      availability: 'Open to Opportunities',
      availabilityDesc: 'Backend Engineering • AI Systems • Platform Engineering'
    },
    de: {
      portfolioLabel: 'Backend-Engineering-Portfolio',
      viewProjects: 'Projekte erkunden',
      contactMe: 'Kontakt',
      performanceSnapshot: 'Leistungsüberblick',
      noMatch: 'Keine Projekte gefunden.',
      rights: 'Alle Rechte vorbehalten.',
      policy: 'Datenschutz',
      legal: 'Impressum',
      resumeSection: 'Lebensläufe',
      resumeHelper: 'Universitätsvorlage und offizielle CV-Versionen',
      otherProjects: 'Weitere Projekte',
      skillsSection: 'Fähigkeiten & Expertise',
      skillsHelper: 'Kern-Backend-Systeme, KI/ML und zuverlässige Infrastruktur',
      exploreFull: 'Vollständige Fähigkeiten erkunden',
      availability: 'Offen für Gelegenheiten',
      availabilityDesc: 'Backend-Engineering • KI-Systeme • Plattform-Technik'
    }
  };

  const t = copy[language] || copy.en;

  const withBaseUrl = (path) => {
    if (!path) return path;
    if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
    return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
  };

  const localizedProjects = useMemo(() => {
    if (language !== 'de') {
      return projects;
    }
    return projects.map((project) => ({
      ...project,
      title: project.titleDe || project.title,
      description: project.descriptionDe || project.description,
    }));
  }, [language]);

  const featuredProject = useMemo(
    () => localizedProjects.find((project) => project.id === 2),
    [localizedProjects]
  );

  const otherProjects = useMemo(() => {
    return localizedProjects.filter((project) => project.id !== 2);
  }, [localizedProjects]);

  // Animation
  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setAnimatedStats(
        personalInfo.heroStats.map((item) => (item.target || 0) * progress)
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

  const requestPhoneAccess = () => {
    setContactMenuOpen(false);
    setVerificationRequest({ type: 'phone' });
  };

  const requestResumeDownload = (doc) => {
    setVerificationRequest({ type: 'resume', doc });
  };

  const handleVerifiedAccess = () => {
    if (!verificationRequest) {
      return;
    }

    if (verificationRequest.type === 'phone') {
      window.location.href = `tel:${contact.phone}`;
      return;
    }

    if (verificationRequest.type === 'resume' && verificationRequest.doc) {
      const filePath = withBaseUrl(verificationRequest.doc.file);
      const link = document.createElement('a');
      link.href = filePath;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white relative">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,_var(--border)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-[0.02]"></div>
      
      <div className="relative z-0">
      {/* HOME SECTION - Intro with scrollable content */}
      <section id="home" className="relative min-h-screen bg-gradient-to-br from-[var(--background)] via-white to-[var(--primary)]/5 overflow-hidden">
        {/* Parallax background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center min-h-[560px] lg:min-h-[600px]">
              <div className="max-w-3xl space-y-6">
                <p className="mono text-xs uppercase tracking-[0.2em] text-[var(--primary)] mb-4 animate-fadeIn">{t.portfolioLabel}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 group text-center sm:text-left">
                  <img
                    src={`${import.meta.env.BASE_URL}My Image.jpg`}
                    alt={`Portrait of ${personalInfo.name}`}
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                    className="rounded-2xl w-20 h-20 md:w-24 md:h-24 object-cover ring-2 ring-[var(--border)] group-hover:ring-[var(--primary)] transition-all duration-300 transform group-hover:scale-105"
                  />
                  <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{personalInfo.name}</h1>
                    <p className="text-sm text-[var(--primary)] mono mt-2 font-semibold">{personalInfo.location}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 font-semibold">
                    Backend Engineer • AI Systems
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {language === 'de'
                      ? 'Ich entwickle skalierbare Backend-Systeme mit Fokus auf Dokumentenverarbeitung, KI-Pipelines und zuverlässige APIs. Spezialisiert auf asynchrone Architekturen, Hybrid-ML und Production-Ready Code.'
                      : 'Building reliable backend systems for document processing, AI pipelines, and scalable APIs. Specialized in async architectures, hybrid ML, and production-grade infrastructure.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'PostgreSQL', 'Python', 'Docker', 'Redis', 'NLP', 'PostGIS'].map((skill) => (
                    <span key={skill} className="mono chip text-xs bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 hover:from-[var(--primary)]/20 hover:to-[var(--secondary)]/20 transition-all">{skill}</span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-4">
                  <a href="#featured" className="btn-accent inline-flex items-center gap-2 hover:shadow-lg transition-all">
                    {t.viewProjects} <ArrowUpRight size={18} />
                  </a>
                  <div className="relative" ref={contactMenuRef}>
                    <button
                      type="button"
                      onClick={() => setContactMenuOpen((prev) => !prev)}
                      className="btn-secondary inline-flex items-center gap-2 hover:shadow-lg transition-all"
                    >
                      {t.contactMe}
                      <ChevronDown size={16} className={`transition-transform ${contactMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {contactMenuOpen && (
                      <div className="absolute left-0 mt-2 w-56 rounded-xl border border-[var(--border)] bg-white z-30 p-2 shadow-xl animate-in fade-in slide-in-from-top-2">
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-900 hover:bg-[var(--primary)]/10 transition-colors">
                          <Mail size={16} className="text-[var(--primary)]" />
                          Email
                        </a>
                        <button
                          type="button"
                          onClick={requestPhoneAccess}
                          className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-900 hover:bg-[var(--primary)]/10 transition-colors"
                        >
                          <Phone size={16} className="text-[var(--primary)]" />
                          Call
                        </button>
                        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-900 hover:bg-[var(--primary)]/10 transition-colors">
                          <Github size={16} className="text-[var(--primary)]" />
                          GitHub
                        </a>
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-900 hover:bg-[var(--primary)]/10 transition-colors">
                          <Linkedin size={16} className="text-[var(--primary)]" />
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>


              </div>

              {/* Stats Card with Glassmorphism */}
              <div className="card card-accent border border-white/20 backdrop-blur-xl bg-white/80 hover:bg-white/90 transition-all">
                <p className="mono text-xs uppercase tracking-widest text-gray-500 mb-6 font-semibold">{t.performanceSnapshot}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {personalInfo.heroStats.map((item, index) => (
                    <div key={item.label} className="card bg-gradient-to-br from-white to-gray-50 hover:from-[var(--primary)]/5 hover:to-[var(--secondary)]/5 transition-all">
                      <p className="mono text-xs text-gray-500 font-semibold uppercase mb-2">{item.label}</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                        {formatStat(item, animatedStats[index])}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      {featuredProject && (
        <section id="featured" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-[var(--background)] to-white relative overflow-hidden border-b-2 border-[var(--border)]/30">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold mb-4 animate-fadeIn">{language === 'de' ? 'Flaggschiff-System' : 'FLAGSHIP SYSTEM'}</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Curious details & teaser */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">{featuredProject.title}</h2>
                
                {/* Curiosity-raising stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredProject.impact?.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="card bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/5 hover:from-[var(--primary)]/20 hover:to-[var(--secondary)]/10 transition-all border border-[var(--primary)]/20">
                      <p className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                        {item.split(' ')[0]}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{item.split(' ').slice(1).join(' ')}</p>
                    </div>
                  ))}
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">{featuredProject.description}</p>

                <div className="flex flex-wrap gap-2">
                  {(featuredProject.techStack || []).slice(0, 8).map((tech) => (
                    <span key={tech} className="mono chip text-xs bg-white border border-[var(--primary)]/30 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all">{tech}</span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-4">
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Github size={16} />
                    {language === 'de' ? 'GitHub' : 'View GitHub'}
                  </a>
                  <button onClick={() => setSelectedProject(featuredProject)} className="btn-accent inline-flex items-center gap-2 hover:shadow-lg transition-all">
                    {language === 'de' ? 'Case Study' : 'Read Full Case Study'} <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

              {/* Right: Project Card */}
              <div className="flex flex-col gap-4">
                <ProjectCard project={featuredProject} language={language} detailed={false} />
              </div>
            </div>

            {/* Link to Full Case Study */}
            <div className="mt-12 pt-12 border-t border-[var(--border)]/30">
              <a href="#/flokka-details" className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors font-semibold">
                {language === 'de' ? 'Vollständige Case Study ansehen' : 'View Full Case Study'} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-[var(--background)] relative border-b-2 border-[var(--border)]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold mb-4">{language === 'de' ? 'Fähigkeiten' : 'ENGINEERING SKILLS'}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">{t.skillsSection}</h2>
          <p className="text-lg text-gray-600 mb-12">{t.skillsHelper}</p>

          {/* Core Skills Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="card bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/5 border border-[var(--primary)]/20 hover:border-[var(--primary)]/50 transition-all p-6">
                <h3 className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider mb-3">{category}</h3>
                <div className="space-y-2">
                  {skillList.slice(0, 3).map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
                      {skill}
                    </div>
                  ))}
                  {skillList.length > 3 && (
                    <div className="text-xs text-gray-500 pt-2">+{skillList.length - 3} more</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA to Skills Page */}
          <a href="#/skills" className="inline-block">
            <button className="btn-accent inline-flex items-center gap-2 hover:shadow-lg transition-all">
              {t.exploreFull} <ArrowUpRight size={16} />
            </button>
          </a>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-[var(--background)] relative border-b-2 border-[var(--border)]/30">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)]/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold mb-4">{language === 'de' ? 'Weitere Systeme' : 'Other Systems'}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-10 sm:mb-12">{t.otherProjects}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl h-full">
                  {/* Compact Immersive Card */}
                  <div className="card bg-gradient-to-br from-white to-gray-50 h-full hover:from-[var(--primary)]/10 hover:to-[var(--secondary)]/5 transition-all border hover:border-[var(--primary)]/30 flex flex-col p-6">
                    {/* Status badge */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-block px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold rounded-full">
                        {project.status}
                      </span>
                      <span className="text-xs text-gray-500">{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Category */}
                    <p className="text-xs uppercase tracking-wider text-[var(--primary)] font-semibold mb-3">{project.category}</p>

                    {/* Curious Detail - First line of description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                      {project.description}
                    </p>

                    {/* Key Stat */}
                    {project.impact && project.impact[0] && (
                      <div className="mb-4 p-3 bg-white rounded-lg border border-[var(--primary)]/20 group-hover:border-[var(--primary)]/50 transition-colors">
                        <p className="text-xs text-gray-500 mb-1">Highlight</p>
                        <p className="text-sm font-bold text-[var(--primary)] truncate">
                          {project.impact[0]}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack Teaser */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(project.techStack || []).slice(0, 4).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-colors">
                          {tech}
                        </span>
                      ))}
                      {project.techStack && project.techStack.length > 4 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">+{project.techStack.length - 4}</span>
                      )}
                    </div>

                    {/* View Details Button */}
                    <button className="w-full py-2 px-3 rounded-lg border border-[var(--primary)]/30 text-[var(--primary)] text-sm font-semibold hover:bg-[var(--primary)]/10 transition-all group-hover:border-[var(--primary)]/60 flex items-center justify-center gap-2">
                      View Details <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section id="capabilities" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-[var(--background)] to-white relative border-b-2 border-[var(--border)]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="relative z-10">
          <EngineeeringCapabilities language={language} />
        </div>
      </section>

      {/* RESUME SECTION */}
      <section id="resume" className="py-20 sm:py-24 lg:py-32 bg-white relative border-b-2 border-[var(--border)]/30">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)]/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold mb-4">{language === 'de' ? 'Dokumentation' : 'DOCUMENTATION'}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">{t.resumeSection}</h2>
          <p className="text-lg text-gray-600 mb-16">{t.resumeHelper}</p>

          {/* Compact Timeline View */}
          <div className="space-y-4 mb-20">
            {resumeDocuments.map((doc, idx) => (
              <div key={doc.id} className="group relative overflow-hidden">
                <button
                  type="button"
                  onClick={() => requestResumeDownload(doc)}
                  className="w-full text-left flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-4 rounded-lg border-l-4 border-[var(--primary)] bg-gradient-to-r from-[var(--primary)]/5 to-transparent hover:from-[var(--primary)]/10 transition-all duration-300"
                >
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center min-w-fit">
                    <span className="inline-block px-2 py-1 bg-[var(--primary)] text-white text-xs font-bold rounded-full">{doc.badge}</span>
                    <div className="w-1 h-8 bg-gradient-to-b from-[var(--primary)] to-transparent mt-2"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--primary)] mb-1 uppercase tracking-wide">{language === 'de' ? doc.useCaseDe : doc.useCase}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[var(--primary)] transition-colors">
                      {language === 'de' ? doc.labelDe : doc.label}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{language === 'de' ? doc.contextDe : doc.context}</p>
                  </div>

                  {/* Download icon */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <Download size={20} className="text-[var(--primary)] group-hover:scale-125 transition-transform" />
                  </div>
                </button>
              </div>
            ))}
          </div>

          <Certifications language={language} />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-[var(--background)] to-white relative border-b-2 border-[var(--border)]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="relative z-10">
          <Contact language={language} onPhoneAction={requestPhoneAccess} />
        </div>
      </section>

      <HumanCheckModal
        open={Boolean(verificationRequest)}
        onClose={() => setVerificationRequest(null)}
        onVerified={handleVerifiedAccess}
        actionKey={verificationRequest?.type === 'resume' ? 'resume-download' : 'phone-reveal'}
        actionLabel={verificationRequest?.type === 'resume'
          ? (language === 'de' ? 'Lebenslauf herunterladen' : 'Download resume')
          : (language === 'de' ? 'Telefon anzeigen' : 'Reveal phone')}
        language={language}
      />

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectDetailView project={selectedProject} language={language} onClose={() => setSelectedProject(null)} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-2">{personalInfo.name}</h3>
              <p className="text-gray-400 text-sm">{personalInfo.title}</p>
              <p className="text-gray-500 text-sm mt-2">{personalInfo.location}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-4">{language === 'de' ? 'Arbeitssprache' : 'Working Language'}</p>
              <p className="text-white font-semibold">English • {language === 'de' ? 'Deutsch im Aufbau' : 'Learning German'}</p>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-6">
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors duration-300 p-2 rounded-lg hover:bg-white/5">
                <Github size={24} />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--primary)] transition-colors duration-300 p-2 rounded-lg hover:bg-white/5">
                <Linkedin size={24} />
              </a>
              <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-[var(--primary)] transition-colors duration-300 p-2 rounded-lg hover:bg-white/5">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Compliance Sections - Much Better Visibility */}
          <div className="border-t border-gray-800 pt-12 space-y-6">
            <CollapsibleFooterSection
              title={t.policy}
              content={language === 'de'
                ? 'Diese Website verarbeitet keine personenbezogenen Daten für Analysezwecke ohne Zustimmung. Externe Links zu GitHub und LinkedIn unterliegen den Datenschutzrichtlinien der jeweiligen Plattformen.'
                : 'This website does not process personal analytics data without consent. External links to GitHub and LinkedIn are governed by the privacy policies of those platforms.'}
              isOpen={privacyOpen}
              onToggle={() => setPrivacyOpen(!privacyOpen)}
            />
            <CollapsibleFooterSection
              title={t.legal}
              content={language === 'de'
                ? 'Inhaltlich verantwortlich: Aditya Sharma. Kontakt: aditya.828777@gmail.com. Diese Seite dient der beruflichen Darstellung von Projekten, Forschung und Engineering-Erfahrung.'
                : 'Responsible for content: Aditya Sharma. Contact: aditya.828777@gmail.com. This website is intended for professional presentation of projects, research, and engineering experience.'}
              isOpen={legalOpen}
              onToggle={() => setLegalOpen(!legalOpen)}
            />
          </div>

          <div className="text-center mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} {personalInfo.name}. {t.rights}</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Home;
