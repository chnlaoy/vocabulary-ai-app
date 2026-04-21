import { useState, useCallback, useRef } from 'react';
import type { WordCard } from '../data/words';

export interface SpeechSegment {
  id: string;
  text: string;
  lang?: string;
  rate?: number;
}

export interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentSegmentId: string | null;
  segmentIndex: number;
  totalSegments: number;
}

export function buildStandardSegments(card: WordCard): SpeechSegment[] {
  const segs: SpeechSegment[] = [];
  segs.push({ id: 'word', text: `${card.word}.`, lang: 'en-US', rate: 0.75 });
  segs.push({ id: 'definition', text: `${card.partOfSpeech}。${card.definition}`, lang: 'zh-CN', rate: 0.95 });
  segs.push({ id: 'breakdown-title', text: '词根词缀拆解。', lang: 'zh-CN', rate: 0.95 });
  if (card.prefix) segs.push({ id: 'prefix', text: `前缀 ${card.prefix.form}，意思是${card.prefix.meaning}。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'root', text: `词根 ${card.root.form}，源自${card.root.origin}，意思是${card.root.meaning}。`, lang: 'zh-CN', rate: 0.9 });
  if (card.suffix) segs.push({ id: 'suffix', text: `后缀 ${card.suffix.form}，意思是${card.suffix.meaning}。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'memory-tip', text: `记忆口诀：${card.memoryTip}`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'etymology-title', text: '词源演变。', lang: 'zh-CN', rate: 0.95 });
  card.etymology.forEach((step, i) => segs.push({ id: `etymology-${i}`, text: `${step.period}，写作 ${step.form}，意为${step.meaning}。`, lang: 'zh-CN', rate: 0.9 }));
  segs.push({ id: 'examples-title', text: '例句与使用情境。', lang: 'zh-CN', rate: 0.95 });
  card.examples.forEach((ex, i) => {
    segs.push({ id: `example-sentence-${i}`, text: ex.sentence, lang: 'en-US', rate: 0.82 });
    segs.push({ id: `example-translation-${i}`, text: `中文意思：${ex.translation}。使用情境：${ex.context}。`, lang: 'zh-CN', rate: 0.92 });
  });
  segs.push({ id: 'related-title', text: '同根词族。', lang: 'zh-CN', rate: 0.95 });
  card.relatedWords.forEach((rw, i) => {
    segs.push({ id: `related-${i}`, text: `${rw.word}。`, lang: 'en-US', rate: 0.78 });
    segs.push({ id: `related-meaning-${i}`, text: rw.meaning, lang: 'zh-CN', rate: 0.9 });
  });
  segs.push({ id: 'end', text: `以上是单词 ${card.word} 的全部内容。`, lang: 'zh-CN', rate: 0.92 });
  return segs;
}

export function buildTutorScript(card: WordCard): SpeechSegment[] {
  const segs: SpeechSegment[] = [];
  segs.push({ id: 'tutor-intro', text: `来学习这个单词：${card.word}。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'tutor-definition', text: `它的基本意思是${card.definition}。简单来说，就是${card.definition.substring(0, 10)}... 这种感觉。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'tutor-breakdown-start', text: '我们把它拆开来看，这样更好记。', lang: 'zh-CN', rate: 0.9 });
  if (card.prefix) segs.push({ id: 'tutor-prefix', text: `首先是前缀 ${card.prefix.form}，在拉丁语或希腊语里代表${card.prefix.meaning}。`, lang: 'zh-CN', rate: 0.85 });
  segs.push({ id: 'tutor-root', text: `核心词根是 ${card.root.form}，它源自${card.root.origin}，意思是${card.root.meaning}。`, lang: 'zh-CN', rate: 0.85 });
  if (card.suffix) segs.push({ id: 'tutor-suffix', text: `最后加上后缀 ${card.suffix.form}，把它变成了${card.suffix.meaning}。`, lang: 'zh-CN', rate: 0.85 });
  segs.push({ id: 'tutor-combine', text: `所以，把这些拼在一起，${card.word} 就像是把${card.prefix?.meaning || ''}和${card.root.meaning}结合了起来，非常直观。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'tutor-tip', text: `这里有一个记忆小技巧：${card.memoryTip}。这样你以后一眼就能认出它。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'tutor-examples-start', text: '看看在实际生活中怎么用。', lang: 'zh-CN', rate: 0.9 });
  card.examples.slice(0, 2).forEach((ex, i) => {
    segs.push({ id: `tutor-ex-en-${i}`, text: ex.sentence, lang: 'en-US', rate: 0.8 });
    segs.push({ id: `tutor-ex-zh-${i}`, text: `这句话的意思是：${ex.translation}。通常在${ex.context}这种场景下使用。`, lang: 'zh-CN', rate: 0.9 });
  });
  segs.push({ id: 'tutor-end', text: `这就是 ${card.word} 的完整讲解。希望能帮到你！`, lang: 'zh-CN', rate: 0.9 });
  return segs;
}

