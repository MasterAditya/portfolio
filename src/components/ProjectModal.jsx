import { X, Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const ProjectModal = ({ project, language = 'en', isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const labels = {
    en: {
      problem: 'Problem',
      architecture: 'Architecture',
      decisions: 'Engineering Decisions',
      tradeoffs: 'Trade-offs',
      outcome: 'Outcome',
      stack: 'Tech Stack',
      github: 'View on GitHub'
    },
    de: {
      problem: 'Problemstellung',
      architecture: 'Architektur',
      decisions: 'Engineering-Entscheidungen',
      tradeoffs: 'Abwägungen',
      outcome: 'Ergebnis',
      stack: 'Technologie-Stack',
      github: 'Auf GitHub ansehen'
    }
  };

  const t = labels[language] || labels.en;

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] max-w-4xl w-full my-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-start justify-between p-6 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/5">
          <div className="flex-1">
            <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-2">
              {project.category}
            </p>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Summary */}
          <div>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Expandable Sections */}
          <div className="space-y-3">
            {/* Problem */}
            {project.problem && (
              <button
                onClick={() => setExpandedSection(expandedSection === 'problem' ? null : 'problem')}
                className="w-full text-left p-4 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">{t.problem}</h3>
                  {expandedSection !== 'problem' && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-1">{project.problem}</p>
                  )}
                </div>
                <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'problem' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            )}
            {expandedSection === 'problem' && project.problem && (
              <div className="p-4 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)]">
                {project.problem}
              </div>
            )}

            {/* Architecture */}
            {project.architecture && (
              <button
                onClick={() => setExpandedSection(expandedSection === 'architecture' ? null : 'architecture')}
                className="w-full text-left p-4 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">{t.architecture}</h3>
                  {expandedSection !== 'architecture' && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-1">{project.architecture}</p>
                  )}
                </div>
                <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'architecture' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            )}
            {expandedSection === 'architecture' && project.architecture && (
              <div className="p-4 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)]">
                {project.architecture}
              </div>
            )}

            {/* Decisions */}
            {project.decisions?.length > 0 && (
              <button
                onClick={() => setExpandedSection(expandedSection === 'decisions' ? null : 'decisions')}
                className="w-full text-left p-4 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">{t.decisions}</h3>
                  {expandedSection !== 'decisions' && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{project.decisions.length} key decisions</p>
                  )}
                </div>
                <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'decisions' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            )}
            {expandedSection === 'decisions' && project.decisions?.length > 0 && (
              <div className="p-4 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                <ul className="space-y-2">
                  {project.decisions.map((decision, idx) => (
                    <li key={idx} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="text-[var(--primary)] font-bold flex-shrink-0">{idx + 1}.</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tradeoffs */}
            {project.tradeoffs?.length > 0 && (
              <button
                onClick={() => setExpandedSection(expandedSection === 'tradeoffs' ? null : 'tradeoffs')}
                className="w-full text-left p-4 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">{t.tradeoffs}</h3>
                  {expandedSection !== 'tradeoffs' && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{project.tradeoffs.length} considerations</p>
                  )}
                </div>
                <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'tradeoffs' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            )}
            {expandedSection === 'tradeoffs' && project.tradeoffs?.length > 0 && (
              <div className="p-4 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                <ul className="space-y-2">
                  {project.tradeoffs.map((tradeoff, idx) => (
                    <li key={idx} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="text-[var(--primary)]">∽</span>
                      <span>{tradeoff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcome */}
            {project.outcome && (
              <button
                onClick={() => setExpandedSection(expandedSection === 'outcome' ? null : 'outcome')}
                className="w-full text-left p-4 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">{t.outcome}</h3>
                  {expandedSection !== 'outcome' && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-1">{project.outcome}</p>
                  )}
                </div>
                <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'outcome' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            )}
            {expandedSection === 'outcome' && project.outcome && (
              <div className="p-4 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--text-secondary)]">
                {project.outcome}
              </div>
            )}
          </div>

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-3">{t.stack}</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="mono text-xs px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--text-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 border-t border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5 flex items-center justify-between gap-4 flex-wrap">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Github size={16} />
              {t.github}
            </a>
          )}
          <button
            onClick={onClose}
            className="btn-accent"
          >
            {language === 'de' ? 'Schließen' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
