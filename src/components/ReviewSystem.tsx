import { useState, useEffect } from 'react';
import { Clock, CheckCircle, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';
import type { WordCard } from '../data/words';
import type { WordLearningStatus } from '../hooks/useLearningState';

// 艾宾浩斯遗忘曲线复习间隔 (小时)
const REVIEW_INTERVALS = [1, 24, 72, 168, 336, 720]; // 1h, 1d, 3d, 7d, 14d, 30d

interface ReviewQuestion {
  wordId: string;
  word: string;
  definition: string;
  options: string[];
  correctIndex: number;
}

interface ReviewSystemProps {
  wordsToReview: WordCard[];
  allWords: WordCard[];
  onReviewComplete: (reviewedWordIds: string[]) => void;
  onCancel: () => void;
  wordStatuses: Map<string, WordLearningStatus>;
  onUpdateResult: (wordId: string, isCorrect: boolean) => void;
}

export function ReviewSystem({
  wordsToReview,
  allWords,
  onReviewComplete,
  onCancel,
  wordStatuses,
  onUpdateResult
}: ReviewSystemProps) {
  const [questions, setQuestions] = useState<ReviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 生成复习题目
  useEffect(() => {
    const generateQuestions = (): ReviewQuestion[] => {
      return wordsToReview.map((card, index) => {
        // 将当前正确答案和其他三个干扰项混合
        const allOptions = [
          card.definition,
          ...allWords
            .filter((_, i) => i !== index)
            .map(c => c.definition)
            .slice(0, 3)
        ];

        // 随机打乱选项
        const shuffledOptions = allOptions
          .map((opt, i) => ({ opt, originalIndex: i }))
          .sort(() => Math.random() - 0.5)
          .map(item => item.opt);

        const correctIndex = shuffledOptions.indexOf(card.definition);

        return {
          wordId: card.id,
          word: card.word,
          definition: card.definition,
          options: shuffledOptions,
          correctIndex
        };
      });
    };

    setQuestions(generateQuestions);
  }, [wordsToReview, allWords, wordStatuses]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentWord = wordsToReview[currentQuestionIndex];
  const currentWordStatus = currentWord ? wordStatuses.get(currentWord.id) : null;

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return;

    setSelectedOptionIndex(optionIndex);
    setShowResult(true);

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    onUpdateResult(currentQuestion.wordId, isCorrect);

    setReviewedCount(prev => prev + 1);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOptionIndex(null);
        setShowResult(false);
        setIsTransitioning(false);
      } else {
        // 复习完成
        const reviewedWordIds = wordsToReview.map(w => w.id);
        onReviewComplete(reviewedWordIds);
      }
    }, 500);
  };

  const getNextReviewTime = (reviewCount: number): string => {
    const intervalIndex = Math.min(reviewCount, REVIEW_INTERVALS.length - 1);
    const hours = REVIEW_INTERVALS[intervalIndex];

    if (hours < 24) {
      return `${hours}小时后`;
    } else {
      const days = Math.round(hours / 24);
      return `${days}天后`;
    }
  };

  const getAccuracy = () => {
    return reviewedCount > 0 ? Math.round((correctCount / reviewedCount) * 100) : 0;
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-10 max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">无需复习</h2>
          <p className="text-gray-600 mb-6">目前没有需要复习的单词</p>
          <button
            onClick={onCancel}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700"
          >
            返回学习
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <RotateCcw className="w-6 h-6 text-indigo-600" />
                复习时间
              </h1>
              <p className="text-gray-600">巩固已学单词,加深记忆</p>
            </div>
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            >
              取消
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-indigo-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-indigo-600">{wordsToReview.length}</div>
              <div className="text-xs text-gray-600">待复习</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{correctCount}</div>
              <div className="text-xs text-gray-600">已正确</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">{getAccuracy()}%</div>
              <div className="text-xs text-gray-600">正确率</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">复习进度</span>
            <span className="font-medium text-gray-900">
              {reviewedCount} / {questions.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
              style={{
                width: `${(reviewedCount / questions.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Current Word Status */}
        {currentWordStatus && (
          <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  复习次数: {currentWordStatus.reviewCount}
                </div>
                <div className="text-xs text-gray-600">
                  历史正确率: {currentWordStatus.reviewCount > 0
                    ? Math.round((currentWordStatus.correctCount / currentWordStatus.reviewCount) * 100)
                    : 0}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">下次复习</div>
                <div className="text-sm font-medium text-amber-600">
                  {getNextReviewTime(currentWordStatus.reviewCount)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className={`bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-6 transition-all duration-500 ${
          isTransitioning ? 'opacity-0 transform -translate-x-4' : 'opacity-100 transform translate-x-0'
        }`}>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {currentQuestion.word}
            </div>
            <div className="text-gray-600">请选择正确的释义</div>
          </div>
        </div>

        {/* Options */}
        <div className={`space-y-3 mb-6 transition-all duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          {currentQuestion.options.map((option, index) => {
            let optionClass = 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50';
            let icon = null;

            if (showResult) {
              if (index === currentQuestion.correctIndex) {
                optionClass = 'border-green-500 bg-green-50';
                icon = <CheckCircle className="w-5 h-5 text-green-500" />;
              } else if (index === selectedOptionIndex && index !== currentQuestion.correctIndex) {
                optionClass = 'border-red-500 bg-red-50';
                icon = <span className="text-2xl">❌</span>;
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showResult}
                className={`w-full p-4 border-2 rounded-xl text-left transition-all flex items-center gap-3 ${
                  !showResult && 'cursor-pointer'
                } ${optionClass}`}
              >
                {icon}
                <span className="flex-1">{option}</span>
                {showResult && index === currentQuestion.correctIndex && (
                  <span className="text-sm text-green-600 font-medium">正确</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showResult && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            {selectedOptionIndex === currentQuestion.correctIndex ? (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">正确!下次复习时间延长</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-700">
                <Lightbulb className="w-5 h-5" />
                <span className="font-medium">需要加强,下次复习时间重置</span>
              </div>
            )}
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                下一题
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              '完成复习'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
