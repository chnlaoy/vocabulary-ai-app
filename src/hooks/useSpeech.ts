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

function spellOut(word: string): string {
  return word.toLowerCase().split('').join(', ');
}

export function buildStandardSegments(card: WordCard): SpeechSegment[] {
  const segs: SpeechSegment[] = [];
  segs.push({ id: 'word', text: `${card.word}.`, lang: 'en-US', rate: 0.75 });
  segs.push({ id: 'definition', text: `${card.partOfSpeech}。${card.definition}`, lang: 'zh-CN', rate: 0.95 });
  segs.push({ id: 'breakdown-title', text: '词根词缀拆解。', lang: 'zh-CN', rate: 0.95 });
  if (card.prefix) segs.push({ id: 'prefix', text: `前缀 ${card.prefix.form}，拼写为 ${spellOut(card.prefix.form)}，意思是${card.prefix.meaning}。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'root', text: `词根 ${card.root.form}，拼写为 ${spellOut(card.root.form)}，源自${card.root.origin}，意思是${card.root.meaning}。`, lang: 'zh-CN', rate: 0.9 });
  if (card.suffix) segs.push({ id: 'suffix', text: `后缀 ${card.suffix.form}，拼写为 ${spellOut(card.suffix.form)}，意思是${card.suffix.meaning}。`, lang: 'zh-CN', rate: 0.9 });
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
    segs.push({ id: `related-${i}`, text: `${rw.word}.`, lang: 'en-US', rate: 0.78 });
    segs.push({ id: `related-meaning-${i}`, text: rw.meaning, lang: 'zh-CN', rate: 0.9 });
  });
  segs.push({ id: 'end', text: `以上是单词 ${card.word} 的全部内容。`, lang: 'zh-CN', rate: 0.92 });
  return segs;
}

export function buildTutorScript(card: WordCard): SpeechSegment[] {
  const segs: SpeechSegment[] = [];
  segs.push({ id: 'tutor-intro', text: `你好！我们现在来学习这个单词：${card.word}。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'tutor-definition', text: `它的基本意思是${card.definition}。简单来说，它描述的是${card.definition.substring(0, 15)}这种感觉。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'tutor-breakdown-start', text: '为了更好地掌握它，我们把它像拼图一样拆开来看。', lang: 'zh-CN', rate: 0.9 });
  if (card.prefix) {
    segs.push({ id: 'tutor-prefix', text: `首先看它的前缀 ${card.prefix.form}，拼写是 ${spellOut(card.prefix.form)}。在语言学中，它通常代表${card.prefix.meaning}。`, lang: 'zh-CN', rate: 0.85 });
  }
  segs.push({ id: 'tutor-root', text: `接下来的核心部分是词根 ${card.root.form}，拼写为 ${spellOut(card.root.form)}。它源自${card.root.origin}，最根本的含义是${card.root.meaning}。`, lang: 'zh-CN', rate: 0.85 });
  if (card.suffix) {
    segs.push({ id: 'tutor-suffix', text: `最后是后缀 ${card.suffix.form}，拼写为 ${spellOut(card.suffix.form)}。它起到了${card.suffix.meaning}的作用。`, lang: 'zh-CN', rate: 0.85 });
  }
  segs.push({ id: 'tutor-combine', text: `现在我们把它们合起来：${card.prefix?.form || ''}加上${card.root.form}${card.suffix?.form || ''}，就构成了 ${card.word}。这样你就能明白为什么它的意思是${card.definition}了，对吧？`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'tutor-tip', text: `这里有一个特别好记的口诀：${card.memoryTip}。试着在脑海中把这个画面和单词联系起来。`, lang: 'zh-CN', rate: 0.9 });
  segs.push({ id: 'tutor-examples-start', text: '为了让你掌握得更扎实，我们来看两个在日常生活中非常实用的例句。', lang: 'zh-CN', rate: 0.9 });
  card.examples.slice(0, 2).forEach((ex, i) => {
    segs.push({ id: `tutor-ex-en-${i}`, text: ex.sentence, lang: 'en-US', rate: 0.8 });
    segs.push({ id: `tutor-ex-zh-${i}`, text: `这句话的意思是：${ex.translation}。当你处于${ex.context}这种场景时，就可以这样说。`, lang: 'zh-CN', rate: 0.9 });
  });
  segs.push({ id: 'tutor-end', text: `好了，这就是 ${card.word} 的完整深度讲解。建议你多读几遍例句，把这个词彻底变成自己的词汇！`, lang: 'zh-CN', rate: 0.9 });
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
