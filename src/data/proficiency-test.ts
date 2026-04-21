export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: string;
  type: 'vocabulary' | 'grammar' | 'reading';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string; // 必须提供解析
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TestResult {
  level: DifficultyLevel;
  score: number;
  total: number;
  vocabularyScore: number;
  grammarScore: number;
  readingScore: number;
  wrongAnswers: { question: string; userAnswer: string; correctAnswer: string }[];
  weakAreas: { type: 'vocabulary' | 'grammar' | 'reading'; score: number }[];
}

export const proficiencyQuestions: Question[] = [
  // 词汇题 - 考察词根词缀理解
  {
    id: 'v1',
    type: 'vocabulary',
    difficulty: 'easy',
    question: 'Which word means "the study of the mind"?',
    options: ['biography', 'psychology', 'philosophy', 'biology'],
    correctIndex: 1,
    explanation: 'Psychology comes from Greek "psycho-" (mind) + "-logy" (study of). Biography is writing about life, philosophy is love of wisdom, biology is study of life.'
  },
  {
    id: 'v2',
    type: 'vocabulary',
    difficulty: 'easy',
    question: 'The word "transport" comes from "trans-" (across) + "port" (carry). What does "transport" mean?',
    options: ['to stay in one place', 'to carry across', 'to look carefully', 'to speak clearly'],
    correctIndex: 1,
    explanation: '"Trans-" means across/through, "port" means to carry. So "transport" literally means "to carry across" from one place to another.'
  },
  {
    id: 'v3',
    type: 'vocabulary',
    difficulty: 'medium',
    question: 'Choose the best definition for "ubiquitous":',
    options: ['extremely rare', 'present everywhere', 'very ancient', 'completely temporary'],
    correctIndex: 1,
    explanation: '"Ubiquitous" comes from Latin "ubique" meaning "everywhere". It describes something that seems to be present everywhere at the same time, like smartphones or air pollution.'
  },
  {
    id: 'v4',
    type: 'vocabulary',
    difficulty: 'medium',
    question: 'What does the word "inspect" mean?',
    options: ['to look at carefully', 'to respect someone', 'to have doubts about', 'to wait for something'],
    correctIndex: 0,
    explanation: '"Inspect" comes from "in-" (into) + "spect" (to look). It means to look into or examine something carefully, like inspecting a car before buying it.'
  },
  {
    id: 'v5',
    type: 'vocabulary',
    difficulty: 'hard',
    question: 'What does "ephemeral" describe?',
    options: ['eternal', 'lasting a very short time', 'mysterious', 'energetic'],
    correctIndex: 1,
    explanation: '"Ephemeral" comes from Greek "ephemeros" meaning "lasting only one day". It describes something that is short-lived or fleeting, like a sunset, a flower that blooms for a day, or fashion trends.'
  },

  // 语法题
  {
    id: 'g1',
    type: 'grammar',
    difficulty: 'easy',
    question: 'Choose the correct sentence:',
    options: [
      'She don\'t like coffee.',
      'She doesn\'t likes coffee.',
      'She doesn\'t like coffee.',
      'She not like coffee.'
    ],
    correctIndex: 2,
    explanation: 'Third person singular in present tense uses "doesn\'t" + base verb (no "-s" on the verb). Correct: "She doesn\'t like."'
  },
  {
    id: 'g2',
    type: 'grammar',
    difficulty: 'easy',
    question: 'I have been working here _____ 2020.',
    options: ['since', 'for', 'from', 'during'],
    correctIndex: 0,
    explanation: '"Since" is used with a specific point in time (e.g., 2020, Monday, January). "For" is used with duration (e.g., 3 years, 2 hours).'
  },
  {
    id: 'g3',
    type: 'grammar',
    difficulty: 'medium',
    question: 'If I _____ you, I would accept the offer.',
    options: ['was', 'am', 'were', 'be'],
    correctIndex: 2,
    explanation: 'Second conditional (hypothetical present) always uses "were" for all subjects, even "I/he/she/it". Structure: If + past simple, would + base verb.'
  },
  {
    id: 'g4',
    type: 'grammar',
    difficulty: 'medium',
    question: 'The book _____ by millions of readers worldwide.',
    options: ['has read', 'is reading', 'has been read', 'was reading'],
    correctIndex: 2,
    explanation: 'Present perfect passive: "has been" (have + been) + past participle. The book is the receiver of the action (passive), so we use "has been read".'
  },
  {
    id: 'g5',
    type: 'grammar',
    difficulty: 'hard',
    question: 'Complete the sentence: "Had I known about the meeting, I _____ attended."',
    options: ['will have', 'would have', 'had', 'have'],
    correctIndex: 1,
    explanation: 'Third conditional (hypothetical past) structure: If + past perfect, would + have + past participle. "Had I known" is the inverted form of "If I had known".'
  },

  // 阅读理解题
  {
    id: 'r1',
    type: 'reading',
    difficulty: 'easy',
    question: 'Read and answer: "The library opens at 9 AM and closes at 9 PM every day except Sunday, when it closes at 5 PM." At what time does the library close on Sunday?',
    options: ['9 AM', '5 PM', '9 PM', '10 PM'],
    correctIndex: 1,
    explanation: 'The text explicitly states "except Sunday, when it closes at 5 PM". Pay attention to the exception word "except".'
  },
  {
    id: 'r2',
    type: 'reading',
    difficulty: 'easy',
    question: 'What is the main idea? "Regular exercise improves heart health, boosts mood, and increases energy levels. It also helps maintain a healthy weight and reduces stress."',
    options: ['Exercise is boring', 'Exercise has many health benefits', 'Only athletes need exercise', 'Exercise makes you tired'],
    correctIndex: 1,
    explanation: 'The passage lists multiple benefits: heart health, mood, energy, weight management, and stress reduction. All these point to "many health benefits".'
  },
  {
    id: 'r3',
    type: 'reading',
    difficulty: 'medium',
    question: 'Read: "Despite the heavy rain, the hikers continued their journey because they were determined to reach the summit before sunset." What motivated the hikers?',
    options: ['The rain', 'Determination to reach the summit', 'Fear of getting wet', 'The sunset'],
    correctIndex: 1,
    explanation: 'The "because" clause tells us the motivation: "because they were determined to reach the summit before sunset". The rain was an obstacle, not motivation.'
  },
  {
    id: 'r4',
    type: 'reading',
    difficulty: 'medium',
    question: 'What can be inferred? "All employees must complete the safety training by Friday. Those who fail to do so will not be allowed to work on the factory floor."',
    options: ['The training is optional', 'The factory is closing', 'Training is mandatory for working on the floor', 'The training is free'],
    correctIndex: 2,
    explanation: '"Must" indicates requirement. The consequence for not completing is "will not be allowed to work", which implies the training is mandatory for working.'
  },
  {
    id: 'r5',
    type: 'reading',
    difficulty: 'hard',
    question: 'Read: "The study found a correlation between coffee consumption and longevity, though researchers emphasized that correlation does not imply causation. Other factors like diet and exercise also play roles." What is the main point?',
    options: ['Coffee definitely makes you live longer', 'Coffee has no effect on longevity', 'The link between coffee and longevity is uncertain due to other factors', 'Everyone should drink more coffee'],
    correctIndex: 2,
    explanation: 'The key phrase is "correlation does not imply causation". This means we can\'t conclude coffee causes longer lives because other factors (diet, exercise) might be the real cause.'
  }
];

