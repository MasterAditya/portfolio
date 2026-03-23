import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', en: 'Home', de: 'Start' },
    { id: 'about', en: 'About', de: 'Ueber Mich' },
    { id: 'focus', en: 'Focus', de: 'Fokus' },
    { id: 'principles', en: 'Principles', de: 'Prinzipien' },
    { id: 'resume', en: 'Resumes', de: 'Lebenslaeufe' },
    { id: 'education', en: 'Education', de: 'Bildung' },
    { id: 'skills', en: 'Skills', de: 'Faehigkeiten' },
    { id: 'readiness', en: 'Practices', de: 'Praktiken' },
    { id: 'projects', en: 'Projects', de: 'Projekte' },
    { id: 'certifications', en: 'Certifications', de: 'Zertifikate' },
    { id: 'achievements', en: 'Highlights', de: 'Highlights' },
    { id: 'contact', en: 'Contact', de: 'Kontakt' }
  ];

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[var(--card)] border-b border-[var(--border)] z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-lg font-bold text-gray-900 tracking-tight">Aditya Sharma</div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`mono text-xs uppercase tracking-wider ${
                  activeSection === item.id
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--secondary)]'
                }`}
              >
                {language === 'de' ? item.de : item.en}
              </button>
            ))}

            <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--card)] p-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`mono text-xs px-3 py-1 rounded-full ${
                  language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('de')}
                className={`mono text-xs px-3 py-1 rounded-full ${
                  language === 'de' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                DE
              </button>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[var(--card)] border-t border-[var(--border)]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2 text-sm ${
                  activeSection === item.id
                    ? 'text-[var(--primary)] bg-[#fef2f2]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--secondary)] hover:bg-[#f3f4f6]'
                }`}
              >
                {language === 'de' ? item.de : item.en}
              </button>
            ))}
            <div className="px-3 pt-2">
              <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--card)] p-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`mono text-xs px-3 py-1 rounded-full ${
                    language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('de')}
                  className={`mono text-xs px-3 py-1 rounded-full ${
                    language === 'de' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  DE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
