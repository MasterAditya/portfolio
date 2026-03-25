import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import FlokkaCaseStudyPage from './pages/FlokkaCaseStudyPage';
import SkillsPage from './pages/SkillsPage';
import ConsentBanner from './components/ConsentBanner';

const SCROLL_TARGET_KEY = 'portfolio:scrollTarget';
const NAVBAR_OFFSET = 64;
const CONTACT_OFFSET = 8;

const getCurrentPage = () => {
  const hash = window.location.hash;
  if (hash === '#/projects') return 'projects';
  if (hash === '#/flokka-details') return 'flokka-details';
  if (hash === '#/skills') return 'skills';
  return 'home';
};

function App() {
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    const handleHashChange = () => setCurrentPage(getCurrentPage());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentPage !== 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const targetSection = sessionStorage.getItem(SCROLL_TARGET_KEY);
    if (targetSection) {
      sessionStorage.removeItem(SCROLL_TARGET_KEY);
      setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          const offset = targetSection === 'contact' ? CONTACT_OFFSET : NAVBAR_OFFSET;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
      }, 80);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage]);

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar language={language} setLanguage={setLanguage} currentPage={currentPage} />
      <main id="main-content">
        {currentPage === 'projects' ? (
          <Projects language={language} />
        ) : currentPage === 'flokka-details' ? (
          <FlokkaCaseStudyPage language={language} />
        ) : currentPage === 'skills' ? (
          <SkillsPage language={language} />
        ) : (
          <Home language={language} setLanguage={setLanguage} />
        )}
      </main>
      <ConsentBanner language={language} />
    </div>
  );
}

export default App;
