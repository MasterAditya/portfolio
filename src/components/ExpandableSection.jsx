import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const ExpandableSection = ({ 
  title, 
  subtitle, 
  summary, 
  details, 
  icon: Icon, 
  defaultExpanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`card hover:shadow-md transition-shadow ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 rounded"
      >
        <div className="flex-1 text-left">
          {Icon && (
            <div className="mb-2">
              <Icon size={20} className="text-[var(--primary)]" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest font-medium mb-2">
              {subtitle}
            </p>
          )}
          <p className={`text-sm leading-relaxed ${isExpanded ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)] line-clamp-2'}`}>
            {summary}
          </p>
        </div>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-[var(--text-secondary)] transition-transform duration-300 mt-1 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-3">
          {Array.isArray(details) ? (
            details.map((item, idx) => (
              <div key={idx} className="text-sm text-[var(--text-secondary)] space-y-1">
                {item.heading && (
                  <p className="font-semibold text-[var(--text-primary)]">
                    {item.heading}
                  </p>
                )}
                <p className="leading-relaxed">
                  {item.content}
                </p>
                {item.list && (
                  <ul className="space-y-1 ml-2">
                    {item.list.map((li, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--primary)] mt-1">•</span>
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {details}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;
