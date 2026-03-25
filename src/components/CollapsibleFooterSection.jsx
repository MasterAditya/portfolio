const CollapsibleFooterSection = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className="border-t border-gray-700/50">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors group rounded-lg"
      >
        <span className="font-semibold text-white group-hover:text-[var(--primary)] transition-colors">{title}</span>
        <span className={`transform transition-transform text-[var(--primary)] ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-300 leading-relaxed bg-white/5 rounded-lg mx-3 mb-3 p-4 border border-gray-700/30">
          {content}
        </div>
      )}
    </div>
  );
};

export default CollapsibleFooterSection;
