import { certifications } from '../data/portfolioData';
import { Award } from 'lucide-react';

const Certifications = ({ language = 'en' }) => {
  const heading = language === 'de' ? 'Zertifikate' : 'Certifications';
  const inProgressLabel = language === 'de' ? 'In Arbeit' : 'In Progress';

  return (
    <section id="certifications" className="py-20 bg-[var(--background)] section-reveal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{heading}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="card">
              <div className="flex items-start gap-3">
                <div className="bg-[var(--background)] p-2 rounded border border-[var(--border)]">
                  <Award className="icon-primary" size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    {cert.status === 'In Progress' && (
                      <span className="mono text-[10px] uppercase tracking-wider bg-[var(--card)] text-[var(--text-secondary)] px-2 py-1 rounded-full border border-[var(--border)]">
                        {inProgressLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{cert.organization}</p>
                  <span className="mono text-xs text-gray-500">{cert.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
