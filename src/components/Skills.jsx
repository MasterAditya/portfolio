import { skills } from '../data/portfolioData';

const Skills = ({ language = 'en' }) => {
  const heading = language === 'de' ? 'Skills' : 'Skills';

  const categoryMapDe = {
    'Core Stack': 'Kern-Stack',
    'AI Systems': 'KI-Systeme',
    Engineering: 'Engineering'
  };

  return (
    <section id="skills" className="py-32 bg-gradient-to-b from-white via-[var(--background)] to-white section-reveal border-t-2 border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold mb-3">Technical Expertise</p>
        <h2 className="section-title mb-8">{heading}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="card hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{language === 'de' ? (categoryMapDe[category] || category) : category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, index) => (
                  <span
                    key={index}
                    className="mono chip hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
