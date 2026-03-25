import { Github, Zap, Database, Settings, TrendingUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FlokkaCaseStudy = ({ language = 'en' }) => {
  const [expandedSection, setExpandedSection] = useState('problem');

  const content = {
    en: {
      title: 'Flokka Ingestion Pipeline',
      subtitle: 'RAG-Ready Document Processing System',
      status: 'Completed',
      year: '2025',
      // Hero problem statement
      headline: 'Building a Scalable Document Ingestion Pipeline for Retrieval-Augmented Generation',
      problemHeading: 'The Challenge',
      problem: `Ingesting large document collections directly through the application API created a critical operational bottleneck. Each ingestion request blocked further API operations, degraded overall system responsiveness, and created an unpredictable dependency chain between chunking, embedding, vector storage, and retrieval indexing. The lack of structured validation gates made it impossible to guarantee ingestion quality across hundreds of thousands of documents.`,
      
      // Architecture deep dive
      architectureHeading: 'System Architecture',
      architectureIntro: 'Flokka solves this through a decoupled, queue-based architecture that prioritizes API stability, embedding quality, and operational observability:',
      
      // Core components
      components: [
        {
          name: 'API Gateway & Queue Producer',
          description: `Receives document upload requests and immediately enqueues ingestion jobs to Redis. The API returns instantly without waiting for processing—critical for user experience. Each job carries document metadata, chunking parameters, and embedding model specifications to ensure reproducible processing.`
        },
        {
          name: 'Redis Queue (Celery)',
          description: `Acts as a reliable job broker. Ensures ingestion tasks are persistent, retryable, and prioritizable. Failed jobs are automatically retried with exponential backoff, preventing data loss and handling transient failures gracefully. The queue decouples the fast frontend from slow embedding operations.`
        },
        {
          name: 'Chunking & Embedding Workers',
          description: `Parallel Python Celery workers handle the heavy lifting. They split documents using semantic chunking strategies (not fixed-length slicing) to preserve context and meaning. Embeddings are computed in batches to maximize hardware utilization and minimize embedding service calls. Multiple workers scale horizontally.`
        },
        {
          name: 'ChromaDB Vector Store',
          description: `Stores embedded vectors alongside document metadata. Provides efficient semantic similarity search via approximate nearest neighbor indexing. Supports metadata filtering for faceted retrieval. Enables vector similarity searches that power the RAG retrieval stage.`
        },
        {
          name: 'CI/CD Quality Gates',
          description: `Automated checks validate index consistency, embedding quality, and retrieval performance on every PR. Tests confirm that new code changes don't degrade the ingestion pipeline or affect retrieval accuracy. Merge gates prevent bad code from contaminating the indexed data.`
        }
      ],

      systemFlowHeading: 'System Flow: From Document to Indexed Vector',
      flowSteps: [
        { number: 1, title: 'Client Upload', description: 'User uploads a document collection via REST API with embedding parameters and chunking preferences.' },
        { number: 2, title: 'Job Enqueue', description: 'API validates the request, creates an ingestion job record, and immediately pushes it to the Redis queue without waiting for processing.' },
        { number: 3, title: 'Asynchronous Processing', description: 'A pool of Celery workers picks up jobs from the queue. Each worker chunks the document semantically and calls the embedding service (e.g., OpenAI embeddings or local models).' },
        { number: 4, title: 'Vector Indexing', description: 'Embedded vectors and their associated metadata (document ID, chunk position, source) are inserted into ChromaDB for efficient retrieval.' },
        { number: 5, title: 'Validation & Monitoring', description: 'CI tests validate index consistency. Production monitoring tracks ingestion latency, embedding quality, and worker health in real time.' }
      ],

      decisionsHeading: 'Engineering Decisions',
      decisions: [
        {
          title: 'Background Queue Isolation',
          rationale: 'Decoupling the ingestion workload from the API ensures the system remains responsive and user-facing endpoints never block. API returns while processing happens in the background.'
        },
        {
          title: 'Semantic Chunking over Fixed-Length Strategy',
          rationale: 'Fixed-length chunks often split sentences and lose semantic context. Semantic chunking preserves meaning boundaries, improving embedding quality and retrieval precision—critical for RAG accuracy.'
        },
        {
          title: 'Automated Validation in CI as Merge Gate',
          rationale: 'Code that breaks ingestion or retrieval quality must never reach production. Merge gates running retrieval tests prevent regressions early, catching embedding quality issues before deployment.'
        },
        {
          title: 'Horizontal Worker Scaling with Celery',
          rationale: 'Multiple workers process jobs in parallel, allowing ingestion throughput to scale linearly with available compute. No single failure point; failed jobs are retried automatically.'
        },
        {
          title: 'Metadata Preservation & Filtering',
          rationale: 'Storing source document ID, chunk position, and metadata alongside vectors enables RAG systems to retrieve the original document text and cite sources accurately.'
        }
      ],

      tradeoffsHeading: 'Trade-offs & Solutions',
      tradeoffs: [
        {
          tradeoff: 'Ingestion latency vs. quality',
          decision: 'Accepted longer processing windows (hours to days for large collections) to enable semantic chunking and quality checks. Alternative of fast fixed-length chunking would degrade retrieval quality significantly.'
        },
        {
          tradeoff: 'Operational complexity vs. reliability',
          decision: 'More infrastructure services (Redis, workers, ChromaDB, CI) to operate. Trade-off justified by non-blocking API behavior and guaranteed data consistency. Alternative of synchronous processing would hurt user experience.'
        },
        {
          tradeoff: 'Storage and embedding cost',
          decision: 'Storing all vectors in ChromaDB increases storage usage and embedding costs, but is necessary for fast retrieval and semantic search. Compression and pruning of old vectors mitigate costs.'
        }
      ],

      resultsHeading: 'Results & Impact',
      results: [
        { metric: '1000+ Pages', description: 'Reliably ingested and indexed large document collections without API blocking.' },
        { metric: 'Non-blocking', description: 'API responses remain fast (<100ms) while ingestion happens asynchronously in background.' },
        { metric: 'Automated Quality Gates', description: 'Every PR is validated; retrieval quality and index consistency are tested before merge. Zero regressions in production.' },
        { metric: 'Horizontal Scalability', description: 'Add more workers to increase ingestion throughput. No API bottleneck; scales independently.' }
      ],

      stackHeading: 'Technology Stack',
      stack: ['Python', 'FastAPI', 'Celery', 'Redis', 'ChromaDB', 'PostgreSQL', 'GitHub Actions', 'Docker'],

      githubLabel: 'View on GitHub'
    },
    de: {
      title: 'Flokka Ingestion Pipeline',
      subtitle: 'RAG-Ready Document Processing System',
      status: 'Abgeschlossen',
      year: '2025',
      // Hero problem statement
      headline: 'Aufbau einer skalierbaren Dokumenting estin Pipeline für Retrieval-Augmented Generation',
      problemHeading: 'Die Herausforderung',
      problem: `Das Aufnehmen großer Dokumentsammlungen direkt über die API der Anwendung führte zu einem kritischen operativen Engpass. Jede Ingestion-Anforderung blockierte weitere API-Operationen, beeinträchtigte die Gesamtsystemresponsivität und schuf eine unvorhersehbare Abhängigkeit zwischen Chunking, Embedding, Vektorspeicherung und Abruf-Indizierung. Die fehlenden strukturierten Validierungstore machten es unmöglich, die Ingestion-Qualität über Hunderttausende von Dokumenten hinweg zu garantieren.`,
      
      // Architecture deep dive
      architectureHeading: 'Systemarchitektur',
      architectureIntro: 'Flokka löst dies durch eine entkoppelte, warteschlangenbasierte Architektur, die API-Stabilität, Embedding-Qualität und operative Transparenz priorisiert:',
      
      // Core components
      components: [
        {
          name: 'API-Gateway & Queue Producer',
          description: `Empfängt Dokument-Upload-Anforderungen und stellt Ingestion-Jobs sofort in die Redis-Warteschlange. Die API wird, ohne auf die Verarbeitung zu warten, sofort zurückgegeben – entscheidend für die Benutzererfahrung. Jeder Job trägt Dokumentmetadaten, Chunking-Parameter und Embedding-Modellspezifikationen, um reproduzierbare Verarbeitung zu gewährleisten.`
        },
        {
          name: 'Redis-Warteschlange (Celery)',
          description: `Fungiert als zuverlässiger Job-Broker. Gewährleistet, dass Ingestion-Aufgaben persistent, wiederholbar und priorisierbar sind. Fehlgeschlagene Jobs werden automatisch mit exponentiellem Backoff wiederholt, was Datenverlust verhindert und transiente Fehler elegant handhabt. Die Warteschlange entkoppelt das schnelle Frontend von langsamen Embedding-Operationen.`
        },
        {
          name: 'Chunking- & Embedding-Worker',
          description: `Parallele Python-Celery-Worker erledigen die aufwändige Arbeit. Sie teilen Dokumente unter Verwendung von semantischen Chunking-Strategien (nicht Slicing fester Länge) auf, um den Kontext und die Bedeutung zu bewahren. Embeddings werden in Batches berechnet, um die Hardware-Auslastung zu maximieren und Embedding-Serviceaufrufe zu minimieren. Mehrere Worker skalieren horizontal.`
        },
        {
          name: 'ChromaDB Vector Store',
          description: `Speichert eingebettete Vektoren zusammen mit Dokumentmetadaten. Bietet effiziente semantische Ähnlichkeitssuche über ungefähres Nearest-Neighbor-Indizierung. Unterstützt Metadatenfilterung für facettierte Abfragen. Ermöglicht Vektor-Ähnlichkeitssuchen, die die RAG-Abfunstufe stärken.`
        },
        {
          name: 'CI/CD-Qualitätstore',
          description: `Automatisierte Tests validieren Indexkonsistenz, Embedding-Qualität und Abrufleistung bei jedem PR. Tests bestätigen, dass neue Code-Änderungen die Ingestion-Pipeline nicht verschlechtern oder die Abrufgenauigkeit nicht beeinflussen. Merge-Gates verhindern, dass fehlerhafter Code die indizierten Daten kontaminiert.`
        }
      ],

      systemFlowHeading: 'Systemfluss: Vom Dokument zum indizierten Vektor',
      flowSteps: [
        { number: 1, title: 'Client-Upload', description: 'Benutzer lädt eine Dokumentsammlung über REST-API mit Embedding-Parametern und Chunking-Präferenzen hoch.' },
        { number: 2, title: 'Job in Warteschlange', description: 'API validiert die Anforderung, erstellt einen Ingestion-Job-Record und stellt ihn sofort ohne Verarbeitungswarten in die Redis-Warteschlange.' },
        { number: 3, title: 'Asynchrone Verarbeitung', description: 'Ein Pool von Celery-Workern holt Jobs aus der Warteschlange ab. Jeder Worker teilt das Dokument semantisch auf und ruft den Embedding-Service auf.' },
        { number: 4, title: 'Vektorindizierung', description: 'Eingebettete Vektoren und ihre zugehörigen Metadaten werden in ChromaDB für effiziente Abfrage eingefügt.' },
        { number: 5, title: 'Validierung & Monitoring', description: 'CI-Tests validieren Indexkonsistenz. Production-Monitoring verfolgt Ingestion-Latenz, Embedding-Qualität und Worker-Gesundheit in Echtzeit.' }
      ],

      decisionsHeading: 'Engineering-Entscheidungen',
      decisions: [
        {
          title: 'Hintergrund-Warteschlangen-Isolation',
          rationale: 'Das Entkoppeln der Ingestion-Workload von der API gewährleistet, dass das System responsiv bleibt und benutzer seitige Endpunkte niemals blockierend werden.'
        },
        {
          title: 'Semantisches Chunking statt fester Länge',
          rationale: 'Chunks fester Länge teilen oft Sätze auf und verlieren semantischen Kontext. Semantisches Chunking bewahrt Bedeutungsgrenzen und verbessert die Embedding-Qualität – kritisch für RAG-Genauigkeit.'
        },
        {
          title: 'Automatisierte Validierung in CI als Merge-Gate',
          rationale: 'Code, der Ingestion oder Abrufqualität beeinträchtigt, darf niemals in die Produktion gehen. Merge-Gates verhindern Regressionen früh.'
        },
        {
          title: 'Horizontale Worker-Skalierung mit Celery',
          rationale: 'Mehrere Worker verarbeiten Jobs parallel. Durchsatz skaliert linear mit verfügbarem Compute. Kein einzelner Fehlerpunkt.'
        },
        {
          title: 'Metadaten-Erhaltung & Filterung',
          rationale: 'Das Speichern von Quellendokument-ID und Metadaten neben Vektoren ermöglicht RAG-Systemen, den Originaltext wiederzufinden und Quellen zu zitieren.'
        }
      ],

      tradeoffsHeading: 'Abwägungen & Lösungen',
      tradeoffs: [
        {
          tradeoff: 'Ingestion-Latenz vs. Qualität',
          decision: 'Längere Verarbeitungsfenster (Stunden bis Tage) für semantisches Chunking und Qualitätsprüfungen akzeptiert. Alternative würde Abrufqualität erheblich beeinträchtigen.'
        },
        {
          tradeoff: 'Operative Komplexität vs. Zuverlässigkeit',
          decision: 'Mehr Infrastruktur-Services zu betreiben. Trade-off ist durch nicht-blockiertes API-Verhalten und garantierte Datenkonsistenz gerechtfertigt.'
        },
        {
          tradeoff: 'Speicher- und Embedding-Kosten',
          decision: 'Speicherung aller Vektoren erhöht die Kosten, ist aber für schnelle Abrufung notwendig. Verdichtung und Pruning älterer Vektoren mildern Kosten.'
        }
      ],

      resultsHeading: 'Ergebnisse & Impact',
      results: [
        { metric: '1000+ Seiten', description: 'Zuverlässige Ingestion und Indizierung großer Dokumentsammlungen ohne API-Blockierung.' },
        { metric: 'Nicht blockierend', description: 'API-Antworten bleiben schnell während Ingestion asynchron im Hintergrund läuft.' },
        { metric: 'Automatisierte Qualitätstore', description: 'Jeder PR wird validiert; Abrufqualität wird vor dem Merge getestet. Null Regressionen in Produktion.' },
        { metric: 'Horizontale Skalierbarkeit', description: 'Füge mehr Worker hinzu, um Ingestion-Durchsatz zu erhöhen. Skaliert unabhängig.' }
      ],

      stackHeading: 'Technologie-Stack',
      stack: ['Python', 'FastAPI', 'Celery', 'Redis', 'ChromaDB', 'PostgreSQL', 'GitHub Actions', 'Docker'],

      githubLabel: 'Auf GitHub anschauen'
    }
  };

  const t = content[language] || content.en;
  const isExpanded = (section) => expandedSection === section;
  const toggleSection = (section) => setExpandedSection(expandedSection === section ? null : section);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      {/* Hero Header */}
      <div className="mb-8 pb-8 border-b border-[var(--border)]">
        <p className="mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-3">RAG Pipeline • Completed</p>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">{t.title}</h1>
        <p className="text-lg text-[var(--text-secondary)] mb-4">{t.subtitle}</p>
        <p className="text-base leading-relaxed text-[var(--text-secondary)] italic">{t.headline}</p>
      </div>

      {/* Problem Section */}
      <div className="mb-6 pb-6 border-b border-[var(--border)]">
        <button
          onClick={() => toggleSection('problem')}
          className="w-full flex items-center justify-between group hover:no-underline"
        >
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-[var(--primary)]" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.problemHeading}</h2>
          </div>
          <ChevronDown
            size={20}
            className={`text-[var(--text-secondary)] transition-transform ${isExpanded('problem') ? 'rotate-180' : ''}`}
          />
        </button>
        {isExpanded('problem') && (
          <div className="mt-4 text-[var(--text-secondary)] leading-relaxed">
            <p>{t.problem}</p>
          </div>
        )}
      </div>

      {/* Architecture Section */}
      <div className="mb-6 pb-6 border-b border-[var(--border)]">
        <button
          onClick={() => toggleSection('architecture')}
          className="w-full flex items-center justify-between group hover:no-underline"
        >
          <div className="flex items-center gap-3">
            <Database size={20} className="text-[var(--primary)]" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.architectureHeading}</h2>
          </div>
          <ChevronDown
            size={20}
            className={`text-[var(--text-secondary)] transition-transform ${isExpanded('architecture') ? 'rotate-180' : ''}`}
          />
        </button>
        {isExpanded('architecture') && (
          <div className="mt-4 space-y-4">
            <p className="text-[var(--text-secondary)] leading-relaxed">{t.architectureIntro}</p>
            <div className="space-y-3">
              {t.components.map((component, idx) => (
                <div key={idx} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3">
                  <h4 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{component.name}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{component.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* System Flow Section */}
      <div className="mb-6 pb-6 border-b border-[var(--border)]">
        <button
          onClick={() => toggleSection('flow')}
          className="w-full flex items-center justify-between group hover:no-underline"
        >
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-[var(--primary)]" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.systemFlowHeading}</h2>
          </div>
          <ChevronDown
            size={20}
            className={`text-[var(--text-secondary)] transition-transform ${isExpanded('flow') ? 'rotate-180' : ''}`}
          />
        </button>
        {isExpanded('flow') && (
          <div className="mt-4 space-y-3">
            {t.flowSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] font-semibold text-sm">
                    {step.number}
                  </div>
                </div>
                <div className="flex-grow pt-0.5">
                  <h4 className="font-semibold text-[var(--text-primary)] text-sm mb-0.5">{step.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Engineering Decisions Section */}
      <div className="mb-6 pb-6 border-b border-[var(--border)]">
        <button
          onClick={() => toggleSection('decisions')}
          className="w-full flex items-center justify-between group hover:no-underline"
        >
          <div className="flex items-center gap-3">
            <Settings size={20} className="text-[var(--primary)]" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.decisionsHeading}</h2>
          </div>
          <ChevronDown
            size={20}
            className={`text-[var(--text-secondary)] transition-transform ${isExpanded('decisions') ? 'rotate-180' : ''}`}
          />
        </button>
        {isExpanded('decisions') && (
          <div className="mt-4 space-y-3">
            {t.decisions.map((decision, idx) => (
              <div key={idx} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3">
                <h4 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{decision.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{decision.rationale}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trade-offs Section */}
      <div className="mb-6 pb-6 border-b border-[var(--border)]">
        <button
          onClick={() => toggleSection('tradeoffs')}
          className="w-full flex items-center justify-between group hover:no-underline"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.tradeoffsHeading}</h2>
          </div>
          <ChevronDown
            size={20}
            className={`text-[var(--text-secondary)] transition-transform ${isExpanded('tradeoffs') ? 'rotate-180' : ''}`}
          />
        </button>
        {isExpanded('tradeoffs') && (
          <div className="mt-4 space-y-3">
            {t.tradeoffs.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-3">
                <h4 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{item.tradeoff}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed"><strong>Solution:</strong> {item.decision}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="mb-6 pb-6 border-b border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t.resultsHeading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {t.results.map((result, idx) => (
            <div key={idx} className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
              <p className="font-bold text-[var(--primary)] text-base mb-1">{result.metric}</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{result.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="mb-6 pb-6 border-b border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t.stackHeading}</h2>
        <div className="flex flex-wrap gap-2">
          {t.stack.map((tech, idx) => (
            <span key={idx} className="mono chip">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <a
          href="https://github.com/MasterAditya/flokka"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2"
        >
          <Github size={18} className="icon-primary" />
          {t.githubLabel}
        </a>
      </div>
    </div>
  );
};

export default FlokkaCaseStudy;
