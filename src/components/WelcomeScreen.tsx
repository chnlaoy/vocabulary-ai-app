import { BookOpen, ArrowRight, Clock, Target, CheckCircle } from 'lucide-react';

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            英语水平测试
          </h1>
          <p className="text-lg text-gray-600">
            完成测试，我们将为您推荐适合的词汇学习难度
          </p>
        </div>

        {/* Test Info */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="text-center p-4 bg-indigo-50 rounded-xl">
            <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-sm text-gray-600">题目数量</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600">测试维度</div>
          </div>
          <div className="text-center p-4 bg-pink-50 rounded-xl">
            <CheckCircle className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-600">预计分钟</div>
          </div>
        </div>

        {/* Test Types */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">测试内容</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-semibold">V</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">词汇理解</div>
                <div className="text-sm text-gray-600">词根词缀、同义词辨析</div>
              </div>
              <div className="text-sm text-gray-500">5 题</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-semibold">G</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">语法知识</div>
                <div className="text-sm text-gray-600">时态、语态、从句结构</div>
              </div>
              <div className="text-sm text-gray-500">5 题</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-semibold">R</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">阅读理解</div>
                <div className="text-sm text-gray-600">主旨概括、推断分析</div>
              </div>
              <div className="text-sm text-gray-500">5 题</div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          开始测试
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
