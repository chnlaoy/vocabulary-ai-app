import { BookOpen, Target, FileText, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import type { TestResult } from '../data/proficiency-test';

interface PracticeQuestion {
  id: string;
  type: 'vocabulary' | 'grammar' | 'reading';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface PracticeQuizProps {
  weakAreas: TestResult['weakAreas'];
  onComplete: () => void;
}

export function PracticeQuiz({ weakAreas, onComplete }: PracticeQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  // 根据薄弱环节生成练习题
  const generatePracticeQuestions = (): PracticeQuestion[] => {
    const questions: PracticeQuestion[] = [];

    if (weakAreas.some(w => w.type === 'vocabulary')) {
      questions.push(
        {
          id: 'v-practice-1',
          type: 'vocabulary',
          question: 'Which prefix means "across" or "through"?',
          options: ['in-', 'trans-', 'sub-', 're-'],
          correctIndex: 1,
          explanation: '"Trans-" means across, through, or beyond, as in transport (carry across), translate (carry across languages).'
        },
        {
          id: 'v-practice-2',
          type: 'vocabulary',
          question: 'The root "port" means:',
          options: ['to look', 'to carry', 'to speak', 'to write'],
          correctIndex: 1,
          explanation: '"Port" comes from Latin "portare" meaning to carry. Examples: transport (carry across), export (carry out).'
        },
        {
          id: 'v-practice-3',
          type: 'vocabulary',
          question: 'What does the prefix "sub-" mean?',
          options: ['above', 'under', 'between', 'around'],
          correctIndex: 1,
          explanation: '"Sub-" means under, below, or beneath, as in submarine (under the sea), subway (underground way).'
        }
      );
    }

    if (weakAreas.some(w => w.type === 'grammar')) {
      questions.push(
        {
          id: 'g-practice-1',
          type: 'grammar',
          question: 'Choose the correct sentence:',
          options: [
            'He have been working here for two years.',
            'He has been working here for two years.',
            'He has been working here since two years.',
            'He have been working here since two years.'
          ],
          correctIndex: 1,
          explanation: 'Present perfect continuous: "has been" + verb-ing. Use "for" with duration, "since" with a point in time.'
        },
        {
          id: 'g-practice-2',
          type: 'grammar',
          question: 'The package _____ yesterday.',
          options: ['delivered', 'was delivered', 'has delivered', 'is delivered'],
          correctIndex: 1,
          explanation: 'Past simple passive: "was/were" + past participle. The package received the action (passive voice).'
        }
      );
    }

    if (weakAreas.some(w => w.type === 'reading')) {
      questions.push(
        {
          id: 'r-practice-1',
          type: 'reading',
          question: 'Read: "The experiment failed due to insufficient funding, despite the researchers\' best efforts." What was the main cause of failure?',
          options: ['Lack of researcher effort', 'Insufficient funding', 'Poor experimental design', 'Technical difficulties'],
          correctIndex: 1,
          explanation: 'The phrase "due to insufficient funding" directly states the cause. The phrase "despite the researchers\' best efforts" indicates they tried hard but funding was the issue.'
        },
        {
          id: 'r-practice-2',
          type: 'reading',
          question: 'What can you infer? "Most students prefer online classes, but traditional classroom courses still have higher completion rates."',
          options: ['Online classes are better for learning', 'Traditional classes are more popular', 'Popularity does not always equal effectiveness', 'Students prefer completing courses'],
          correctIndex: 2,
          explanation: 'The contrast between "prefer" (preference) and "higher completion rates" (actual outcome) suggests that what people prefer (online) is not always what leads to better results (traditional).'
        }
      );
    }

    return questions;
  };

  const questions = generatePracticeQuestions();
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === currentQuestion.correctIndex;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // 显示解释后延迟进入下一题
    setTimeout(() => {
      setShowExplanation(true);
    }, 500);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 练习完成
      onComplete();
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
  };

  const getTypeIcon = (type: PracticeQuestion['type']) => {
    switch (type) {
      case 'vocabulary': return <BookOpen className="w-5 h-5" />;
      case 'grammar': return <Target className="w-5 h-5" />;
      case 'reading': return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: PracticeQuestion['type']) => {
    switch (type) {
      case 'vocabulary': return 'text-indigo-600 bg-indigo-50';
      case 'grammar': return 'text-purple-600 bg-purple-50';
      case 'reading': return 'text-pink-600 bg-pink-50';
    }
  };

  // 练习完成视图
  if (currentQuestionIndex >= questions.length) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">练习完成!</h2>
          <p className="text-gray-600 mb-6">
            您在 {questions.length} 道题中答对了 {score} 道
          </p>

          <div className="text-5xl font-bold mb-6">
            <span className={percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}>
              {percentage}%
            </span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600">
              {percentage >= 80 ? '太棒了! 您已经很好地掌握了这部分内容。' :
               percentage >= 60 ? '做得不错! 继续加强薄弱环节。' :
               '需要多加练习,建议重新学习相关知识点。'}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              重新练习
            </button>
            <button
              onClick={onComplete}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${getTypeColor(currentQuestion.type)}`}>
            {getTypeIcon(currentQuestion.type)}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              专项练习 - {currentQuestion.type === 'vocabulary' ? '词汇' : currentQuestion.type === 'grammar' ? '语法' : '阅读'}
            </h2>
            <p className="text-sm text-gray-500">题目 {currentQuestionIndex + 1} / {questions.length}</p>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-600">
          得分: {score}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-lg text-gray-900">{currentQuestion.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, index) => {
          let optionClass = 'bg-gray-50 hover:bg-gray-100 border-gray-200';
          let showIcon = null;

          if (selectedAnswer !== null) {
            if (index === currentQuestion.correctIndex) {
              optionClass = 'bg-green-50 border-green-300';
              showIcon = <CheckCircle className="w-5 h-5 text-green-600" />;
            } else if (index === selectedAnswer && index !== currentQuestion.correctIndex) {
              optionClass = 'bg-red-50 border-red-300';
              showIcon = <XCircle className="w-5 h-5 text-red-600" />;
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`
                w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3
                ${optionClass}
                ${selectedAnswer === null ? 'hover:border-indigo-300' : ''}
                ${selectedAnswer !== null ? 'cursor-default' : ''}
              `}
            >
              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <span className="flex-1">{option}</span>
              {showIcon}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="bg-indigo-50 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-indigo-900 mb-2">解析</h4>
          <p className="text-indigo-700">{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {selectedAnswer !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
        >
          {currentQuestionIndex < questions.length - 1 ? '下一题' : '查看结果'}
        </button>
      )}
    </div>
  );
}
