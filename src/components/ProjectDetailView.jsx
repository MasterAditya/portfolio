import { X } from 'lucide-react';

const ProjectDetailView = ({ project, language, onClose }) => {
  const t = {
    problem: language === 'de' ? 'Problem' : 'Problem',
    architecture: language === 'de' ? 'Architektur' : 'Architecture',
    impact: language === 'de' ? 'Auswirkungen' : 'Impact',
    decisions: language === 'de' ? 'Technische Entscheidungen' : 'Technical Decisions',
    tradeoffs: language === 'de' ? 'Tradeoffs' : 'Tradeoffs',
    outcome: language === 'de' ? 'Ergebnis' : 'Outcome',
    nextStep: language === 'de' ? 'Naechster Schritt' : 'Next Step',
    status: language === 'de' ? 'Status' : 'Status',
    techStack: language === 'de' ? 'Tech-Stack' : 'Tech Stack'
  };

  const renderSection = (title, content) => {
    if (!content) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
        {Array.isArray(content) ? (
          <ul className="space-y-2 text-gray-700">
            {content.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-[var(--primary)] font-bold mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 leading-relaxed">{content}</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold mb-2">
            {t.status}: {project.status || 'Active'}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h2>
          {project.category && (
            <p className="text-sm text-gray-600 mono">{project.category}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-base text-gray-700 leading-relaxed mb-8 pb-8 border-b border-gray-200">
          {project.description}
        </p>
      )}

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Left Column */}
        <div>
          {renderSection(t.problem, project.problem)}
          {renderSection(t.architecture, project.architecture)}
        </div>

        {/* Right Column */}
        <div>
          {renderSection(t.impact, project.impact)}
          {renderSection(t.decisions, project.decisions)}
        </div>
      </div>

      {/* Full Width Sections */}
      {renderSection(t.tradeoffs, project.tradeoffs)}
      {renderSection(t.outcome, project.outcome)}
      {renderSection(t.nextStep, project.nextStep)}

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.techStack}</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[var(--secondary)] text-white text-sm rounded-full mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailView;
