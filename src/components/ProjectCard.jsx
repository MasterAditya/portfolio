import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, language = 'en' }) => {
  const labels = {
    en: {
      aiProject: 'Engineering Project',
      problem: 'Problem',
      architecture: 'Architecture',
      engineeringFocus: 'Engineering Focus',
      stack: 'Tech Stack',
      impact: 'Measured Impact',
      challenge: 'Engineering Challenge',
      decisions: 'Key Decisions',
      tradeoffs: 'Trade-offs',
      outcome: 'Outcome',
      nextStep: 'Next Iteration',
      github: 'GitHub',
      demo: 'Live Demo'
    },
    de: {
      aiProject: 'Engineering-Projekt',
      problem: 'Problemstellung',
      architecture: 'Architektur',
      engineeringFocus: 'Engineering-Fokus',
      stack: 'Technologie-Stack',
      impact: 'Messbarer Impact',
      challenge: 'Engineering-Herausforderung',
      decisions: 'Zentrale Entscheidungen',
      tradeoffs: 'Abwaegungen',
      outcome: 'Ergebnis',
      nextStep: 'Naechste Iteration',
      github: 'GitHub',
      demo: 'Live Demo'
    }
  };

  const statusMap = {
    Completed: language === 'de' ? 'Abgeschlossen' : 'Completed',
    'In Progress': language === 'de' ? 'In Arbeit' : 'In Progress',
    'Research Project': language === 'de' ? 'Forschungsprojekt' : 'Research Project'
  };

  const t = labels[language];

  return (
    <div className="card card-accent">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">{project.category || t.aiProject}</p>
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">{project.title}</h3>
        </div>
        <span className="text-xs px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--card)]">
          {statusMap[project.status] || project.status}
        </span>
      </div>

      <p className="text-[var(--text-secondary)] mb-4">{project.description}</p>

      {project.problem && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">{t.problem}</h4>
          <p className="text-sm text-gray-600">{project.problem}</p>
        </div>
      )}

      {project.architecture && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">{t.architecture}</h4>
          <p className="text-sm text-gray-600">{project.architecture}</p>
        </div>
      )}

      {project.engineeringFocus?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">{t.engineeringFocus}</h4>
          <ul className="space-y-1">
            {project.engineeringFocus.map((focus) => (
              <li key={focus} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-gray-500">-</span>
                <span>{focus}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">{t.stack}</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="mono chip"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.decisions?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">{t.decisions}</h4>
          <ul className="space-y-1">
            {project.decisions.map((decision) => (
              <li key={decision} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-gray-500">-</span>
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.tradeoffs?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">{t.tradeoffs}</h4>
          <ul className="space-y-1">
            {project.tradeoffs.map((tradeoff) => (
              <li key={tradeoff} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-gray-500">-</span>
                <span>{tradeoff}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.outcome && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">{t.outcome}</h4>
          <p className="text-sm text-gray-600">{project.outcome}</p>
        </div>
      )}

      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2 text-sm"
        >
          <Github size={16} className="icon-primary" />
          {t.github}
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 text-sm"
          >
            <ExternalLink size={16} className="icon-primary" />
            {t.demo}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
