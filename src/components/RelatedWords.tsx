import type { WordCard } from '../data/words';

interface RelatedWordsProps {
  card: WordCard;
  activeSegmentId?: string | null;
}

export function RelatedWords({ card, activeSegmentId }: RelatedWordsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m-6-10a3 3 0 11-6 0 3 3 0 016 0zM18 4a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 className="text-sm font-semibold text-slate-600">同根词家族</h3>
      </div>

      <div className="relative space-y-3 pl-4 border-l-2 border-indigo-100 ml-2">
        {/* Root Node */}
        <div className="relative">
          <div className="absolute -left-[21px] top-2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white shadow-sm z-10" />
          <div className="bg-indigo-50 border border-indigo-200 p-2 rounded-lg text-center">
            <span className="text-xs text-indigo-500 font-bold uppercase tracking-tighter">Root</span>
            <div className="text-sm font-mono font-bold text-indigo-700">{card.root.form}</div>
            <div className="text-[10px] text-indigo-400">{card.root.meaning}</div>
          </div>
        </div>

        {/* Related Words as Branches */}
        <div className="grid grid-cols-1 gap-2">
          {card.relatedWords.map((rw, index) => {
            const isWordActive = activeSegmentId === `related-${index}`;
            const isMeaningActive = activeSegmentId === `related-meaning-${index}`;
            const isActive = isWordActive || isMeaningActive;

            return (
              <div
                key={index}
                className={`relative pl-4 py-2 transition-all duration-300 ${
                  isActive ? 'text-indigo-700' : 'text-slate-600'
                }`}
              >
                <div className="absolute -left-[13px] top-3 w-2 h-2 bg-indigo-300 rounded-full" />
                <div className={`flex items-center gap-3 p-2 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-indigo-50 border-indigo-300 shadow-sm'
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}>
                  <div className={`shrink-0 w-1 h-4 rounded-full transition-all ${
                    isActive ? 'bg-indigo-600' : 'bg-slate-200'
                  }`} />
                  <div>
                    <span className={`font-semibold text-sm font-mono transition-colors ${
                      isWordActive ? 'text-indigo-700' : 'text-slate-800'
                    }`}>{rw.word}</span>
                    <p className={`text-xs mt-0.5 transition-colors ${
                      isMeaningActive ? 'text-indigo-600 font-medium' : 'text-slate-500'
                    }`}>{rw.meaning}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
