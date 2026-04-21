import { X, Play, CheckCircle } from 'lucide-react';
import type { FeatureModule } from '../data/proficiency-test';

interface FeatureModalProps {
  feature: FeatureModule | null;
  onClose: () => void;
  onStartFeature?: () => void;
}

export function FeatureModal({ feature, onClose, onStartFeature }: FeatureModalProps) {
  if (!feature) return null;

  const getFeatureContent = (featureId: string) => {
    const contents: Record<string, { description: string; steps: string[]; benefits: string[] }> = {
      'word-family-tree': {
        description: '词族树可视化功能帮助您建立词汇网络,通过词根和词缀的关系,将相关单词以树状图形式展示。',
        steps: [
          '选择一个词根作为中心节点',
          '查看该词根的所有派生词和同源词',
          '点击单词查看详细词源信息',
          '通过视觉关联加深记忆印象'
        ],
        benefits: [
          '建立系统性词汇网络',
          '提升单词记忆效率',
          '理解单词构成逻辑',
          '培养词根词缀敏感度'
        ]
      },
      'practice-quiz': {
        description: '针对您的薄弱环节,提供专项练习题,帮助您有针对性地提升。',
        steps: [
          '根据测试结果选择练习类型',
          '完成选择题、填空题等练习',
          '查看详细解析和错误分析',
          '错题自动加入复习计划'
        ],
        benefits: [
          '精准定位薄弱环节',
          '即学即练巩固知识',
          '详细解析帮助理解',
          '错题本功能避免重复错误'
        ]
      },
      'review-schedule': {
        description: '基于艾宾浩斯遗忘曲线,智能安排复习时间,让记忆更持久。',
        steps: [
          '学习新词汇后自动安排首次复习',
          '系统在最佳时间点推送复习提醒',
          '完成复习后调整下次复习时间',
          '可查看个人记忆曲线'
        ],
        benefits: [
          '科学记忆,避免遗忘',
          '提高学习效率',
          '节省复习时间',
          '个性化复习计划'
        ]
      },
      'etymology-explorer': {
        description: '深度解析单词的词源和历史演变,了解单词从古代到现代的发展轨迹。',
        steps: [
          '选择一个单词或词根',
          '查看单词的历史演变过程',
          '学习相关的前缀后缀',
          '理解文化背景对词义的影响'
        ],
        benefits: [
          '深入理解单词含义',
          '学习历史文化知识',
          '提升语言兴趣',
          '建立长期记忆'
        ]
      },
      'reading-comprehension': {
        description: '提供分级阅读材料,帮助您提升阅读理解和词汇在实际语境中的应用能力。',
        steps: [
          '选择适合自己难度的阅读材料',
          '阅读过程中遇到生词可即时查看',
          '完成阅读理解练习题',
          '积累高频词汇和表达'
        ],
        benefits: [
          '提升阅读速度和理解力',
          '积累实际应用经验',
          '扩大词汇量',
          '培养英语思维'
        ]
      },
      'grammar-drills': {
        description: '通过填空练习巩固语法知识,系统化掌握英语语法规则。',
        steps: [
          '选择语法知识点进行练习',
          '完成句子填空和改错题',
          '查看详细的语法解析',
          '记录常见语法错误'
        ],
        benefits: [
          '系统掌握语法规则',
          '提升语言准确度',
          '避免常见语法错误',
          '增强句子分析能力'
        ]
      },
      'progress-tracker': {
        description: '可视化展示学习进度和成果,激励您持续学习。',
        steps: [
          '查看每日、每周、每月学习统计',
          '追踪词汇掌握情况',
          '对比学习前后水平变化',
          '设置学习目标和里程碑'
        ],
        benefits: [
          '清晰了解学习进度',
          '增强学习动力',
          '发现学习问题',
          '制定合理学习计划'
        ]
      }
    };

    return contents[featureId] || {
      description: feature.description,
      steps: ['点击开始使用该功能'],
      benefits: ['提升学习效率']
    };
  };

  const content = getFeatureContent(feature.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{feature.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <p className="text-gray-700 mb-6">{content.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">使用步骤</h3>
            <ol className="space-y-3">
              {content.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">学习收益</h3>
            <div className="grid grid-cols-2 gap-3">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-all"
            >
              关闭
            </button>
            <button
              onClick={() => {
                onStartFeature?.();
                onClose();
              }}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              开始使用
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
