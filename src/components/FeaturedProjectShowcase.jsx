import { Zap, Database, GitBranch, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const FeaturedProjectShowcase = ({ project, language = 'en', onViewDetails }) => {
  const labels = {
    en: {
      featured: 'Flagship System',
      viewCase: 'View Case Study',
      explore: 'Explore Architecture',
      system: 'System Architecture',
      decisions: 'Key Decisions',
      flow: 'System Flow',
      stack: 'Tech Stack'
    },
    de: {
      featured: 'Flaggschiff-System',
      viewCase: 'Fallstudie ansehen',
      explore: 'Architektur erkunden',
      system: 'Systemarchitektur',
      decisions: 'Zentrale Entscheidungen',
      flow: 'Systemfluss',
      stack: 'Technologie-Stack'
    }
  };

  const t = labels[language] || labels.en;
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) return null;

  return (
    <div className="relative mb-20">
      {/* Background gradient accent */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-[var(--primary)]/5 via-transparent to-transparent rounded-2xl blur-3xl" />

      <div className="rounded-2xl border-2 border-[var(--primary)]/20 overflow-hidden bg-gradient-to-br from-[var(--card)] to-[var(--background)]/50 backdrop-blur-sm">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/5 border-b border-[var(--border)]">
          <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-bold mb-2">
            → {t.featured}
          </p>
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-2">
            {project.title}
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            {project.description}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--border)] bg-[var(--background)]/30 px-8">
          {[
            { id: 'overview', label: t.system, icon: Database },
            { id: 'decisions', label: t.decisions, icon: Zap },
            { id: 'stack', label: t.stack, icon: GitBranch }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {project.architecture && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3">
                    Architecture Overview
                  </h3>
                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                    {project.architecture}
                  </p>
                </div>
              )}

              {project.problem && (
                <div className="rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/20 p-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
                    Problem Solved
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.outcome && (
                <div className="rounded-lg bg-[var(--secondary)]/5 border border-[var(--secondary)]/20 p-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--secondary)] mb-2">
                    Impact
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {project.outcome}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'decisions' && (
            <div className="space-y-3">
              {project.decisions?.length ? (
                project.decisions.map((decision, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-[var(--border)] p-4 hover:bg-[var(--card)] transition-colors"
                  >
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                      {idx + 1}. {decision}
                    </p>
                    {project.tradeoffs?.[idx] && (
                      <p className="text-xs text-[var(--text-secondary)] italic">
                        Trade-off: {project.tradeoffs[idx]}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-[var(--text-secondary)]">No decisions documented</p>
              )}
            </div>
          )}

          {activeTab === 'stack' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {project.techStack?.map((tech, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[var(--border)] px-4 py-3 text-center hover:bg-[var(--primary)]/5 hover:border-[var(--primary)]/30 transition-colors"
                >
                  <p className="mono text-xs font-semibold text-[var(--text-primary)]">{tech}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Footer */}
        <div className="px-8 py-6 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5 border-t border-[var(--border)] flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            {language === 'de'
              ? 'Erfahren Sie mehr über die Entscheidungen und die Implementierung'
              : 'Learn more about the engineering decisions and implementation'}
          </p>
          <button
            onClick={() => onViewDetails?.(project.id)}
            className="btn-accent inline-flex items-center gap-2 whitespace-nowrap"
          >
            {t.viewCase} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectShowcase;
