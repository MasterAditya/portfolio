import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const SCROLL_TARGET_KEY = 'portfolio:scrollTarget';
const NAVBAR_OFFSET = 64;
const CONTACT_OFFSET = 8;

const Navbar = ({ language, setLanguage, currentPage = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', en: 'Home', de: 'Start', subsections: [] },
    { id: 'featured', en: 'Featured', de: 'Flaggschiff', subsections: [] },
    { id: 'projects', en: 'Archive', de: 'Archiv', subsections: [] },
    { id: 'capabilities', en: 'Capabilities', de: 'Fähigkeiten', subsections: [] },
    { id: 'resume', en: 'Resume', de: 'Lebenslauf', subsections: [] },
    { id: 'contact', en: 'Contact', de: 'Kontakt', subsections: [] }
  ];

  const [showSubNav, setShowSubNav] = useState(false);

  useEffect(() => {
    if (currentPage === 'projects') {
      setActiveSection('projects');
      return;
    }

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
  }, [currentPage]);

  const scrollToSection = (section) => {
    // Close mobile menu
    setIsOpen(false);
    setShowSubNav(false);

    // Handle Projects page routing
    if (section === 'projects') {
      window.location.hash = '/projects';
      return;
    }

    // If currently on any routed page, navigate back to home and then scroll.
    if (currentPage !== 'home') {
      sessionStorage.setItem(SCROLL_TARGET_KEY, section);
      window.location.hash = '';
      return;
    }

    // Normal section navigation on home page
    const element = document.getElementById(section);
    if (element) {
      const offset = section === 'contact' ? CONTACT_OFFSET : NAVBAR_OFFSET;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[var(--card)] border-b border-[var(--border)] z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Brand */}
          <button 
            onClick={() => scrollToSection('home')}
            className="text-base sm:text-lg font-bold text-gray-900 tracking-tight hover:text-[var(--primary)] transition-colors px-2 py-1"
          >
            AS
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`mono text-xs px-3 py-2 rounded-md uppercase tracking-wider transition-colors font-medium ${
                  activeSection === item.id
                    ? 'text-[var(--primary)] bg-[var(--primary)]/5'
                    : 'text-[var(--text-secondary)] hover:text-[var(--secondary)] hover:bg-gray-100'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {language === 'de' ? item.de : item.en}
              </button>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--card)] p-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`mono text-xs px-3 py-1.5 rounded-full font-medium transition-colors min-w-[44px] ${
                  language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('de')}
                className={`mono text-xs px-3 py-1.5 rounded-full font-medium transition-colors min-w-[44px] ${
                  language === 'de' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                DE
              </button>
            </div>

            <button
              className="md:hidden p-2.5 min-w-[44px] min-h-[44px] hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-[var(--border)]">
          <div className="px-3 pt-2 pb-3 space-y-1 bg-gradient-to-b from-[var(--card)] to-[var(--background)]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-[var(--primary)] bg-[var(--primary)]/5'
                    : 'text-[var(--text-secondary)] hover:text-[var(--secondary)] hover:bg-gray-100'
                }`}
              >
                {language === 'de' ? item.de : item.en}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
