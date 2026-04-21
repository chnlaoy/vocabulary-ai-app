import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { proficiencyQuestions, type Question } from '../data/proficiency-test';

export function QuizScreen({
  onComplete
}: {
  onComplete: (answers: Record<string, number>) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = proficiencyQuestions[currentIndex];
  const progress = ((currentIndex + 1) / proficiencyQuestions.length) * 100;

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    setAnswers({ ...answers, [currentQuestion.id]: index });
  };

  const handleNext = () => {
    if (currentIndex < proficiencyQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(answers[proficiencyQuestions[currentIndex - 1].id] ?? null);
    }
  };

  const getTypeColor = (type: Question['type']) => {
    switch (type) {
      case 'vocabulary': return 'bg-indigo-100 text-indigo-700';
      case 'grammar': return 'bg-purple-100 text-purple-700';
      case 'reading': return 'bg-pink-100 text-pink-700';
    }
  };

  const getTypeLabel = (type: Question['type']) => {
    switch (type) {
      case 'vocabulary': return '词汇';
      case 'grammar': return '语法';
      case 'reading': return '阅读';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 md:p-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(currentQuestion.type)}`}>
                {getTypeLabel(currentQuestion.type)}
              </span>
              <span className="text-sm text-gray-500">
                难度: {
                  currentQuestion.difficulty === 'easy' ? '简单' :
                  currentQuestion.difficulty === 'medium' ? '中等' : '困难'
                }
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {currentIndex + 1} / {proficiencyQuestions.length}
              </span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className={`flex-1 text-base ${
                    isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            上一题
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all ${
              selectedOption === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {currentIndex === proficiencyQuestions.length - 1 ? '提交测试' : '下一题'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
