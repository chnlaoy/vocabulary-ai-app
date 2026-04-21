import { useState, useEffect } from 'react';
import type { WordCard } from '../data/words';
import type { SpeechState } from '../hooks/useSpeech';
import { WordBreakdown } from './WordBreakdown';
import { EtymologyTimeline } from './EtymologyTimeline';
import { Examples } from './Examples';
import { RelatedWords } from './RelatedWords';

interface WordCardViewProps {
  card: WordCard;
  mode: 'text' | 'audio';
  speechState: SpeechState;
  onSpeakWord: (word: string) => void;
  onSpeakSentence: (sentence: string, id: string) => void;
  onStop: () => void;
  onPlayFull: () => void;
}

type Tab = 'breakdown' | 'etymology' | 'examples' | 'related';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'breakdown', label: '拆解记忆', icon: 'M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5' },
  { id: 'etymology', label: '词源演变', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'examples', label: '例句情境', icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z' },
  { id: 'related', label: '词族联想', icon: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5' },
];

// Map segment IDs to which tab they belong
function segmentToTab(segId: string | null): Tab | null {
  if (!segId) return null;
  if (segId === 'word' || segId === 'definition') return 'breakdown';
  if (segId.startsWith('prefix') || segId.startsWith('root') || segId.startsWith('suffix') || segId.startsWith('memory') || segId === 'breakdown-title') return 'breakdown';
  if (segId.startsWith('etymology')) return 'etymology';
  if (segId.startsWith('example')) return 'examples';
  if (segId.startsWith('related')) return 'related';
  return null;
}

export function WordCardView({
  card,
  mode,
  speechState,
  onSpeakWord,
  onSpeakSentence,
  onStop,
  onPlayFull,
}: WordCardViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('breakdown');

  const isWordSpeaking = speechState.isPlaying && speechState.currentSegmentId === 'word';
  const isFullPlaying = speechState.isPlaying || speechState.isPaused;

  // Auto-switch tab to follow the currently speaking segment
  useEffect(() => {
    if (mode !== 'audio') return;
    const tab = segmentToTab(speechState.currentSegmentId);
    if (tab) setActiveTab(tab);
  }, [speechState.currentSegmentId, mode]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header card */}
      <div className={`rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 p-5 text-white shadow-xl shadow-indigo-200 transition-all ${
        isFullPlaying && mode === 'audio' ? 'ring-4 ring-amber-300/60' : ''
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className={`text-3xl font-bold tracking-tight font-mono transition-all ${
                speechState.currentSegmentId === 'word' ? 'text-amber-200 scale-105' : ''
              }`}>{card.word}</h2>

              {/* Pronounce button — only visible in text mode */}
              {mode === 'text' && (
                <button
                  onClick={() => isWordSpeaking ? onStop() : onSpeakWord(card.word)}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    isWordSpeaking ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label="朗读单词"
                >
                  {isWordSpeaking ? (
                    <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                  )}
                </button>
              )}

              {/* Waveform animation while speaking in audio mode */}
              {mode === 'audio' && speechState.isPlaying && (
                <span className="flex items-end gap-0.5 h-5">
                  {[0,1,2,3].map(i => (
                    <span
                      key={i}
                      className="w-1 bg-amber-300 rounded-full animate-bounce"
                      style={{ height: `${8 + (i % 2) * 6}px`, animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </span>
              )}
            </div>
            <p className={`text-sm mt-1 transition-colors ${
              speechState.currentSegmentId === 'definition' ? 'text-amber-200' : 'text-white/70'
            }`}>{card.phonetic} · {card.partOfSpeech}</p>
            <p className={`text-sm mt-2 leading-relaxed transition-colors ${
              speechState.currentSegmentId === 'definition' ? 'text-white font-medium' : 'text-white/90'
            }`}>{card.definition}</p>
          </div>

          <div className="flex flex-col gap-1">
            {card.tags.map(tag => (
              <span key={tag} className="text-xs bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Audio mode: Play full button (also accessible from the card itself) */}
        {mode === 'audio' && (
          <button
            onClick={isFullPlaying ? onStop : onPlayFull}
            className={`mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
              isFullPlaying
                ? 'bg-white text-indigo-600'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {isFullPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                </svg>
                停止朗读
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                朗读全部内容
              </>
            )}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const isCurrentlyReading = mode === 'audio' && speechState.isPlaying && segmentToTab(speechState.currentSegmentId) === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 rounded-lg text-xs font-medium transition-all cursor-pointer relative ${
                isActive
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {isCurrentlyReading && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              )}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
        {activeTab === 'breakdown' && (
          <WordBreakdown card={card} activeSegmentId={speechState.currentSegmentId} />
        )}
        {activeTab === 'etymology' && (
          <EtymologyTimeline card={card} activeSegmentId={speechState.currentSegmentId} />
        )}
        {activeTab === 'examples' && (
          <Examples
            card={card}
            activeSegmentId={speechState.currentSegmentId}
            onSpeakSentence={onSpeakSentence}
            speechState={speechState}
          />
        )}
        {activeTab === 'related' && (
          <RelatedWords card={card} activeSegmentId={speechState.currentSegmentId} />
        )}
      </div>
    </div>
  );
}
