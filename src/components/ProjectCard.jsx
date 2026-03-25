import { Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const ProjectCard = ({ project, language = 'en', detailed = true }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const labels = {
    en: {
      aiProject: 'Engineering Project',
      problem: 'Problem',
      architecture: 'Architecture',
      systemFlow: 'System Flow',
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
      systemFlow: 'Systemfluss',
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
  const isFlokkaProject = project.id === 2 || project.title?.toLowerCase().includes('flokka');

  const summaryDescription = (() => {
    if (detailed) {
      return project.description;
    }

    const firstSentence = project.description?.split('. ')[0]?.trim();
    if (!firstSentence) {
      return project.description;
    }

    const normalized = firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`;
    return normalized.length > 130 ? `${normalized.slice(0, 127)}...` : normalized;
  })();

  const flokkaArchitectureDescription =
    language === 'de'
      ? 'Queue-basierter Ingestion-Flow mit entkoppelter Verarbeitung fuer stabile API-Reaktionszeiten und zuverlaessige Indexierung.'
      : 'Queue-based ingestion flow with decoupled processing to keep API responses stable and indexing reliable.';

  const flokkaArchitectureDiagram =
    language === 'de'
      ? 'Client -> API -> Redis Queue -> Worker -> ChromaDB\n                      |\n                      v\n                 Monitoring + CI Checks'
      : 'Client -> API -> Redis Queue -> Worker -> ChromaDB\n                      |\n                      v\n                 Monitoring + CI Checks';

  const flokkaFlowSteps =
    language === 'de'
      ? [
          'Dokumente werden ueber API-Endpunkte eingespeist.',
          'Die API legt Ingestion-Jobs in einer Redis-Queue ab.',
          'Worker verarbeiten Chunking und Embedding asynchron.',
          'Vektoren und Metadaten werden in ChromaDB indiziert.',
          'Monitoring und CI-Pruefungen sichern Zuverlaessigkeit.'
        ]
      : [
          'Documents are ingested through API endpoints.',
          'The API pushes ingestion jobs to a Redis queue.',
          'Workers run chunking and embedding asynchronously.',
          'Vectors and metadata are indexed in ChromaDB.',
          'Monitoring and CI checks enforce reliability.'
        ];

  return (
    <div className="card card-accent">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
        <div>
          <p className="mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">{project.category || t.aiProject}</p>
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">{project.title}</h3>
        </div>
        <span className="text-xs px-3 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)] bg-[var(--card)]">
          {statusMap[project.status] || project.status}
        </span>
      </div>

      <p className="text-[var(--text-secondary)] mb-6">{summaryDescription}</p>

      {/* Expandable detailed sections */}
      {detailed && (
        <div className="space-y-3 mb-6">
          {/* Problem Section */}
          {project.problem && (
            <button
              onClick={() => setExpandedSection(expandedSection === 'problem' ? null : 'problem')}
              className="w-full text-left p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
            >
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{t.problem}</h4>
                {expandedSection !== 'problem' && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1">{project.problem}</p>
                )}
              </div>
              <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'problem' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          )}
          {expandedSection === 'problem' && project.problem && (
            <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--text-secondary)]">
              {project.problem}
            </div>
          )}

          {/* Architecture Section */}
          {project.architecture && (
            <button
              onClick={() => setExpandedSection(expandedSection === 'architecture' ? null : 'architecture')}
              className="w-full text-left p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
            >
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{t.architecture}</h4>
                {expandedSection !== 'architecture' && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1">{project.architecture}</p>
                )}
              </div>
              <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'architecture' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          )}
          {expandedSection === 'architecture' && project.architecture && (
            <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--text-secondary)]">
              {project.architecture}
            </div>
          )}

          {/* Decisions Section */}
          {project.decisions?.length > 0 && (
            <button
              onClick={() => setExpandedSection(expandedSection === 'decisions' ? null : 'decisions')}
              className="w-full text-left p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
            >
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{t.decisions}</h4>
                {expandedSection !== 'decisions' && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{project.decisions.length} decisions</p>
                )}
              </div>
              <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'decisions' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          )}
          {expandedSection === 'decisions' && project.decisions?.length > 0 && (
            <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <ul className="space-y-2">
                {project.decisions.map((decision) => (
                  <li key={decision} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tradeoffs Section */}
          {project.tradeoffs?.length > 0 && (
            <button
              onClick={() => setExpandedSection(expandedSection === 'tradeoffs' ? null : 'tradeoffs')}
              className="w-full text-left p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
            >
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{t.tradeoffs}</h4>
                {expandedSection !== 'tradeoffs' && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{project.tradeoffs.length} considerations</p>
                )}
              </div>
              <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'tradeoffs' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          )}
          {expandedSection === 'tradeoffs' && project.tradeoffs?.length > 0 && (
            <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <ul className="space-y-2">
                {project.tradeoffs.map((tradeoff) => (
                  <li key={tradeoff} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    <span>{tradeoff}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcome Section */}
          {project.outcome && (
            <button
              onClick={() => setExpandedSection(expandedSection === 'outcome' ? null : 'outcome')}
              className="w-full text-left p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors flex items-start justify-between group"
            >
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{t.outcome}</h4>
                {expandedSection !== 'outcome' && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-1">{project.outcome}</p>
                )}
              </div>
              <span className={`text-[var(--text-secondary)] transition-transform ml-2 flex-shrink-0 ${expandedSection === 'outcome' ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
          )}
          {expandedSection === 'outcome' && project.outcome && (
            <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm text-[var(--text-secondary)]">
              {project.outcome}
            </div>
          )}
        </div>
      )}

      {/* Non-detailed view */}
      {!detailed && (
        <>
          {project.problem && (
            <div className="mb-3 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">{t.problem}</p>
              <p className="text-xs text-[var(--text-secondary)]">{project.problem}</p>
            </div>
          )}

          {project.architecture && (
            <div className="mb-3 p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
              <p className="text-xs font-semibold text-[var(--text-primary)] mb-1">{t.architecture}</p>
              <p className="text-xs text-[var(--text-secondary)]">{project.architecture}</p>
            </div>
          )}
        </>
      )}

      {!detailed && isFlokkaProject && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">{t.architecture}</h4>
          <p className="text-sm text-gray-600">{flokkaArchitectureDescription}</p>
          <div className="mt-2 rounded-lg border border-[var(--border)] bg-[var(--background)] p-3">
            <p className="mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              {language === 'de' ? 'Diagramm (Platzhalter)' : 'Diagram (Placeholder)'}
            </p>
            <pre className="mono text-xs text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">{flokkaArchitectureDiagram}</pre>
          </div>
        </div>
      )}

      {isFlokkaProject && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">{t.systemFlow}</h4>
          <ol className="space-y-1">
            {flokkaFlowSteps.map((step) => (
              <li key={step} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-gray-500">-</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">{t.stack}</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="mono chip text-xs hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {detailed && project.outcome && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-1">{t.outcome}</h4>
          <p className="text-sm text-gray-600">{project.outcome}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center justify-center gap-2 text-sm"
        >
          <Github size={16} className="icon-primary" />
          {t.github}
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center justify-center gap-2 text-sm"
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
