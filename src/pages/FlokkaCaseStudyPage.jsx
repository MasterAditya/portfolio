import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import FlokkaCaseStudy from '../components/FlokkaCaseStudy';
import ReadingProgressRail from '../components/ReadingProgressRail';

const SCROLL_TARGET_KEY = 'portfolio:scrollTarget';

const FlokkaCaseStudyPage = ({ language, experienceMode = 'recruiter' }) => {
  const [activeSection, setActiveSection] = useState('flokka-problem');

  const copy = {
    en: {
      backToPortfolio: 'Back to Portfolio',
      title: 'Flokka Ingestion Pipeline - Full Case Study',
      toc: 'Jump to section'
    },
    de: {
      backToPortfolio: 'Zurück zum Portfolio',
      title: 'Flokka Ingestions-Pipeline - Vollständige Fallstudie',
      toc: 'Zu Abschnitt springen'
    }
  };

  const t = copy[language] || copy.en;

  const tocItems = useMemo(
    () => [
      { id: 'flokka-problem', label: language === 'de' ? 'Herausforderung' : 'Challenge' },
      { id: 'flokka-architecture', label: language === 'de' ? 'Architektur' : 'Architecture' },
      { id: 'flokka-flow', label: language === 'de' ? 'Systemfluss' : 'System Flow' },
      { id: 'flokka-decisions', label: language === 'de' ? 'Entscheidungen' : 'Decisions' },
      { id: 'flokka-tradeoffs', label: language === 'de' ? 'Trade-offs' : 'Trade-offs' },
      { id: 'flokka-results', label: language === 'de' ? 'Ergebnisse' : 'Results' }
    ],
    [language]
  );

  useEffect(() => {
    const sectionNodes = tocItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sectionNodes.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (active?.target?.id) {
          setActiveSection(active.target.id);
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-12% 0px -55% 0px' }
    );

    sectionNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [tocItems]);

  const goToContactOnHome = () => {
    sessionStorage.setItem(SCROLL_TARGET_KEY, 'contact');
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-white pt-14 sm:pt-16">
      <ReadingProgressRail />

      {/* Header with back button */}
      <div className="bg-gradient-to-b from-[var(--background)] to-white border-b border-[var(--border)]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <a
            href="#/"
            className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            {t.backToPortfolio}
          </a>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{t.title}</h1>
        </div>
      </div>

      {/* Case Study Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-[var(--border)] bg-white/90 backdrop-blur p-4">
              <p className="mono text-[10px] uppercase tracking-[0.14em] text-gray-500 mb-3">{t.toc}</p>
              <div className="space-y-1.5">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeSection === item.id
                        ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <FlokkaCaseStudy language={language} experienceMode={experienceMode} />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-t from-[var(--background)] to-white border-t border-[var(--border)]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'de' ? 'Haben Sie eine ähnliche Herausforderung?' : 'Have a similar challenge?'}
            </h2>
            <button type="button" onClick={goToContactOnHome} className="btn-accent inline-flex items-center gap-2">
              {language === 'de' ? 'Kontakt aufnehmen' : 'Get in Touch'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlokkaCaseStudyPage;
