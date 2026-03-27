import { useEffect, useState } from 'react';

const ReadingProgressRail = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const next = height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0;
      setProgress(next);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-14 sm:top-16 left-0 right-0 z-40 h-1 bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgressRail;