export function useSpeech() {
  const [state, setState] = useState<SpeechState>({
    isPlaying: false,
    isPaused: false,
    currentSegmentId: null,
    segmentIndex: 0,
    totalSegments: 0,
  });

  const queueRef = useRef<SpeechSegment[]>([]);
  const indexRef = useRef(0);
  const stoppedRef = useRef(false);
  const pausedRef = useRef(false);
  const onCardEndRef = useRef<(() => void) | null>(null);

  const playOne = useCallback((seg: SpeechSegment, cb: () => void) => {
    const synth = window.speechSynthesis;
    if (!synth) { cb(); return; }
    const utt = new SpeechSynthesisUtterance(seg.text);
    utt.lang = seg.lang ?? 'en-US';
    utt.rate = seg.rate ?? 0.9;
    utt.pitch = 1;
    utt.volume = 1;
    utt.onstart = () => setState(s => ({ ...s, currentSegmentId: seg.id }));
    utt.onend = () => { cb(); };
    utt.onerror = () => { cb(); };
    synth.speak(utt);
  }, []);

  const advance = useCallback(() => {
    if (stoppedRef.current || pausedRef.current) return;
    const queue = queueRef.current;
    const idx = indexRef.current;
    if (idx >= queue.length) {
      setState({ isPlaying: false, isPaused: false, currentSegmentId: null, segmentIndex: 0, totalSegments: 0 });
      onCardEndRef.current?.();
      return;
    }
    const seg = queue[idx];
    indexRef.current = idx + 1;
    setState(s => ({ ...s, segmentIndex: idx, currentSegmentId: seg.id }));
    playOne(seg, () => {
      if (!stoppedRef.current && !pausedRef.current) advance();
    });
  }, [playOne]);

  const startQueue = useCallback((segments: SpeechSegment[], onEnd?: () => void) => {
    window.speechSynthesis?.cancel();
    stoppedRef.current = false;
    pausedRef.current = false;
    queueRef.current = segments;
    indexRef.current = 0;
    onCardEndRef.current = onEnd ?? null;
    setState({ isPlaying: true, isPaused: false, currentSegmentId: null, segmentIndex: 0, totalSegments: segments.length });
    setTimeout(() => advance(), 80);
  }, [advance]);

  const stop = useCallback(() => {
    stoppedRef.current = true;
    pausedRef.current = false;
    window.speechSynthesis?.cancel();
    setState({ isPlaying: false, isPaused: false, currentSegmentId: null, segmentIndex: 0, totalSegments: 0 });
    onCardEndRef.current = null;
  }, []);

  const pause = useCallback(() => {
    if (!state.isPlaying || state.isPaused) return;
    pausedRef.current = true;
    window.speechSynthesis?.pause();
    setState(s => ({ ...s, isPaused: true }));
  }, [state.isPlaying, state.isPaused]);

  const resume = useCallback(() => {
    if (!state.isPaused) return;
    pausedRef.current = false;
    const synth = window.speechSynthesis;
    if (synth?.paused) {
      synth.resume();
      setState(s => ({ ...s, isPaused: false }));
    } else {
      setState(s => ({ ...s, isPaused: false, isPlaying: true }));
      setTimeout(() => advance(), 50);
    }
  }, [state.isPaused, advance]);

  const speakWord = useCallback((word: string) => {
    startQueue([{ id: `word-${word}`, text: word, lang: 'en-US', rate: 0.75 }]);
  }, [startQueue]);

  const speakSentence = useCallback((sentence: string, id: string) => {
    startQueue([{ id, text: sentence, lang: 'en-US', rate: 0.85 }]);
  }, [startQueue]);

  return { state, startQueue, stop, pause, resume, speakWord, speakSentence, buildStandardSegments, buildTutorScript };
}
