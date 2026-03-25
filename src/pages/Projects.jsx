import { useMemo, useState } from 'react';
import { projects, projectFilters } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';
import FlokkaCaseStudy from '../components/FlokkaCaseStudy';

const Projects = ({ language }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewFlokkaDetail, setViewFlokkaDetail] = useState(false);

  const labels = {
    en: {
      title: 'Backend Engineering Projects',
      helper: 'Detailed architecture, trade-offs, and outcomes',
      filterHelper: 'Filter by stack or domain',
      noMatch: 'No projects match this filter yet.'
    },
    de: {
      title: 'Backend-Engineering-Projekte',
      helper: 'Detaillierte Architektur, Abwaegungen und Ergebnisse',
      filterHelper: 'Nach Stack oder Bereich filtern',
      noMatch: 'Keine Projekte entsprechen diesem Filter.'
    }
  };

  const t = labels[language] || labels.en;

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.category === activeFilter ||
        project.techStack.includes(activeFilter)
    );
  }, [activeFilter]);

  const getFilterLabel = (filter) => {
    if (language !== 'de') {
      return filter;
    }

    const map = {
      All: 'Alle',
      'Document Processing Backend': 'Dokumentenverarbeitungs-Backend',
      'RAG Pipeline': 'RAG-Pipeline',
      'GeoAI Backend': 'GeoKI-Backend'
    };

    return map[filter] || filter;
  };

  return (
    <div className="pt-16">
      {/* Flokka Case Study Detail View */}
      {viewFlokkaDetail && (
        <section className="py-16 bg-[var(--background)]">
          <div className="max-w-4xl mx-auto px-4">
            <button
              onClick={() => setViewFlokkaDetail(false)}
              className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--secondary)] font-medium text-sm mb-8 transition-colors"
            >
              ← Back to Projects
            </button>
            <FlokkaCaseStudy language={language} />
          </div>
        </section>
      )}

      {/* Projects Grid View */}
      {!viewFlokkaDetail && (
        <section id="projects-page" className="py-20 bg-[var(--background)] section-reveal">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h1 className="section-title section-title-left mb-0">{t.title}</h1>
              <p className="mono text-xs text-gray-500 uppercase tracking-widest">{t.filterHelper}</p>
            </div>
            <p className="section-subtitle">{t.helper}</p>

            <div className="flex flex-wrap gap-2 mb-10">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`mono text-xs px-3 py-2 rounded-full border ${
                    activeFilter === filter
                      ? 'bg-[var(--secondary)] text-white border-[var(--secondary)]'
                      : 'bg-[var(--card)] text-[var(--text-primary)] border-[var(--secondary)] hover:bg-[#f3f4f6] hover:border-[var(--primary)]'
                  }`}
                >
                  {getFilterLabel(filter)}
                </button>
              ))}
            </div>

            {/* Featured Flokka Case Study Card */}
            <div className="mb-12 pb-12 border-b border-[var(--border)]">
              <div className="bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-lg border-2 border-[var(--primary)]/20 p-6 hover:border-[var(--primary)]/40 transition-colors cursor-pointer" onClick={() => setViewFlokkaDetail(true)}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="mono text-xs uppercase tracking-wider text-[var(--primary)] font-semibold mb-2">Featured Case Study</p>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Flokka Ingestion Pipeline</h3>
                    <p className="text-[var(--text-secondary)] max-w-2xl">A deep-dive into building a scalable, queue-based document ingestion system for RAG-ready applications. Learn about our engineering decisions, system architecture, and the trade-offs we navigated.</p>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="btn-accent px-6 py-2 whitespace-nowrap">{language === 'de' ? 'Fallstudie ansehen' : 'View Case Study'}</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.filter(p => p.id !== 2).map((project) => (
                <ProjectCard key={project.id} project={project} language={language} detailed />
              ))}
            </div>
            {filteredProjects.filter(p => p.id !== 2).length === 0 && (
              <p className="text-sm text-gray-500 mt-6">{t.noMatch}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Projects;
