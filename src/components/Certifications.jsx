import { certifications } from '../data/portfolioData';
import { Award } from 'lucide-react';

const Certifications = ({ language = 'en' }) => {
  const heading = language === 'de' ? 'Kontinuierliches Lernen' : 'Continuous Learning';
  const inProgressLabel = language === 'de' ? 'In Arbeit' : 'In Progress';

  return (
    <section id="certifications" className="py-32 bg-[var(--background)] section-reveal border-t-2 border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold mb-3">Professional Development</p>
        <h2 className="section-title mb-8">{heading}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-[var(--primary)]/5 p-2 rounded border border-[var(--border)]">
                  <Award className="icon-primary" size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    {cert.status === 'In Progress' && (
                      <span className="mono text-[10px] uppercase tracking-wider bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded-full border border-[var(--primary)]/20">
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