export function calculateProficiencyLevel(answers: Record<string, number>): TestResult {
  let score = 0;
  let vocabularyScore = 0;
  let grammarScore = 0;
  let readingScore = 0;
  const wrongAnswers: TestResult['wrongAnswers'] = [];

  proficiencyQuestions.forEach(q => {
    const userAnswer = answers[q.id];
    if (userAnswer === q.correctIndex) {
      score++;
      if (q.type === 'vocabulary') vocabularyScore++;
      else if (q.type === 'grammar') grammarScore++;
      else readingScore++;
    } else {
      wrongAnswers.push({
        question: q.question,
        userAnswer: userAnswer === -1 ? '不确定' : (q.options[userAnswer] || '未回答'),
        correctAnswer: q.options[q.correctIndex]
      });
    }
  });

  // 确定难度等级（基于 15 题制）
  // 0-7 分 (0-47%): 初级学习者
  // 8-11 分 (53-73%): 中级学习者
  // 12-15 分 (80-100%): 高级学习者
  let level: DifficultyLevel;
  if (score >= 12) level = 'advanced';
  else if (score >= 8) level = 'intermediate';
  else level = 'beginner';

  // 分析薄弱环节（得分低于 3 分/5 分视为薄弱）
  const weakAreas: TestResult['weakAreas'] = [];
  if (vocabularyScore < 3) {
    weakAreas.push({ type: 'vocabulary', score: vocabularyScore });
  }
  if (grammarScore < 3) {
    weakAreas.push({ type: 'grammar', score: grammarScore });
  }
  if (readingScore < 3) {
    weakAreas.push({ type: 'reading', score: readingScore });
  }

  return {
    level,
    score,
    total: proficiencyQuestions.length,
    vocabularyScore,
    grammarScore,
    readingScore,
    wrongAnswers,
    weakAreas
  };
}

