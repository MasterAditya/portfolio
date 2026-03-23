import { useEffect, useState } from 'react';

const ConsentBanner = ({ language = 'en' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-consent-v1');
    if (!saved) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem('portfolio-consent-v1', choice);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  const t = {
    en: {
      text: 'This portfolio uses only essential local storage preferences (language and consent). No tracking analytics are enabled by default.',
      accept: 'Accept',
      decline: 'Decline'
    },
    de: {
      text: 'Dieses Portfolio verwendet nur notwendige lokale Einstellungen (Sprache und Zustimmung). Standardmaessig sind keine Tracking-Analysen aktiv.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen'
    }
  }[language];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-3xl card p-4">
      <p className="text-sm text-gray-700 mb-3">{t.text}</p>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => handleChoice('declined')}
          className="btn-secondary text-sm"
        >
          {t.decline}
        </button>
        <button
          type="button"
          onClick={() => handleChoice('accepted')}
          className="btn-accent text-sm"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
