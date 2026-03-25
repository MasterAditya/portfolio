import { Code, Database, BarChart3, Zap, Shield, BookOpen } from 'lucide-react';

const EngineeeringCapabilities = ({ language = 'en' }) => {
  const t = language === 'de' ? {
    title: 'Engineering Capabilities',
    subtitle: 'Technical depth across backend systems, AI pipelines, and reliability',
    backendSystems: 'Backend Systems',
    backendDesc: 'Async APIs, database design, and scalable service architecture',
    aiSystems: 'AI Systems',
    aiDesc: 'NLP pipelines, embeddings, retrieval systems, and ML model deployment',
    practices: 'Engineering Practices',
    practicesDesc: 'Testing discipline, CI/CD, containerization, and system reliability'
  } : {
    title: 'Engineering Capabilities',
    subtitle: 'Technical depth across backend systems, AI pipelines, and reliability',
    backendSystems: 'Backend Systems',
    backendDesc: 'Async APIs, database design, and scalable service architecture',
    aiSystems: 'AI Systems',
    aiDesc: 'NLP pipelines, embeddings, retrieval systems, and ML model deployment',
    practices: 'Engineering Practices',
    practicesDesc: 'Testing discipline, CI/CD, containerization, and system reliability'
  };

  const capabilities = [
    {
      id: 1,
      category: t.backendSystems,
      description: t.backendDesc,
      icon: Database,
      skills: [
        'FastAPI & Async Architecture',
        'Database Design (PostgreSQL, Neo4j)',
        'REST API Design & Documentation',
        'Background Job Workers (Celery)',
        'Redis for Caching & Queues',
        'Connection Pooling & Resource Management',
        'System Scalability & Load Balancing'
      ]
    },
    {
      id: 2,
      category: t.aiSystems,
      description: t.aiDesc,
      icon: Zap,
      skills: [
        'NLP Pipeline Development',
        'Vector Embeddings & Semantic Search',
        'ChromaDB & Vector Store Management',
        'ML Model Integration & Inference',
        'RAG (Retrieval-Augmented Generation)',
        'Geospatial Processing (PostGIS)',
        'Hybrid ML + Deterministic Logic'
      ]
    },
    {
      id: 3,
      category: t.practices,
      description: t.practicesDesc,
      icon: Shield,
      skills: [
        'Unit & Integration Testing (Pytest)',
        'CI/CD Pipelines (GitHub Actions)',
        'Docker & Container Orchestration',
        'Infrastructure as Code Patterns',
        'Code Review & Documentation',
        'System Monitoring & Observability',
        'Reproducible Deployments'
      ]
    }
  ];

  return (
    <section id="capabilities" className="py-32 bg-gradient-to-b from-white via-[var(--background)] to-white section-reveal border-t-2 border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold mb-3">Technical Depth</p>
        <h2 className="section-title mb-2">{t.title}</h2>
        <p className="section-subtitle mb-12">{t.subtitle}</p>

        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div key={capability.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                    <Icon size={24} className="text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{capability.category}</h3>
                    <p className="text-xs text-gray-600 mt-1">{capability.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {capability.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--primary)] font-bold mt-0.5 text-lg leading-none">•</span>
                      <span className="text-sm text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngineeeringCapabilities;
