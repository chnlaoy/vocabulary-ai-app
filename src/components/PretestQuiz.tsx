import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { WordCard } from '../data/words';

interface PretestQuestion {
  wordId: string;
  word: string;
  options: string[];
  correctIndex: number;
}

export interface PretestResult {
  wordId: string;
  word: string;
  isCorrect: boolean;
  userAnswer?: string;
  correctAnswer: string;
}

interface PretestQuizProps {
  targetWords: WordCard[];
  onComplete: (results: PretestResult[]) => void;
}

export function PretestQuiz({ targetWords, onComplete }: PretestQuizProps) {
  const [questions, setQuestions] = useState<PretestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<PretestResult[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 生成测试题目
  useEffect(() => {
    const generateQuestions = (): PretestQuestion[] => {
      return targetWords.map((card, index) => {
        // 将当前正确答案和其他三个干扰项混合
        const allOptions = [
          card.definition,
          ...targetWords
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
          options: shuffledOptions,
          correctIndex
        };
      });
    };

    setQuestions(generateQuestions);
  }, [targetWords]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return;

    setSelectedOptionIndex(optionIndex);
    setShowResult(true);

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    const newResult: PretestResult = {
      wordId: currentQuestion.wordId,
      word: currentQuestion.word,
      isCorrect,
      userAnswer: currentQuestion.options[optionIndex],
      correctAnswer: currentQuestion.options[currentQuestion.correctIndex]
    };

    setResults(prev => [...prev, newResult]);
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
        // 测试完成
        onComplete(results);
      }
    }, 500);
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">正在生成测试题...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">学前测试</h1>
          <p className="text-gray-600">测试你对目标单词的掌握程度,只学习需要巩固的单词</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">测试进度</span>
            <span className="font-medium text-gray-900">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
              }}
            />
          </div>
        </div>

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
                icon = <XCircle className="w-5 h-5 text-red-500" />;
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
                  <span className="text-sm text-green-600 font-medium">正确答案</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl animate-fade-in">
            <div className="flex items-center gap-2">
              {selectedOptionIndex === currentQuestion.correctIndex ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-700 font-medium">回答正确!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 font-medium">回答错误,这个单词需要学习</span>
                </>
              )}
            </div>
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
              '查看测试结果'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
