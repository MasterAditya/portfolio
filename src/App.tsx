import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ConsentBanner from './components/ConsentBanner';

function App() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar language={language} setLanguage={setLanguage} />
      <main id="main-content">
        <Home language={language} setLanguage={setLanguage} />
      </main>
      <ConsentBanner language={language} />
    </div>
  );
}

export default App;
