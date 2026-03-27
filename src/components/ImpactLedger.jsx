const ImpactLedger = ({ language = 'en', items = [] }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[var(--border)] bg-white/80 backdrop-blur p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {language === 'de' ? 'Impact Ledger' : 'Impact Ledger'}
            </h3>
            <p className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">
              {language === 'de' ? 'Proof-First Snapshot' : 'Proof-First Snapshot'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {items.map((item) => (
              <div key={item.id || item.title} className="rounded-xl border border-[var(--border)] bg-[var(--background)]/60 p-4">
                <p className="text-2xl font-bold text-[var(--primary)] mb-1">{item.metric}</p>
                <p className="text-sm font-semibold text-gray-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactLedger;
