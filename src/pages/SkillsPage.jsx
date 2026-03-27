import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { skills } from '../data/portfolioData';

const SCROLL_TARGET_KEY = 'portfolio:scrollTarget';

const SkillsPage = ({ language, experienceMode = 'recruiter' }) => {
  const copy = {
    en: {
      backToPortfolio: 'Back to Portfolio',
      title: 'Engineering Skills & Experience',
      subtitle: 'Backend systems, AI/ML, and reliable infrastructure. Specialized in async architectures and production-grade code.',
      focused: 'Deeply Focused',
      familiar: 'Actively Used',
      explored: 'Explored & Learned',
      coreStack: 'Core Stack',
      aiSystems: 'AI Systems',
      engineering: 'Engineering & DevOps',
      practices: 'Engineering Practices',
      testing: 'Testing Discipline',
      async: 'Async-First Architecture',
      reliability: 'System Reliability',
      clean: 'Clean Architecture',
      description: 'Emphasis on building systems that are tested, documented, and maintainable for production environments.'
    },
    de: {
      backToPortfolio: 'Zurück zum Portfolio',
      title: 'Engineering-Fähigkeiten & Erfahrung',
      subtitle: 'Backend-Systeme, KI/ML und zuverlässige Infrastruktur. Spezialisiert auf asynchrone Architekturen und produktionsreife Code.',
      focused: 'Tief fokussiert',
      familiar: 'Aktiv verwendet',
      explored: 'Erkundet & gelernt',
      coreStack: 'Kern-Stack',
      aiSystems: 'KI-Systeme',
      engineering: 'Engineering & DevOps',
      practices: 'Engineering-Praktiken',
      testing: 'Test-Disziplin',
      async: 'Async-First Architektur',
      reliability: 'System-Zuverlässigkeit',
      clean: 'Saubere Architektur',
      description: 'Schwerpunkt auf den Aufbau von Systemen, die getestet, dokumentiert und wartbar für Produktionsumgebungen sind.'
    }
  };

  const t = copy[language] || copy.en;

  const practicesData = [
    { label: t.testing, description: language === 'de' ? 'High coverage, Pytest-based suites, integration tests' : 'High coverage, Pytest-based suites, integration tests' },
    { label: t.async, description: language === 'de' ? 'AsyncIO, Celery, Queue-based workers' : 'AsyncIO, Celery, Queue-based workers' },
    { label: t.reliability, description: language === 'de' ? 'Graceful degradation, monitoring, CI/CD gates' : 'Graceful degradation, monitoring, CI/CD gates' },
    { label: t.clean, description: language === 'de' ? 'SOLID principles, modular design, clear APIs' : 'SOLID principles, modular design, clear APIs' }
  ];

  const goToContactOnHome = () => {
    sessionStorage.setItem(SCROLL_TARGET_KEY, 'contact');
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-white pt-14 sm:pt-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-[var(--background)] to-white border-b border-[var(--border)]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <a
            href="#/"
            className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            {t.backToPortfolio}
          </a>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        {/* Core Stack */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">{t.focused}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{t.coreStack}</h2>
            <p className="text-gray-600 mt-2">Primary languages and frameworks used in production systems</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skills["Core Stack"].map((skill) => (
              <div
                key={skill}
                className="card bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/5 border border-[var(--primary)]/20 hover:border-[var(--primary)]/50 transition-all p-4 flex items-center gap-3"
              >
                <CheckCircle2 size={20} className="text-[var(--primary)] flex-shrink-0" />
                <span className="font-semibold text-gray-900">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Systems */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">{t.familiar}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{t.aiSystems}</h2>
            <p className="text-gray-600 mt-2">Machine learning frameworks and NLP pipelines</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills["AI Systems"].map((skill) => (
              <div
                key={skill}
                className="card bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--primary)]/5 border border-[var(--secondary)]/20 hover:border-[var(--secondary)]/50 transition-all p-4 flex items-center gap-3"
              >
                <CheckCircle2 size={20} className="text-[var(--secondary)] flex-shrink-0" />
                <span className="font-semibold text-gray-900">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering & DevOps */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">{t.focused}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{t.engineering}</h2>
            <p className="text-gray-600 mt-2">DevOps, testing, and deployment infrastructure</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skills["Engineering"].map((skill) => (
              <div
                key={skill}
                className="card bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/5 border border-[var(--primary)]/20 hover:border-[var(--primary)]/50 transition-all p-4 flex items-center gap-3"
              >
                <CheckCircle2 size={20} className="text-[var(--primary)] flex-shrink-0" />
                <span className="font-semibold text-gray-900">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Practices */}
        <div className="mb-16">
          <div className="mb-6">
            <span className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">Best Practices</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{t.practices}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicesData.map((practice) => (
              <div
                key={practice.label}
                className="card bg-gradient-to-br from-white to-gray-50 border border-[var(--border)]/50 hover:border-[var(--primary)]/30 transition-all p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{practice.label}</h3>
                <p className="text-gray-600">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/5 rounded-xl p-8 border border-[var(--primary)]/20">
          <p className="text-center text-gray-700 text-lg">
            <span className="font-semibold text-gray-900">{t.description}</span>
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-t from-[var(--background)] to-white border-t border-[var(--border)]/30 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'de' ? 'Interessiert an meinen Fähigkeiten?' : 'Interested in working together?'}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {experienceMode === 'engineer'
                ? (language === 'de' ? 'Technische Details bereit fuer Deep-Dive Gespräche.' : 'Technical details prepared for deep-dive conversations.')
                : (language === 'de' ? 'Schneller Ueberblick fuer Recruiter und Hiring Teams.' : 'Fast clarity for recruiters and hiring teams.')}
            </p>
            <button type="button" onClick={goToContactOnHome} className="btn-accent inline-flex items-center gap-2">
              {language === 'de' ? 'Kontakt aufnehmen' : 'Get in Touch'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
