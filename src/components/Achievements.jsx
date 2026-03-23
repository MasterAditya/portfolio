import { achievements } from '../data/portfolioData';
import { CheckCircle2, ExternalLink } from 'lucide-react';

const Achievements = ({ language = 'en' }) => {
  const t = {
    heading: language === 'de' ? 'Engineering-Highlights' : 'Engineering Highlights',
    subheading:
      language === 'de'
        ? 'Konkrete Ergebnisse zu Testen, asynchroner Architektur, verteilter Verarbeitung und Performance'
        : 'Concrete outcomes across testing, async architecture, distributed processing, and performance',
    year: language === 'de' ? 'Jahr' : 'Year'
  };

  return (
    <section id="achievements" className="py-20 bg-[var(--background)] section-reveal" aria-labelledby="achievements-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="achievements-heading" className="section-title">{t.heading}</h2>
        <p className="section-subtitle">{t.subheading}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item) => (
            <article key={item.id} className="card card-accent">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="bg-[var(--background)] border border-[var(--border)] p-2 rounded-lg">
                  <CheckCircle2 className="icon-primary" size={20} />
                </div>
                <span className="mono text-xs text-gray-500">{t.year}: {item.year}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'de' ? item.titleDe : item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'de' ? item.detailDe : item.detail}
              </p>

              {item.proofUrl && (
                <a
                  href={item.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2 mono text-xs"
                >
                  {language === 'de' ? (item.proofLabelDe || item.proofLabel) : item.proofLabel}
                  <ExternalLink size={13} />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
