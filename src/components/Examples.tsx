import type { WordCard } from '../data/words';
import type { SpeechState } from '../hooks/useSpeech';

interface ExamplesProps {
  card: WordCard;
  activeSegmentId?: string | null;
  speechState: SpeechState;
  onSpeakSentence: (sentence: string, id: string) => void;
}

const categoryLabels = {
  daily: { label: '日常口语', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
  media: { label: '影视媒体', icon: 'M15 10.683L15 10.683l-5.662-5.662L6.338 10.683L15 10.683z M15 10.683l-5.662 5.662L6.338 10.683L15 10.683z' },
  formal: { label: '正式场合', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
};

const categoryColors = {
  daily: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  media: 'bg-purple-50 border-purple-200 text-purple-700',
  formal: 'bg-blue-50 border-blue-200 text-blue-700',
};

export function Examples({ card, activeSegmentId, speechState, onSpeakSentence }: ExamplesProps) {
  const grouped = card.examples.reduce((acc, ex) => {
    const cat = ex.category || 'daily';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(ex);
    return acc;
  }, {} as Record<string, typeof card.examples>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([cat, examples]) => (
        <div key={cat} className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 px-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={categoryLabels[cat as keyof typeof categoryLabels]?.icon || ''} />
            </svg>
            {categoryLabels[cat as keyof typeof categoryLabels]?.label || cat}
          </h3>
          
          <div className="grid gap-3">
            {examples.map((ex, _index) => {
              const globalIndex = card.examples.indexOf(ex);
              const speakId = `example-sentence-${globalIndex}`;
              const isEnSpeaking = activeSegmentId === speakId;
              const isZhSpeaking = activeSegmentId === `example-translation-${globalIndex}`;
              const isAnySpeaking = isEnSpeaking || isZhSpeaking;

              return (
                <div key={globalIndex} className={`rounded-xl border bg-white p-3 space-y-1.5 transition-all duration-300 ${
                  isAnySpeaking ? 'border-indigo-300 shadow-md ring-2 ring-indigo-100' : 'border-slate-100 shadow-sm hover:shadow-md'
                }`}>
                  <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border ${categoryColors[cat as keyof typeof categoryColors] || 'bg-slate-50'}`}>
                    📍 {ex.context}
                  </span>
                  <div className="flex items-start gap-2">
                    <p className={`text-sm font-medium leading-relaxed flex-1 transition-colors duration-300 ${isEnSpeaking ? 'text-indigo-800' : 'text-slate-800'}`}>
                      {ex.sentence}
                    </p>
                    {!speechState.isPlaying && (
                      <button
                        onClick={() => onSpeakSentence(ex.sentence, speakId)}
                        className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer"
                        title="朗读例句"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed pl-0 border-t border-dashed pt-1 transition-all duration-300 ${isZhSpeaking ? 'border-indigo-200 text-indigo-700 font-medium' : 'border-slate-100 text-slate-500'}`}>
                    {ex.translation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
