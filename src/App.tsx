import { useState, useCallback, useEffect } from 'react';
import { BookOpen, Volume2, Play, Pause, SkipForward, SkipBack, Search, X, Sparkles, RotateCcw, CheckCircle } from 'lucide-react';
import { wordCards } from './data/words';
import { WordCardView } from './components/WordCardView';
import { WordList } from './components/WordList';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { PretestQuiz, type PretestResult } from './components/PretestQuiz';
import { ReviewSystem } from './components/ReviewSystem';
import { useSpeech, buildStandardSegments, buildTutorScript } from './hooks/useSpeech';
import { useLearningState } from './hooks/useLearningState';
import type { DifficultyLevel, TestResult } from './data/proficiency-test';
import { calculateProficiencyLevel } from './data/proficiency-test';
import './App.css';

type Mode = 'text' | 'audio';
type TestPhase = 'welcome' | 'quiz' | 'result' | 'pretest' | 'learning' | 'review';

export default function App() {
  const [testPhase, setTestPhase] = useState<TestPhase>('welcome');
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [wordsToLearn, setWordsToLearn] = useState<typeof wordCards>([]);

    const [mode, setMode] = useState<Mode>('text');
  const [isTutorMode, setIsTutorMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [showReviewPanel, setShowReviewPanel] = useState(false);

  const { state: speechState, startQueue, stop, pause, resume, speakWord, speakSentence } = useSpeech();
  const {
    learningStatus,
    isLoaded,
    markManyAsLearned,
    updateReviewResult,
    getWordsToReview,
    filterWordsToLearn
  } = useLearningState();

  // Filter words by test result difficulty
  const getFilteredWords = () => {
    if (!testResult) return wordCards;

    const levelPriority: Record<DifficultyLevel, DifficultyLevel[]> = {
      beginner: ['beginner', 'intermediate'],
      intermediate: ['intermediate', 'advanced'],
      advanced: ['advanced', 'intermediate']
    };

    const allowedLevels = levelPriority[testResult.level];
    return wordCards.filter(card => allowedLevels.includes(card.difficulty));
  };

  const baseFilteredWords = wordsToLearn.length > 0 ? wordsToLearn : getFilteredWords();

  const filteredCards = search.trim()
    ? baseFilteredWords.filter(c =>
        c.word.toLowerCase().includes(search.toLowerCase()) ||
        c.root.form.toLowerCase().includes(search.toLowerCase()) ||
        c.definition.includes(search) ||
        c.tags.some(t => t.includes(search))
      )
    : baseFilteredWords;

  const currentCard = filteredCards[currentIndex] ?? baseFilteredWords[0];
  const isLastCard = currentIndex >= filteredCards.length - 1;

  // 获取待复习的单词
  const wordsToReview = getWordsToReview(wordCards);

  // ── Test Flow Handlers ───────────────────────────────────────────
  const handleStartTest = () => {
    setTestPhase('quiz');
  };

  const handleTestComplete = (answers: Record<string, number>) => {
    const result = calculateProficiencyLevel(answers);
    setTestResult(result);
    setTestPhase('result');
  };

  const handleRetest = () => {
    setTestResult(null);
    setWordsToLearn([]);
    setTestPhase('welcome');
  };

  const handleStartLearning = () => {
    // 进入学前测试阶段
    setTestPhase('pretest');
  };

  const handlePretestComplete = (results: PretestResult[]) => {
    // 筛选出需要学习的单词(答错的单词)
    const wordsNeedingLearning = filterWordsToLearn(results, wordCards);
    setWordsToLearn(wordsNeedingLearning);

    if (wordsNeedingLearning.length > 0) {
      // 有需要学习的单词,进入学习模式
      setTestPhase('learning');
      setCurrentIndex(0);
    } else {
      // 所有单词都答对了,直接标记为已学习
      const allWordIds = wordCards.map(w => w.id);
      markManyAsLearned(allWordIds);
      alert('太棒了!你已掌握所有目标单词,无需额外学习。');
      setTestPhase('learning');
      setCurrentIndex(0);
    }
  };

  const handleLearningComplete = () => {
    // 标记所有学过的单词为已学习
    if (wordsToLearn.length > 0) {
      const learnedWordIds = wordsToLearn.map(w => w.id);
      markManyAsLearned(learnedWordIds);
    }
    // 返回学习模式(现在可以选择复习或继续学习新单词)
    setTestPhase('learning');
    setWordsToLearn([]); // 清空待学习列表,恢复使用正常过滤
  };

  const handleReviewComplete = () => {
    setShowReviewPanel(false);
    // 可以在这里添加复习完成的提示
  };

  // ── Playback helpers ──────────────────────────────────────────────
  const playCurrentCard = useCallback((idx: number, autoNext: boolean) => {
    const card = filteredCards[idx];
    if (!card) return;
    const segments = isTutorMode ? buildTutorScript(card) : buildStandardSegments(card);
    const onEnd = autoNext && idx < filteredCards.length - 1
      ? () => {
          setTimeout(() => {
            setCurrentIndex(idx + 1);
          }, 1200);
        }
      : undefined;
    startQueue(segments, onEnd);
  }, [filteredCards, startQueue, isTutorMode]);

  // When currentIndex changes while continuous play is on, auto-start next card
  useEffect(() => {
    if (mode !== 'audio') return;
    if (!autoPlay) return;
    if (!speechState.isPlaying && !speechState.isPaused) return;
    if (!autoAdvance) return;
    playCurrentCard(currentIndex, true);
  }, [currentIndex, mode, autoAdvance, autoPlay, speechState.isPlaying, speechState.isPaused, playCurrentCard]);

  const handleTogglePlay = () => {
    if (speechState.isPlaying) {
      if (speechState.isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      playCurrentCard(currentIndex, autoAdvance);
    }
  };

  const handleStop = () => {
    stop();
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      if (speechState.isPlaying) {
        playCurrentCard(currentIndex - 1, autoAdvance);
      }
    }
  };

  const handleNext = () => {
    if (!isLastCard) {
      setCurrentIndex(currentIndex + 1);
      if (speechState.isPlaying) {
        playCurrentCard(currentIndex + 1, autoAdvance);
      }
    }
  };

  // ── Render Test Phase ─────────────────────────────────────────────
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (testPhase === 'welcome') {
    return <WelcomeScreen onStart={handleStartTest} />;
  }

  if (testPhase === 'quiz') {
    return <QuizScreen onComplete={handleTestComplete} />;
  }

  if (testPhase === 'result') {
    return (
      <ResultScreen
        result={testResult!}
        onContinue={handleStartLearning}
        onRetest={handleRetest}
      />
    );
  }

  if (testPhase === 'pretest') {
    return (
      <PretestQuiz
        targetWords={getFilteredWords()}
        onComplete={handlePretestComplete}
      />
    );
  }

  if (showReviewPanel) {
    return (
      <ReviewSystem
        wordsToReview={wordsToReview}
        allWords={wordCards}
        onReviewComplete={() => handleReviewComplete()}
        onCancel={() => setShowReviewPanel(false)}
        wordStatuses={learningStatus}
        onUpdateResult={updateReviewResult}
      />
    );
  }

  // ── Render Learning Phase ────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">WordRoots</div>
                <div className="text-xs text-gray-500">词根词缀记单词</div>
              </div>
              {/* Difficulty Badge */}
              {testResult && (
                <div className={`ml-2 px-2 py-1 rounded-lg text-xs font-semibold text-white ${
                  testResult.level === 'beginner' ? 'bg-green-500' :
                  testResult.level === 'intermediate' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`}>
                  {testResult.level === 'beginner' ? '初级' :
                   testResult.level === 'intermediate' ? '中级' : '高级'}
                </div>
              )}
              {/* Learning Mode Badge */}
              {wordsToLearn.length > 0 && (
                <div className="ml-2 px-2 py-1 rounded-lg text-xs font-semibold text-white bg-indigo-500">
                  学习模式 ({wordsToLearn.length}词)
                </div>
              )}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索单词、词根、释义..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Review Button */}
            {wordsToReview.length > 0 && (
              <button
                onClick={() => setShowReviewPanel(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm hover:shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>复习</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium">
                  {wordsToReview.length}
                </span>
              </button>
            )}

                        {/* Mode Toggle & AI Tutor */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setMode('text')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    mode === 'text'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  文字模式
                </button>
                <button
                  onClick={() => setMode('audio')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    mode === 'audio'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  音频模式
                </button>
              </div>

              {/* AI Tutor Toggle */}
              <label className="flex items-center gap-2 cursor-pointer bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-all">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isTutorMode}
                    onChange={(e) => setIsTutorMode(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-8 h-4 rounded-full transition-colors ${
                    isTutorMode ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${
                      isTutorMode ? 'translate-x-4' : ''
                    }`} />
                  </div>
                </div>
                <span className="text-xs font-medium text-indigo-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI 导师模式
                </span>
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Learning Status Banner */}
      {wordsToLearn.length > 0 && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>正在学习答错的单词 ({wordsToLearn.length}个),完成后将自动标记为已学习</span>
            </div>
            <div className="text-white/80">
              进度: {currentIndex + 1} / {filteredCards.length}
            </div>
          </div>
        </div>
      )}

      {/* Floating Audio Control Bar */}
      {mode === 'audio' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Progress */}
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">讲解进度</span>
                  <span className="font-medium text-gray-900">
                    {speechState.currentSegmentId ? Object.keys(speechState.currentSegmentId).length : 0} / {speechState.totalSegments}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{
                      width: `${speechState.totalSegments > 0
                        ? (1 / speechState.totalSegments) * 100
                        : 0
                      }%`
                    }}
                  />
                </div>
              </div>

              {/* Auto-play & Auto-advance Toggles */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={autoPlay}
                      onChange={(e) => setAutoPlay(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-6 rounded-full transition-colors ${autoPlay ? 'bg-indigo-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${autoPlay ? 'translate-x-4' : ''}`} />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">自动播放</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={autoAdvance}
                      onChange={(e) => setAutoAdvance(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-6 rounded-full transition-colors ${autoAdvance ? 'bg-indigo-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${autoAdvance ? 'translate-x-4' : ''}`} />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">自动连续</span>
                </label>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleStop}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="停止"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="上一个"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={handleTogglePlay}
                  className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  title={speechState.isPlaying ? (speechState.isPaused ? '播放' : '暂停') : '播放'}
                >
                  {speechState.isPlaying && !speechState.isPaused ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  disabled={isLastCard}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="下一个"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex h-[calc(100vh-57px)]">
        {/* Sidebar */}
        <aside className={`
          fixed md:relative z-30 md:z-0 w-80 h-full bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              词根导航
            </h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-57px)] p-2">
            <WordList
              cards={filteredCards}
              onSelectWord={(wordId: string) => {
                const idx = filteredCards.findIndex(c => c.id === wordId);
                if (idx !== -1) {
                  setCurrentIndex(idx);
                  setShowSidebar(false);
                  if (speechState.isPlaying) {
                    playCurrentCard(idx, autoAdvance);
                  }
                }
              }}
              activeWordId={currentCard?.id}
            />
          </div>
        </aside>

        {/* Main Card Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-32">
          <div className="max-w-4xl mx-auto">
            {currentCard ? (
              <WordCardView
                card={currentCard}
                mode={mode}
                speechState={speechState}
                onSpeakWord={speakWord}
                onSpeakSentence={speakSentence}
                onStop={stop}
                onPlayFull={() => playCurrentCard(currentIndex, autoAdvance)}
              />
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <div className="text-xl font-medium text-gray-900">没有找到匹配的单词</div>
                <div className="text-gray-600 mt-2">请尝试其他搜索词</div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all text-gray-700"
              >
                <SkipBack className="w-5 h-5" />
                上一个
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="font-medium">{currentIndex + 1}</div>
                <div className="text-gray-400">/ {filteredCards.length}</div>
              </div>

              <button
                onClick={handleNext}
                disabled={isLastCard}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                下一个
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Complete Learning Button */}
            {wordsToLearn.length > 0 && currentIndex === filteredCards.length - 1 && (
              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">学习完成!</div>
                    <div className="text-sm text-gray-600">所有答错的单词已学习完毕</div>
                  </div>
                  <button
                    onClick={handleLearningComplete}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    完成学习
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed bottom-24 left-4 z-40 w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-center"
      >
        <Sparkles className="w-5 h-5 text-indigo-600" />
      </button>
    </div>
  );
}
