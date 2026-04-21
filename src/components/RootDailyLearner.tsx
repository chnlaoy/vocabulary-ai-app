import { useState, useEffect } from 'react';
import { getSortedRoots, type WordRoot } from '../data/word-roots';

export function RootDailyLearner({ onComplete }: { onComplete: () => void }) {
  const [dailyCount, setDailyCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPronouncing, setIsPronouncing] = useState(false);
  const [pronunciationText, setPronunciationText] = useState('');
  
  const roots = getSortedRoots(dailyCount);
  const currentRoot = roots[currentIndex];

  // Handle text-to-speech for spelling and pronunciation
  const pronounceRoot = async () => {
    if (!currentRoot) return;
    
    setIsPronouncing(true);
    // Spell out each letter
    const spelled = currentRoot.root.split('').join(' ');
    setPronunciationText(spelled);
    
    // In a real app, this would use Web Speech API or a TTS service
    // For demo, we'll simulate with a timeout
    setTimeout(() => {
      setPronunciationText(`${currentRoot.root} - ${currentRoot.meaning}`);
      setTimeout(() => {
        setIsPronouncing(false);
      }, 1500);
    }, 1000);
  };

  const handleNext = () => {
    if (currentIndex < roots.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
    } else {
      // Completed all roots
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowExplanation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            每日词根学习
          </h1>
          <p className="text-gray-600">
            学习 {dailyCount} 个高频词根，按使用频率排序
          </p>
        </div>

        {/* Daily Count Selector */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-gray-700">每日学习数量:</span>
            <select
              value={dailyCount}
              onChange={(e) => {
                setDailyCount(parseInt(e.target.value));
                setCurrentIndex(0);
                setShowExplanation(false);
              }}
              className="px-3 py-1 border rounded text-sm"
            >
              {[2, 3, 4, 5].map(count => (
                <option key={count} value={count}>
                  {count} 个词根
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-500">
            词根已按照使用频率从高到低排序
          </p>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-600">
              进度: {currentIndex + 1}/{roots.length}
            </span>
            <span className="text-sm text-gray-500">
              {roots.map((r, i) => 
                i < currentIndex ? '●' : i === currentIndex ? '○' : '◯'
              ).join(' ')}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
              style={{ width: `${((currentIndex + 1) / roots.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Root Card */}
        {currentRoot && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-3">
              {currentRoot.root}
            </div>
            
            {/* Pronunciation Button */}
            <button
              onClick={pronounceRoot}
              disabled={isPronouncing}
              className="mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors flex items-center justify-center gap-2"
            >
              {isPronouncing ? (
                <span className="animate-pulse">正在发音...</span>
              ) : (
                <>
                  <span className="text-xs">发音:</span>
                  <span className="font-mono">{currentRoot.root.split('').join(' ')}</span>
                </>
              )}
            </button>
            
            {/* Pronunciation Display */}
            {pronunciationText && (
              <div className="mb-4 p-3 bg-gray-50 rounded text-indigo-600 font-mono">
                {pronunciationText}
              </div>
            )}
            
            <div className="text-xl font-semibold text-gray-800 mb-2">
              {currentRoot.meaning}
            </div>
            
            {/* Example Sentence */}
            <div className="mt-4 p-4 bg-white rounded-xl">
              <p className="text-gray-700 italic">
                "{currentRoot.example}"
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {currentRoot.exampleTranslation}
              </p>
            </div>
          </div>
        )}

        {/* Explanation Section */}
        {currentRoot && (
          <div className="mb-6">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-flex items-center justify-between p-3 bg-gray-50 rounded-lg text-left text-gray-600 hover:text-gray-800"
            >
              <span>
                {showExplanation ? '收起详细讲解' : '查看详细讲解（词源、用法等）'}
              </span>
              <span className="transition-transform duration-200">
                {showExplanation ? '▲' : '▼'}
              </span>
            </button>
            
            {showExplanation && (
              <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">详细讲解</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>词根含义:</strong> {currentRoot.meaning}</p>
                  <p><strong>使用频率:</strong> 高频词根（排序位置：${roots.findIndex(r => r.id === currentRoot.id) + 1}/${roots.length}）</p>
                  <p><strong>常见变形:</strong> 
                    {currentRoot.root === 'port' ? 'portable, transportation, export, important' :
                     currentRoot.root === 'spect' ? 'spectator, inspect, respect, perspective' :
                     currentRoot.root === 'phone' ? 'telephone, microphone, saxophone, symphony' :
                     currentRoot.root === 'bio' ? 'biology, biography, antibiotic, symbiosis' :
                     currentRoot.root === 'graph' ? 'graphic, paragraph, autograph, biography' :
                     currentRoot.root === 'dict' ? 'dictate, dictionary, predict, contradict' :
                     currentRoot.root === 'struct' ? 'structure, construct, destroy, instruct' :
                     currentRoot.root === 'ject' ? 'ject, inject, eject, subject' :
                     currentRoot.root === 'vert' ? 'vert, convert, invert, avert' :
                     currentRoot.root === 'form' ? 'form, format, inform, transform' :
                     currentRoot.root === 'tract' ? 'tract, attract, extract, contract' :
                     currentRoot.root === 'cede' ? 'cede, concede, precede, proceed' :
                     currentRoot.root === 'fer' ? 'fer, transfer, refer, prefer' :
                     currentRoot.root === 'duc' ? 'duct, introduce, produce, reduce' :
                     currentRoot.root === 'mit' ? 'mit, permit, commit, transmit' :
                     currentRoot.root === 'ven' ? 'ven, convene, invent, prevent' :
                     currentRoot.root === 'script' ? 'script, prescription, description, manuscript' :
                     currentRoot.root === 'pel' ? 'pel, propel, compel, repel' :
                     currentRoot.root === 'leg' ? 'leg, legal, privilege, legislation' : ''
                    }
                  </p>
                  <p><strong>记忆技巧:</strong> 将词根与日常生活场景关联，例如"{currentRoot.exampleTranslation}"</p>
                  <p><strong>扩展建议:</strong> 每学习一个词根，尝试想出3个相关单词并造句</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        {currentRoot && (
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 flex items-center gap-2"
            >
              <span>← 上一个</span>
            </button>
            
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
            >
              <span>
                {currentIndex < roots.length - 1 ? '下一个 →' : '完成学习'}
              </span>
              {!((currentIndex < roots.length - 1)) && (
                <span className="ml-2">🎉</span>
              )}
            </button>
          </div>
        )}
        
        {/* Completion Message */}
        {!currentRoot && currentIndex >= roots.length && (
           <div className="text-center py-8">
             <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
               <span className="text-green-600 text-xl">✓</span>
             </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">今日学习完成！</h2>
            <p className="text-gray-600">
              您今天学习了 {roots.length} 个高频词根，明天继续！
            </p>
            <button
              onClick={onComplete}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700"
            >
              返回结果页面
            </button>
          </div>
        )}
      </div>
    </div>
  );
}