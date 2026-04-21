import React from 'react';
import type { WordCard } from '../data/words';

interface WordBreakdownProps {
  card: WordCard;
  activeSegmentId?: string | null;
}

const partColors: Record<string, string> = {
  prefix: 'bg-violet-100 text-violet-800 border-violet-300',
  root: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  suffix: 'bg-emerald-100 text-emerald-800 border-emerald-300',
};

const activePartColors: Record<string, string> = {
  prefix: 'bg-violet-300 text-violet-900 border-violet-500 scale-110',
  root: 'bg-indigo-300 text-indigo-900 border-indigo-500 scale-110',
  suffix: 'bg-emerald-300 text-emerald-900 border-emerald-500 scale-110',
};

export function WordBreakdown({ card, activeSegmentId }: WordBreakdownProps) {
  const parts = [];
  if (card.prefix) {
    parts.push({ type: 'prefix', label: '前缀', form: card.prefix.form, meaning: card.prefix.meaning, segId: 'prefix' });
  }
  parts.push({ type: 'root', label: '词根', form: card.root.form, meaning: card.root.meaning, segId: 'root' });
  if (card.suffix) {
    parts.push({ type: 'suffix', label: '后缀', form: card.suffix.form, meaning: card.suffix.meaning, segId: 'suffix' });
  }

  const isMemoryActive = activeSegmentId === 'memory-tip';

  return (
    <div className="space-y-4">
      {/* Visual word split */}
      <div className="flex flex-wrap items-end justify-center gap-1 py-4">
        {parts.map((part, i) => {
          const isActive = activeSegmentId?.startsWith(part.segId);
          return (
            <React.Fragment key={part.type}>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{part.label}</span>
                <div className={`px-4 py-2 rounded-xl border-2 font-bold text-xl font-mono cursor-default transition-all duration-300 ${
                  isActive ? activePartColors[part.type] : `${partColors[part.type]} hover:scale-105`
                }`}>
                  {part.form}
                </div>
                <span className="text-xs text-slate-500 text-center max-w-[80px] leading-tight">{part.meaning}</span>
              </div>
              {i < parts.length - 1 && (
                <div className="text-2xl text-slate-300 font-light pb-6">+</div>
              )}
            </React.Fragment>
          );
        })}
        <div className="text-2xl text-slate-300 font-light pb-6">=</div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">单词</span>
          <div className={`px-4 py-2 rounded-xl border-2 font-bold text-xl transition-all duration-300 ${
            activeSegmentId === 'word'
              ? 'border-amber-500 bg-amber-100 text-amber-900 scale-110'
              : 'border-amber-400 bg-amber-50 text-amber-800'
          }`}>
            {card.word}
          </div>
          <span className="text-xs text-slate-500 text-center max-w-[100px] leading-tight">{card.definition}</span>
        </div>
      </div>

      {/* Root origin */}
      <div className={`rounded-xl p-3 border text-sm transition-all duration-300 ${
        activeSegmentId === 'root'
          ? 'bg-indigo-100 border-indigo-300 text-indigo-900 shadow-sm'
          : 'bg-indigo-50 border-indigo-100 text-indigo-700'
      }`}>
        <span className="font-semibold">词根来源：</span>词根 <span className="font-mono font-bold">{card.root.form}</span> 源自{card.root.origin}，核心含义为"{card.root.meaning}"
      </div>

      {/* Memory tip */}
      <div className={`rounded-xl p-3 border text-sm flex gap-2 transition-all duration-300 ${
        isMemoryActive
          ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-sm'
          : 'bg-amber-50 border-amber-100 text-amber-800'
      }`}>
        <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.347a3.75 3.75 0 01-1.043 2.553A4.992 4.992 0 0112 21a4.992 4.992 0 01-3.536-1.465 3.75 3.75 0 01-1.043-2.553l-.347-.347z" />
        </svg>
        <div>
          <span className="font-semibold">记忆口诀：</span>{card.memoryTip}
        </div>
      </div>
    </div>
  );
}
