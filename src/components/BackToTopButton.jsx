import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const SCROLL_THRESHOLD = 500;

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-[65] h-11 w-11 rounded-full border border-[var(--border)] bg-white/95 text-[var(--secondary)] shadow-lg backdrop-blur transition-all hover:scale-105 hover:border-[var(--primary)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50"
    >
      <span className="sr-only">Back to top</span>
      <ArrowUp size={18} className="mx-auto" />
    </button>
  );
};

export default BackToTopButton;
