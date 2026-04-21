import type { WordCard } from '../data/words';

interface EtymologyTimelineProps {
  card: WordCard;
  activeSegmentId?: string | null;
}

export function EtymologyTimeline({ card, activeSegmentId }: EtymologyTimelineProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        词源演变历程
      </h3>

      <div className="relative">
        <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-violet-300 via-indigo-300 to-emerald-300" />

        <div className="space-y-3">
          {card.etymology.map((step, index) => {
            const isActive = activeSegmentId === `etymology-${index}`;
            return (
              <div key={index} className={`flex gap-4 items-start rounded-xl transition-all duration-300 ${
                isActive ? 'bg-indigo-50 -mx-1 px-1 py-1' : ''
              }`}>
                {/* Dot */}
                <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'border-indigo-500 bg-indigo-100 scale-110'
                    : 'border-indigo-300 bg-white'
                }`}>
                  <div className={`rounded-full transition-all duration-300 ${
                    isActive ? 'w-3 h-3 bg-indigo-600' : 'w-2.5 h-2.5 bg-indigo-400'
                  }`} />
                </div>
                {/* Content */}
                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-all ${
                      isActive
                        ? 'bg-indigo-200 border-indigo-400 text-indigo-800'
                        : 'bg-violet-50 border-violet-200 text-violet-600'
                    }`}>
                      {step.period}
                    </span>
                    <span className={`font-mono font-bold text-sm transition-colors ${
                      isActive ? 'text-indigo-800' : 'text-slate-800'
                    }`}>{step.form}</span>
                  </div>
                  <p className={`text-xs transition-colors ${isActive ? 'text-indigo-700' : 'text-slate-500'}`}>
                    {step.meaning}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