// 难度等级对应的描述
export const levelDescriptions: Record<DifficultyLevel, { title: string; description: string; color: string }> = {
  beginner: {
    title: '初级学习者',
    description: '适合从基础词汇和简单词根开始学习',
    color: 'bg-green-500'
  },
  intermediate: {
    title: '中级学习者',
    description: '可以学习中等难度的词根和扩展词汇',
    color: 'bg-yellow-500'
  },
  advanced: {
    title: '高级学习者',
    description: '适合挑战复杂词根和高阶词汇',
    color: 'bg-purple-500'
  }
};

// 个性化学习建议系统
export interface LearningRecommendation {
  category: 'study-plan' | 'weakness-focus' | 'daily-practice' | 'resources';
  title: string;
  description: string;
  tips: string[];
  features: string[];
  priority: 'high' | 'medium' | 'low';
}

// 根据测试结果生成个性化学习建议
export function generateRecommendations(result: TestResult): LearningRecommendation[] {
  const recommendations: LearningRecommendation[] = [];

  // 1. 基于整体水平的整体学习计划
  recommendations.push({
    category: 'study-plan',
    title: `${levelDescriptions[result.level].title}学习计划`,
    description: result.level === 'beginner'
      ? '建议从基础词根开始,掌握常用前缀后缀,建立词根词缀认知基础'
      : result.level === 'intermediate'
      ? '已掌握基础,建议扩展词根网络,学习派生词,提升词汇量'
      : '基础扎实,建议深入学习复杂词根,阅读英文原著,拓展应用场景',
    tips: result.level === 'beginner'
      ? [
          '每天学习 2-3 个新词根,理解其含义和常用搭配',
          '重点记忆 port, spect, phone 等高频词根',
          '从简单例句开始,逐步过渡到复杂句式',
          '使用词根卡片,反复记忆词根含义'
        ]
      : result.level === 'intermediate'
      ? [
          '每天学习 4-5 个中等难度词汇,关注词根变形',
          '学习 graph, dict, mar 等中等复杂度词根',
          '尝试用新学单词造句,巩固使用场景',
          '阅读适合水平的英文文章,积累语境理解'
        ]
      : [
          '每天学习 5-6 个高级词汇,关注同义词辨析',
          '学习 anthrop, psych, phil 等复杂词根',
          '阅读英文新闻、学术文章,提升理解深度',
          '尝试写作和翻译,主动应用高级词汇'
        ],
    features: result.level === 'beginner'
      ? ['难度分级学习', '词根速记法', '基础句型练习', '智能复习提醒']
      : result.level === 'intermediate'
      ? ['词族扩展学习', '例句实战', '阅读理解训练', '错题本功能']
      : ['深度词源解析', '同义词辨析', '高级阅读材料', '写作辅助'],
    priority: 'high'
  });

  // 2. 基于薄弱环节的专项建议
  if (result.weakAreas.length > 0) {
    const weaknessRecommendations: Record<string, { title: string; tips: string[] }> = {
      vocabulary: {
        title: '词汇专项强化',
        tips: [
          '使用词根记忆法,理解单词构成逻辑',
          '建立单词家族思维,如 port 系列: transport, export, import',
          '每天固定时间记忆新单词,利用艾宾浩斯遗忘曲线复习',
          '关注词根词缀的重复使用,如 trans-, in-, sub- 等前缀'
        ]
      },
      grammar: {
        title: '语法专项强化',
        tips: [
          '系统复习时态: 一般现在时、现在进行时、过去时',
          '掌握被动语态结构: be + past participle',
          '理解虚拟语气: 第二、第三条件句用法',
          '从句学习: 定语从句、名词性从句的基本结构'
        ]
      },
      reading: {
        title: '阅读专项强化',
        tips: [
          '练习快速阅读,抓住文章主旨和关键信息',
          '学会根据上下文猜测词义,不依赖字典',
          '分析文章结构: 主题句、支撑句、结论',
          '阅读后总结: 用自己的话复述文章内容'
        ]
      }
    };

    result.weakAreas.forEach(area => {
      const rec = weaknessRecommendations[area.type];
      if (rec) {
        recommendations.push({
          category: 'weakness-focus',
          title: rec.title,
          description: `您的${area.type === 'vocabulary' ? '词汇' : area.type === 'grammar' ? '语法' : '阅读'}得分为 ${area.score}/5,建议进行专项强化`,
          tips: rec.tips,
          features: ['专项练习题库', '错题解析视频', '进度跟踪', '个性化训练'],
          priority: 'high'
        });
      }
    });
  }

  // 3. 日常学习建议
  recommendations.push({
    category: 'daily-practice',
    title: '每日学习建议',
    description: '持续、规律的学习比突击学习更有效果',
    tips: [
      '每天固定学习 20-30 分钟,保持学习连贯性',
      '新词汇学习后 24 小时内复习一次,一周内复习两次',
      '睡前 10 分钟回顾当天学习内容,加深记忆',
      '每周总结一次本周学习的词根和词汇'
    ],
    features: ['学习提醒', '每日打卡', '学习统计', '周报总结'],
    priority: 'medium'
  });

  // 4. 学习资源推荐
  recommendations.push({
    category: 'resources',
    title: '推荐学习资源',
    description: '结合多种学习方式,提升学习效果',
    tips: [
      '使用词根词缀词典,深入了解单词构成',
      '观看英文视频,注意词汇的实际应用',
      '阅读分级读物,逐步提升阅读难度',
      '使用背单词 APP,碎片时间巩固记忆'
    ],
    features: ['词根词典', '视频教程', '分级阅读材料', '学习社区'],
    priority: 'low'
  });

  return recommendations;
}

