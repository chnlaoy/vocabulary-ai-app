export interface WordExample {
  sentence: string;
  translation: string;
  context: string;
  category?: 'daily' | 'media' | 'formal';
}

export interface RootInfo {
  form: string;
  meaning: string;
  origin: string;
}

export interface AffixInfo {
  form: string;
  meaning: string;
}

export interface EtymologyStep {
  period: string;
  form: string;
  meaning: string;
}

export interface WordCard {
  id: string;
  word: string;
  frequency: number;
  partOfSpeech: string;
  definition: string;
  prefix?: AffixInfo;
  root: RootInfo;
  suffix?: AffixInfo;
  memoryTip: string;
  etymology: EtymologyStep[];
  examples: WordExample[];
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export const wordCards: WordCard[] = [
  {
    id: 'w1',
    word: 'transport',
    frequency: 95,
    partOfSpeech: 'verb/noun',
    definition: ' transporting goods or people from one place to another',
    prefix: { form: 'trans-', meaning: 'across, beyond' },
    root: { form: 'port', meaning: 'carry', origin: 'Latin' },
    memoryTip: 'Think of a "portable" speaker you "carry" across the room.',
    etymology: [
      { period: 'Latin', form: 'transportare', meaning: 'to carry across' },
      { period: 'Middle English', form: 'transport', meaning: 'to move from one place to another' }
    ],
    examples: [
      { sentence: 'I usually take public transport to get to the city center.', translation: '我通常乘坐公共交通工具去市中心。', context: '通勤日常', category: 'daily' },
      { sentence: 'The logistics company handles the transport of fragile goods.', translation: '这家物流公司负责易碎货物的运输。', context: '商业对话', category: 'formal' },
      { sentence: 'In the movie Interstellar, they transport humans to a new planet.', translation: '在电影《星际穿越》中，他们将人类运输到一颗新行星上。', context: '电影场景', category: 'media' }
    ],
    difficulty: 'easy',
    tags: ['logistics', 'movement', 'basic']
  },
  {
    id: 'w2',
    word: 'inspect',
    frequency: 80,
    partOfSpeech: 'verb',
    definition: 'looking at something closely to check its condition',
    prefix: { form: 'in-', meaning: 'into, inside' },
    root: { form: 'spect', meaning: 'look, see', origin: 'Latin' },
    memoryTip: 'Think of a "spectator" who "looks" at a game.',
    etymology: [
      { period: 'Latin', form: 'inspicere', meaning: 'to look into' },
      { period: 'Middle English', form: 'inspect', meaning: 'to examine carefully' }
    ],
    examples: [
      { sentence: 'Can you inspect the car for any scratches before we buy it?', translation: '在我们买之前，你能检查一下车上有没划痕吗？', context: '买车日常', category: 'daily' },
      { sentence: 'The health officer came to inspect the restaurant kitchen.', translation: '卫生监督员来检查餐厅的厨房了。', context: '卫生检查', category: 'formal' },
      { sentence: 'Sherlock Holmes carefully inspected the mud on the boots.', translation: '夏洛克·福尔摩斯仔细检查了靴子上的泥土。', context: '影视名作', category: 'media' }
    ],
    difficulty: 'easy',
    tags: ['examine', 'careful', 'basic']
  },
  {
    id: 'w3',
    word: 'biography',
    frequency: 60,
    partOfSpeech: 'noun',
    definition: 'the story of a person\'s life written by someone else',
    prefix: { form: 'bio-', meaning: 'life' },
    root: { form: 'graph', meaning: 'write, draw', origin: 'Greek' },
    memoryTip: 'Bio (life) + Graph (write) = writing about a life.',
    etymology: [
      { period: 'Greek', form: 'bios', meaning: 'life' },
      { period: 'Greek', form: 'graphia', meaning: 'writing' }
    ],
    examples: [
      { sentence: 'I\'m reading a fascinating biography of Elon Musk.', translation: '我正在读一本关于埃隆·马斯克的精彩传记。', context: '阅读分享', category: 'daily' },
      { sentence: 'The library has a complete biography of Winston Churchill.', translation: '图书馆里有温斯顿·丘吉尔的完整传记。', context: '图书馆查询', category: 'formal' },
      { sentence: 'The movie is a cinematic biography of the legendary singer.', translation: '这部电影是关于这位传奇歌手的电影传记。', context: '电影评论', category: 'media' }
    ],
    difficulty: 'medium',
    tags: ['life', 'writing', 'literature']
  },
  {
    id: 'w4',
    word: 'telephone',
    frequency: 90,
    partOfSpeech: 'noun/verb',
    definition: 'a system for transmitting voices over a distance',
    prefix: { form: 'tele-', meaning: 'far, distant' },
    root: { form: 'phone', meaning: 'sound, voice', origin: 'Greek' },
    memoryTip: 'Telescope (far sight) + Phone (sound) = far sound.',
    etymology: [
      { period: 'Greek', form: 'tele', meaning: 'far' },
      { period: 'Greek', form: 'phone', meaning: 'sound' }
    ],
    examples: [
      { sentence: 'I\'ll give you a telephone call as soon as I land.', translation: '我一落地就给你打个电话。', context: '旅行沟通', category: 'daily' },
      { sentence: 'The telephone was a revolutionary invention in the 19th century.', translation: '电话是 19 世纪的一项革命性发明。', context: '历史知识', category: 'formal' },
      { sentence: 'In old noir films, the telephone is often a key plot device.', translation: '在旧的黑色电影中，电话经常是关键的剧情道具。', context: '影视分析', category: 'media' }
    ],
    difficulty: 'easy',
    tags: ['communication', 'tech', 'basic']
  },
  {
    id: 'w5',
    word: 'contradict',
    frequency: 70,
    partOfSpeech: 'verb',
    definition: 'to say the opposite of what someone else has said',
    prefix: { form: 'contra-', meaning: 'against, opposite' },
    root: { form: 'dict', meaning: 'say, speak', origin: 'Latin' },
    memoryTip: 'Contra (opposite) + Dict (say) = say the opposite.',
    etymology: [
      { period: 'Latin', form: 'contradictio', meaning: 'speaking against' },
      { period: 'Middle English', form: 'contradict', meaning: 'to deny or oppose' }
    ],
    examples: [
      { sentence: 'I don\'t want to contradict you, but I think you\'re wrong.', translation: '我不想反驳你，但我觉得你错了。', context: '日常争论', category: 'daily' },
      { sentence: 'The new evidence seems to contradict the witness\'s statement.', translation: '新证据似乎与证人的陈述相矛盾。', context: '法律场景', category: 'formal' },
      { sentence: 'The plot twist in the end completely contradicts everything we saw.', translation: '结尾的剧情反转完全颠覆了我们之前看到的一切。', context: '剧评分享', category: 'media' }
    ],
    difficulty: 'medium',
    tags: ['argument', 'logic', 'speaking']
  },
  {
    id: 'w6',
    word: 'submarine',
    frequency: 40,
    partOfSpeech: 'noun/adj',
    definition: 'a ship that can travel under water',
    prefix: { form: 'sub-', meaning: 'under, below' },
    root: { form: 'marine', meaning: 'sea', origin: 'Latin' },
    memoryTip: 'Sub (under) + Marine (sea) = under the sea.',
    etymology: [
      { period: 'Latin', form: 'sub', meaning: 'under' },
      { period: 'Latin', form: 'marinus', meaning: 'of the sea' }
    ],
    examples: [
      { sentence: 'I\'ve always been curious about how a submarine works.', translation: '我一直很好奇潜水艇是如何工作的。', context: '兴趣讨论', category: 'daily' },
      { sentence: 'The Navy deployed a nuclear-powered submarine to the region.', translation: '海军向该地区部署了一艘核潜艇。', context: '军事新闻', category: 'formal' },
      { sentence: 'The submarine scenes in The Hunt for Red October are iconic.', translation: '《红色十月》中的潜艇场景非常经典。', context: '电影讨论', category: 'media' }
    ],
    difficulty: 'medium',
    tags: ['ocean', 'navy', 'tech']
  },
  {
    id: 'w7',
    word: 'philanthropy',
    frequency: 50,
    partOfSpeech: 'noun',
    definition: 'the desire to promote the welfare of others, expressed by generous donations',
    prefix: { form: 'phil-', meaning: 'love' },
    root: { form: 'anthrop', meaning: 'human', origin: 'Greek' },
    suffix: { form: '-y', meaning: 'state or quality' },
    memoryTip: 'Phil (love) + Anthrop (human) = love of humans.',
    etymology: [
      { period: 'Greek', form: 'philein', meaning: 'to love' },
      { period: 'Greek', form: 'anthropos', meaning: 'human' }
    ],
    examples: [
      { sentence: 'Her philanthropy has helped thousands of children go to school.', translation: '她的慈善事业帮助了数千名儿童入学。', context: '社会话题', category: 'daily' },
      { sentence: 'The foundation is known for its global philanthropy in healthcare.', translation: '该基金会以其在医疗保健领域的全球慈善事业而闻名。', context: '组织介绍', category: 'formal' },
      { sentence: 'The documentary explores the complex motives behind his philanthropy.', translation: '这部纪录片探讨了他从事慈善事业背后复杂的动机。', context: '纪录片', category: 'media' }
    ],
    difficulty: 'hard',
    tags: ['charity', 'society', 'humanity']
  },
  {
    id: 'w8',
    word: 'psychology',
    frequency: 85,
    partOfSpeech: 'noun',
    definition: 'the scientific study of the human mind and its functions',
    prefix: { form: 'psych-', meaning: 'mind, soul' },
    root: { form: 'logy', meaning: 'study of', origin: 'Greek' },
    memoryTip: 'Psych (mind) + Logy (study) = study of the mind.',
    etymology: [
      { period: 'Greek', form: 'psyche', meaning: 'soul/mind' },
      { period: 'Greek', form: 'logos', meaning: 'word/study' }
    ],
    examples: [
      { sentence: 'I\'m taking a psychology class to understand people better.', translation: '我选了一门心理学课，为了更好地了解人们。', context: '校园生活', category: 'daily' },
      { sentence: 'Consumer psychology plays a huge role in modern marketing.', translation: '消费心理学在现代营销中起着巨大的作用。', context: '商业分析', category: 'formal' },
      { sentence: 'The movie Inception is like a deep dive into the psychology of dreams.', translation: '电影《盗梦空间》就像是对梦境心理学的深度探讨。', context: '影评', category: 'media' }
    ],
    difficulty: 'medium',
    tags: ['mind', 'science', 'behavior']
  }
];
