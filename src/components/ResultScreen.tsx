import { Trophy, Target, TrendingUp, ArrowRight, BookOpen, XCircle, Lightbulb, CheckCircle, Calendar, Video, FileText, Search, Edit } from 'lucide-react';
import { levelDescriptions, generateRecommendations, getRecommendedFeatures, type FeatureModule } from '../data/proficiency-test';
import type { TestResult, LearningRecommendation } from '../data/proficiency-test';
import { useState } from 'react';
import { FeatureModal } from './FeatureModal';
import { WordFamilyTree } from './WordFamilyTree';
import { PracticeQuiz } from './PracticeQuiz';
import { RootDailyLearner } from './RootDailyLearner';

export function ResultScreen({
  result,
  onContinue,
  onRetest
}: {
  result: TestResult;
  onContinue: () => void;
  onRetest: () => void;
}) {
  const levelInfo = levelDescriptions[result.level];
  const recommendations = generateRecommendations(result);
  const recommendedFeatures = getRecommendedFeatures(result);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'features'>('recommendations');
  const [selectedFeature, setSelectedFeature] = useState<FeatureModule | null>(null);
  const [activeFeatureComponent, setActiveFeatureComponent] = useState<string | null>(null);

  const getScoreColor = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 80) return 'text-green-600';
    if (pct >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 80) return 'bg-green-100';
    if (pct >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getCategoryIcon = (category: LearningRecommendation['category']) => {
    switch (category) {
      case 'study-plan': return <Lightbulb className="w-5 h-5" />;
      case 'weakness-focus': return <Target className="w-5 h-5" />;
      case 'daily-practice': return <Calendar className="w-5 h-5" />;
      case 'resources': return <Video className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getFeatureIcon = (iconName: string) => {
    // 根据功能ID返回对应的图标
    switch (iconName) {
      case 'Trees':
        // 使用 Lucide 图标库
        return <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-lg">🌳</span>;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'Calendar':
        return <Calendar className="w-6 h-6" />;
      case 'Search':
        return <Search className="w-6 h-6" />;
      case 'FileText':
        return <FileText className="w-6 h-6" />;
      case 'Edit':
        return <Edit className="w-6 h-6" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Lightbulb className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-10">
        {/* Header with Trophy */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">测试完成！</h1>
          <p className="text-gray-600">您的英语水平评估结果如下</p>
        </div>

        {/* Score Card */}
        <div className={`rounded-2xl p-6 mb-8 ${levelInfo.color} text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm opacity-90 mb-1">您的等级</div>
              <div className="text-2xl font-bold">{levelInfo.title}</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-1">总得分</div>
              <div className="text-2xl font-bold">{result.score} / {result.total}</div>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <div className="text-sm opacity-90">学习建议</div>
            <div className="text-base font-medium">{levelInfo.description}</div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className={`p-4 rounded-xl ${getScoreBg(result.vocabularyScore, 5)}`}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5" />
              <div className="text-sm font-medium text-gray-600">词汇</div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.vocabularyScore, 5)}`}>
              {result.vocabularyScore}
            </div>
            <div className="text-xs text-gray-500">/ 5</div>
          </div>

          <div className={`p-4 rounded-xl ${getScoreBg(result.grammarScore, 5)}`}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <div className="text-sm font-medium text-gray-600">语法</div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.grammarScore, 5)}`}>
              {result.grammarScore}
            </div>
            <div className="text-xs text-gray-500">/ 5</div>
          </div>

          <div className={`p-4 rounded-xl ${getScoreBg(result.readingScore, 5)}`}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <div className="text-sm font-medium text-gray-600">阅读</div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.readingScore, 5)}`}>
              {result.readingScore}
            </div>
            <div className="text-xs text-gray-500">/ 5</div>
          </div>
        </div>

        {/* Wrong Answers */}
        {result.wrongAnswers.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              答错题目 ({result.wrongAnswers.length})
            </h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {result.wrongAnswers.map((wrong, index) => (
                <div key={index} className="bg-white rounded-xl p-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {wrong.question}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span className="text-gray-600">{wrong.userAnswer}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-900 font-medium">{wrong.correctAnswer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Recommendations */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            个性化学习建议
          </h3>

          {/* Tab Buttons */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              学习建议
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'features'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              推荐功能 ({recommendedFeatures.length})
            </button>
          </div>

          {/* Learning Recommendations Content */}
          {activeTab === 'recommendations' && (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        {getCategoryIcon(rec.category)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority === 'high' ? '优先' : rec.priority === 'medium' ? '重要' : '参考'}
                    </span>
                  </div>

                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">学习要点:</h5>
                    <ul className="space-y-1">
                      {rec.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">相关功能:</h5>
                    <div className="flex flex-wrap gap-2">
                      {rec.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommended Features Content */}
          {activeTab === 'features' && (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {recommendedFeatures.length > 0 ? (
                recommendedFeatures.map((feature) => (
                  <div key={feature.id} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        {getFeatureIcon(feature.icon)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{feature.name}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    {feature.targetWeakAreas && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {feature.targetWeakAreas.map((area) => (
                          <span
                            key={area}
                            className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs"
                          >
                            针对 {area === 'vocabulary' ? '词汇' : area === 'grammar' ? '语法' : '阅读'}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setSelectedFeature(feature)}
                        className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center gap-1"
                      >
                        了解更多
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>您的基础很好,继续保持当前学习节奏!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Feature Component */}
        {activeFeatureComponent === 'word-family-tree' && (
          <div className="mb-6">
            <button
              onClick={() => setActiveFeatureComponent(null)}
              className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              返回结果页面
            </button>
            <WordFamilyTree />
          </div>
        )}

        {activeFeatureComponent === 'practice-quiz' && (
          <div className="mb-6">
            <button
              onClick={() => setActiveFeatureComponent(null)}
              className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              返回结果页面
            </button>
            <PracticeQuiz weakAreas={result.weakAreas} onComplete={() => setActiveFeatureComponent(null)} />
          </div>
        )}

        {activeFeatureComponent === 'root-daily-learner' && (
          <div className="mb-6">
            <button
              onClick={() => setActiveFeatureComponent(null)}
              className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              返回结果页面
            </button>
            <RootDailyLearner onComplete={() => setActiveFeatureComponent(null)} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            开始学习
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onRetest}
            className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-200"
          >
            重新测试
          </button>
        </div>
      </div>

      {/* Feature Modal */}
      <FeatureModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onStartFeature={() => {
          if (selectedFeature?.id === 'word-family-tree') {
            setActiveFeatureComponent('word-family-tree');
          } else if (selectedFeature?.id === 'practice-quiz') {
            setActiveFeatureComponent('practice-quiz');
          } else {
            onContinue();
          }
        }}
      />
    </div>
  );
}
