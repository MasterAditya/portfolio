import { useEffect, useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';

const HeroImpactTicker = ({ items = [], language = 'en' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  useEffect(() => {
    if (safeItems.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeItems.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [safeItems]);

  if (safeItems.length === 0) {
    return null;
  }

  const active = safeItems[activeIndex];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white/80 backdrop-blur p-4 shadow-sm">
      <p className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)] mb-2 flex items-center gap-2">
        <Sparkles size={12} className="text-[var(--primary)]" />
        {language === 'de' ? 'Live Engineering Signal' : 'Live Engineering Signal'}
      </p>
      <div key={`${active.title}-${activeIndex}`} className="animate-fadeIn">
        <p className="text-2xl font-bold text-[var(--primary)]">{active.metric}</p>
        <p className="text-sm font-semibold text-gray-900">{active.title}</p>
        <p className="text-xs text-gray-600 mt-1">{active.detail}</p>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        {safeItems.map((item, idx) => (
          <button
            key={`${item.title}-${idx}`}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Show signal ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${idx === activeIndex ? 'w-7 bg-[var(--primary)]' : 'w-2 bg-[var(--border)]'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroImpactTicker;
