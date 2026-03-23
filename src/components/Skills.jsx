import { skills } from '../data/portfolioData';

const Skills = ({ language = 'en' }) => {
  const heading = language === 'de' ? 'Skills' : 'Skills';

  const categoryMapDe = {
    Programming: 'Programmierung',
    Backend: 'Backend',
    Data: 'Daten',
    Infrastructure: 'Infrastruktur',
    AI: 'KI',
    Testing: 'Testen'
  };

  return (
    <section id="skills" className="py-20 bg-[var(--background)] section-reveal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{heading}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{language === 'de' ? (categoryMapDe[category] || category) : category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, index) => (
                  <span
                    key={index}
                    className="mono chip"
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
