import { ArrowLeft } from 'lucide-react';
import FlokkaCaseStudy from '../components/FlokkaCaseStudy';

const FlokkaCaseStudyPage = ({ language }) => {
  const copy = {
    en: {
      backToPortfolio: 'Back to Portfolio',
      title: 'Flokka Ingestion Pipeline - Full Case Study'
    },
    de: {
      backToPortfolio: 'Zurück zum Portfolio',
      title: 'Flokka Ingestions-Pipeline - Vollständige Fallstudie'
    }
  };

  const t = copy[language] || copy.en;

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-b from-[var(--background)] to-white border-b border-[var(--border)]/30 sticky top-0 z-40">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FlokkaCaseStudy language={language} />
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-t from-[var(--background)] to-white border-t border-[var(--border)]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'de' ? 'Haben Sie eine ähnliche Herausforderung?' : 'Have a similar challenge?'}
            </h2>
            <a href="#/contact" className="btn-accent inline-flex items-center gap-2">
              {language === 'de' ? 'Kontakt aufnehmen' : 'Get in Touch'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlokkaCaseStudyPage;
