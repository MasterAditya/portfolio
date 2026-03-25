import { useMemo, useState } from 'react';
import { projects, projectFilters } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';

const Projects = ({ language }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const labels = {
    en: {
      title: 'Project Archive',
      helper: 'Filterable catalog of backend and AI systems',
      filterHelper: 'Filter by stack or domain',
      noMatch: 'No projects match this filter yet.',
      caseStudyCta: 'Read Flokka Full Case Study'
    },
    de: {
      title: 'Projekt-Archiv',
      helper: 'Filterbarer Katalog von Backend- und KI-Systemen',
      filterHelper: 'Nach Stack oder Bereich filtern',
      noMatch: 'Keine Projekte entsprechen diesem Filter.',
      caseStudyCta: 'Flokka Vollständige Fallstudie lesen'
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
      <section id="projects-page" className="py-20 bg-[var(--background)] section-reveal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h1 className="section-title section-title-left mb-0">{t.title}</h1>
              <p className="mono text-xs text-gray-500 uppercase tracking-widest">{t.filterHelper}</p>
            </div>
            <p className="section-subtitle">{t.helper}</p>

            <div className="mb-8">
              <a href="#/flokka-details" className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--secondary)] font-medium text-sm transition-colors">
                {t.caseStudyCta}
              </a>
            </div>

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

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} language={language} detailed />
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <p className="text-sm text-gray-500 mt-6">{t.noMatch}</p>
            )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