// 功能模块定义
export interface FeatureModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  enabledFor: DifficultyLevel[];
  targetWeakAreas?: ('vocabulary' | 'grammar' | 'reading')[];
}

export const featureModules: FeatureModule[] = [
  {
    id: 'word-family-tree',
    name: '词族树可视化',
    icon: 'Tree',
    description: '以树状图展示词根及相关单词,帮助建立词汇网络',
    enabledFor: ['beginner', 'intermediate', 'advanced'],
    targetWeakAreas: ['vocabulary']
  },
  {
    id: 'practice-quiz',
    name: '专项练习题',
    icon: 'BookOpen',
    description: '针对薄弱环节提供专项练习题,实时反馈解析',
    enabledFor: ['beginner', 'intermediate', 'advanced'],
    targetWeakAreas: ['vocabulary', 'grammar', 'reading']
  },
  {
    id: 'root-daily-learner',
    name: '每日词根学习',
    icon: 'BookOpen',
    description: '自选每日学习词根数量,按使用频率排序,提供自然语音讲解和日常例句',
    enabledFor: ['beginner', 'intermediate', 'advanced'],
    targetWeakAreas: ['vocabulary']
  },
  {
    id: 'review-schedule',
    name: '智能复习计划',
    icon: 'Calendar',
    description: '基于艾宾浩斯遗忘曲线,安排最佳复习时间',
    enabledFor: ['beginner', 'intermediate', 'advanced']
  },
  {
    id: 'etymology-explorer',
    name: '词源探索器',
    icon: 'Search',
    description: '深度解析单词的词源和历史演变',
    enabledFor: ['intermediate', 'advanced'],
    targetWeakAreas: ['vocabulary']
  },
  {
    id: 'reading-comprehension',
    name: '阅读理解训练',
    icon: 'FileText',
    description: '提供分级阅读材料,提升阅读理解和词汇应用',
    enabledFor: ['intermediate', 'advanced'],
    targetWeakAreas: ['reading']
  },
  {
    id: 'grammar-drills',
    name: '语法填空',
    icon: 'Edit',
    description: '通过填空练习巩固语法知识',
    enabledFor: ['beginner', 'intermediate'],
    targetWeakAreas: ['grammar']
  },
  {
    id: 'progress-tracker',
    name: '学习进度追踪',
    icon: 'TrendingUp',
    description: '可视化展示学习进度和成果',
    enabledFor: ['beginner', 'intermediate', 'advanced']
  }
];

// 根据用户测试结果推荐功能模块
export function getRecommendedFeatures(result: TestResult): FeatureModule[] {
  return featureModules.filter(feature => {
    // 检查难度是否匹配
    if (!feature.enabledFor.includes(result.level)) {
      return false;
    }

    // 如果有薄弱环节且功能针对特定薄弱环节,检查是否匹配
    if (feature.targetWeakAreas && result.weakAreas.length > 0) {
      const hasWeakArea = feature.targetWeakAreas.some(target =>
        result.weakAreas.some(w => w.type === target)
      );
      return hasWeakArea;
    }

    return true;
  });
}
