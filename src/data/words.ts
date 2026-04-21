export interface WordExample {
  sentence: string;
  translation: string;
  context: string;
  category: 'daily' | 'media' | 'formal';
}

export interface RelatedWord {
  word: string;
  meaning: string;
}

export interface EtymologyStep {
  period: string;
  form: string;
  meaning: string;
}

export type WordDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface WordCard {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  difficulty: WordDifficulty;
  root: {
    form: string;
    meaning: string;
    origin: string;
  };
  prefix?: {
    form: string;
    meaning: string;
  };
  suffix?: {
    form: string;
    meaning: string;
  };
  etymology: EtymologyStep[];
  memoryTip: string;
  examples: WordExample[];
  relatedWords: RelatedWord[];
  tags: string[];
}

export const wordCards: WordCard[] = [
  {
    id: "1",
    word: "transport",
    phonetic: "/trænsˈpɔːrt/",
    partOfSpeech: "verb / noun",
    definition: "运输；将...从一地转移到另一地",
    difficulty: "beginner",
    root: {
      form: "port",
      meaning: "携带，运送",
      origin: "拉丁语 portare"
    },
    prefix: {
      form: "trans-",
      meaning: "穿越，跨越"
    },
    etymology: [
      { period: "拉丁语", form: "transportare", meaning: "运送过去" },
      { period: "古法语", form: "transporter", meaning: "运输，传送" },
      { period: "现代英语", form: "transport", meaning: "运输（动词/名词）" }
    ],
    memoryTip: "trans（跨越）+ port（携带）= 跨越地方运送 → 运输",
    examples: [
      {
        sentence: "The company transports goods across the country by rail.",
        translation: "这家公司通过铁路在全国运输货物。",
        context: "商业物流场景"
      },
      {
        sentence: "Public transport in this city is very efficient.",
        translation: "这座城市的公共交通非常高效。",
        context: "日常出行话题"
      },
      {
        sentence: "Reading this novel transported me to medieval England.",
        translation: "读这本小说把我带入了中世纪的英格兰。",
        context: "文学欣赏，引申为'精神上的穿越'"
      }
    ],
    relatedWords: [
      { word: "export", meaning: "出口（ex- 向外 + port 运送）" },
      { word: "import", meaning: "进口（im- 向内 + port 运送）" },
      { word: "report", meaning: "汇报（re- 回 + port 携带 = 把消息带回来）" },
      { word: "portable", meaning: "便携的（port + able 能...的）" },
      { word: "porter", meaning: "搬运工（port + er 人）" }
    ],
    tags: ["商务", "交通", "日常"]
  },
  {
    id: "2",
    word: "inspect",
    phonetic: "/ɪnˈspekt/",
    partOfSpeech: "verb",
    definition: "检查，视察；仔细察看",
    difficulty: "beginner",
    root: {
      form: "spect / spec",
      meaning: "看，观察",
      origin: "拉丁语 specere / spectare"
    },
    prefix: {
      form: "in-",
      meaning: "向内，深入"
    },
    suffix: {
      form: "-t",
      meaning: "动词化后缀"
    },
    etymology: [
      { period: "拉丁语", form: "inspicere", meaning: "仔细查看，检查" },
      { period: "拉丁语（动名词）", form: "inspectum", meaning: "被检查的事物" },
      { period: "现代英语", form: "inspect", meaning: "检查，视察" }
    ],
    memoryTip: "in（向内深入）+ spect（看）= 深入地看 → 检查",
    examples: [
      {
        sentence: "The health inspector came to inspect the restaurant.",
        translation: "卫生检查员来检查这家餐厅。",
        context: "餐厅卫生检查"
      },
      {
        sentence: "Please inspect the car carefully before buying it.",
        translation: "买车前请仔细检查一下。",
        context: "二手车购买建议"
      },
      {
        sentence: "The general inspected the troops before the parade.",
        translation: "将军在阅兵前检阅了部队。",
        context: "军事/正式场合"
      }
    ],
    relatedWords: [
      { word: "respect", meaning: "尊重（re- 再次 + spect 看 = 再次审视 → 尊重）" },
      { word: "expect", meaning: "期待（ex- 向外 + spect 看 = 向外张望）" },
      { word: "spectacle", meaning: "奇观，眼镜（spect + acle 事物）" },
      { word: "perspective", meaning: "视角（per 通过 + spect 看 + ive）" },
      { word: "suspect", meaning: "怀疑（su=sub 在下 + spect 看 = 向下偷看）" }
    ],
    tags: ["职场", "正式", "视觉"]
  },
  {
    id: "3",
    word: "biography",
    phonetic: "/baɪˈɒɡrəfi/",
    partOfSpeech: "noun",
    definition: "传记；他人撰写的某人的生平故事",
    difficulty: "intermediate",
    root: {
      form: "graph / graphy",
      meaning: "写，记录",
      origin: "希腊语 graphein"
    },
    prefix: {
      form: "bio-",
      meaning: "生命，生物"
    },
    etymology: [
      { period: "希腊语", form: "bios + graphia", meaning: "生命 + 书写" },
      { period: "现代拉丁语", form: "biographia", meaning: "传记写作" },
      { period: "现代英语", form: "biography", meaning: "传记" }
    ],
    memoryTip: "bio（生命）+ graphy（写作）= 关于生命的写作 → 传记",
    examples: [
      {
        sentence: "She wrote a fascinating biography of Einstein.",
        translation: "她写了一部关于爱因斯坦的精彩传记。",
        context: "文学写作"
      },
      {
        sentence: "The actor's biography revealed many surprising facts.",
        translation: "这位演员的传记揭露了许多令人惊讶的事实。",
        context: "娱乐新闻"
      },
      {
        sentence: "I prefer biographies over fiction—they're stranger than any novel.",
        translation: "我比较喜欢传记而非小说——真实比任何小说都更离奇。",
        context: "日常阅读偏好"
      }
    ],
    relatedWords: [
      { word: "autobiography", meaning: "自传（auto- 自己 + biography）" },
      { word: "biology", meaning: "生物学（bio 生命 + logy 学科）" },
      { word: "geography", meaning: "地理学（geo 地球 + graphy 写作）" },
      { word: "photograph", meaning: "照片（photo 光 + graph 写/记录）" },
      { word: "autograph", meaning: "亲笔签名（auto 自己 + graph 写）" }
    ],
    tags: ["文学", "学术", "人文"]
  },
  {
    id: "4",
    word: "telephone",
    phonetic: "/ˈtelɪfəʊn/",
    partOfSpeech: "noun / verb",
    definition: "电话；用电话联系",
    difficulty: "beginner",
    root: {
      form: "phone",
      meaning: "声音，声波",
      origin: "希腊语 phōnē"
    },
    prefix: {
      form: "tele-",
      meaning: "远距离，遥远"
    },
    etymology: [
      { period: "希腊语", form: "tēle + phōnē", meaning: "远处 + 声音" },
      { period: "19世纪", form: "telephone（贝尔命名）", meaning: "远程传声装置" },
      { period: "现代英语", form: "telephone / phone", meaning: "电话" }
    ],
    memoryTip: "tele（远）+ phone（声音）= 远距离传声 → 电话",
    examples: [
      {
        sentence: "I'll telephone you when I arrive.",
        translation: "我到了就给你打电话。",
        context: "日常约定"
      },
      {
        sentence: "The telephone revolutionized long-distance communication.",
        translation: "电话彻底改变了长途通讯方式。",
        context: "科技发展史"
      },
      {
        sentence: "She spent hours on the telephone with her friend.",
        translation: "她和朋友在电话上聊了好几个小时。",
        context: "社交生活"
      }
    ],
    relatedWords: [
      { word: "television", meaning: "电视（tele 远 + vision 视觉）" },
      { word: "microphone", meaning: "麦克风（micro 微小 + phone 声音）" },
      { word: "saxophone", meaning: "萨克斯管（发明者 Sax + phone 声音）" },
      { word: "phonetics", meaning: "语音学（phone + tics 学科）" },
      { word: "symphony", meaning: "交响乐（sym 共同 + phone 声音）" }
    ],
    tags: ["科技", "通讯", "日常"]
  },
  {
    id: "5",
    word: "contradict",
    phonetic: "/ˌkɒntrəˈdɪkt/",
    partOfSpeech: "verb",
    definition: "反驳；与...相矛盾",
    difficulty: "intermediate",
    root: {
      form: "dict",
      meaning: "说，宣告",
      origin: "拉丁语 dicere / dictum"
    },
    prefix: {
      form: "contra-",
      meaning: "反对，相反"
    },
    etymology: [
      { period: "拉丁语", form: "contradicere", meaning: "反着说，反驳" },
      { period: "古法语", form: "contredire", meaning: "否认，反对" },
      { period: "现代英语", form: "contradict", meaning: "反驳，矛盾" }
    ],
    memoryTip: "contra（反对）+ dict（说）= 反着说 → 反驳",
    examples: [
      {
        sentence: "Don't contradict your teacher in front of the class.",
        translation: "不要在全班面前反驳老师。",
        context: "课堂礼仪"
      },
      {
        sentence: "The new evidence contradicts the original theory.",
        translation: "新证据与原有理论相矛盾。",
        context: "科学研究"
      },
      {
        sentence: "His actions contradict everything he claims to believe.",
        translation: "他的行为与他声称的信念完全矛盾。",
        context: "品格评价"
      }
    ],
    relatedWords: [
      { word: "predict", meaning: "预测（pre- 提前 + dict 说 = 提前说出）" },
      { word: "dictate", meaning: "听写；独裁（dict + ate 使...）" },
      { word: "dictionary", meaning: "词典（dict + ionary 工具书）" },
      { word: "verdict", meaning: "裁决（ver 真实 + dict 说出）" },
      { word: "diction", meaning: "措辞（dict + ion 名词化）" }
    ],
    tags: ["辩论", "学术", "日常"]
  },
  {
    id: "6",
    word: "submarine",
    phonetic: "/ˌsʌbməˈriːn/",
    partOfSpeech: "noun / adjective",
    definition: "潜水艇；水下的",
    difficulty: "intermediate",
    root: {
      form: "mar / marine",
      meaning: "海，海洋",
      origin: "拉丁语 mare"
    },
    prefix: {
      form: "sub-",
      meaning: "在...之下，低于"
    },
    etymology: [
      { period: "拉丁语", form: "sub + mare", meaning: "海面之下" },
      { period: "现代拉丁语", form: "submarinus", meaning: "海底的，水下的" },
      { period: "现代英语", form: "submarine", meaning: "潜水艇；水下的" }
    ],
    memoryTip: "sub（在下面）+ marine（海洋）= 在海洋下面的 → 潜水艇",
    examples: [
      {
        sentence: "The submarine dived to avoid detection by enemy ships.",
        translation: "潜水艇下潜以躲避敌舰的探测。",
        context: "军事/战争场景"
      },
      {
        sentence: "Scientists discovered new species in the submarine environment.",
        translation: "科学家在海底环境中发现了新物种。",
        context: "海洋科学研究"
      },
      {
        sentence: "I ordered a submarine sandwich for lunch.",
        translation: "我午餐点了一个潜艇三明治。",
        context: "日常饮食，潜艇堡的形状像潜水艇"
      }
    ],
    relatedWords: [
      { word: "marine", meaning: "海洋的，海军（mare 海）" },
      { word: "submarine", meaning: "submarine cable 海底电缆" },
      { word: "mariner", meaning: "水手（marine + r）" },
      { word: "maritime", meaning: "海事的（marine + time）" },
      { word: "aquamarine", meaning: "海蓝宝石（aqua 水 + marine）" }
    ],
    tags: ["军事", "科学", "自然"]
  },
  {
    id: "7",
    word: "philanthropy",
    phonetic: "/fɪˈlænθrəpi/",
    partOfSpeech: "noun",
    definition: "慈善事业；对人类的博爱精神",
    difficulty: "advanced",
    root: {
      form: "anthrop",
      meaning: "人，人类",
      origin: "希腊语 anthrōpos"
    },
    prefix: {
      form: "philo- / phil-",
      meaning: "喜爱，热爱"
    },
    suffix: {
      form: "-y",
      meaning: "名词后缀，表状态或行为"
    },
    etymology: [
      { period: "希腊语", form: "philanthrōpia", meaning: "对人类的爱" },
      { period: "拉丁语", form: "philanthropia", meaning: "仁爱，博爱" },
      { period: "现代英语", form: "philanthropy", meaning: "慈善，博爱" }
    ],
    memoryTip: "philo（爱）+ anthrop（人类）+ y（名词）= 爱人类的精神 → 慈善",
    examples: [
      {
        sentence: "Gates is known for his philanthropy in global health.",
        translation: "盖茨以其在全球卫生领域的慈善事业而闻名。",
        context: "商业人物报道"
      },
      {
        sentence: "The foundation supports philanthropy in education.",
        translation: "该基金会支持教育领域的慈善活动。",
        context: "非营利组织"
      },
      {
        sentence: "True philanthropy is giving without expecting recognition.",
        translation: "真正的慈善是给予而不期望得到认可。",
        context: "道德哲学讨论"
      }
    ],
    relatedWords: [
      { word: "philosopher", meaning: "哲学家（philo 爱 + soph 智慧 + er 人）" },
      { word: "anthropology", meaning: "人类学（anthrop 人类 + logy 学科）" },
      { word: "misanthropy", meaning: "厌世（mis 憎恨 + anthrop 人类）" },
      { word: "Philadelphia", meaning: "费城（philos 爱 + adelphos 兄弟）" },
      { word: "philharmonic", meaning: "爱乐的（philo 爱 + harmonic 和声）" }
    ],
    tags: ["人文", "社会", "商业"]
  },
  {
    id: "8",
    word: "psychology",
    phonetic: "/saɪˈkɒlədʒi/",
    partOfSpeech: "noun",
    definition: "心理学；心理研究",
    difficulty: "advanced",
    root: {
      form: "psych / psycho",
      meaning: "心理，精神，灵魂",
      origin: "希腊语 psychē"
    },
    suffix: {
      form: "-logy",
      meaning: "学科，研究领域"
    },
    etymology: [
      { period: "希腊语", form: "psychē + logos", meaning: "灵魂 + 研究" },
      { period: "现代拉丁语", form: "psychologia", meaning: "关于精神的学问" },
      { period: "现代英语", form: "psychology", meaning: "心理学" }
    ],
    memoryTip: "psycho（心理/灵魂）+ logy（学科）= 研究心理/灵魂的学问 → 心理学",
    examples: [
      {
        sentence: "She studied psychology to better understand human behavior.",
        translation: "她学习心理学是为了更好地理解人类行为。",
        context: "学术选择"
      },
      {
        sentence: "The psychology of color affects how people feel in a room.",
        translation: "色彩心理学影响人们在房间里的感受。",
        context: "室内设计与营销"
      },
      {
        sentence: "Understanding the psychology of fear can help overcome phobias.",
        translation: "了解恐惧的心理学可以帮助克服恐惧症。",
        context: "心理治疗"
      }
    ],
    relatedWords: [
      { word: "psychiatry", meaning: "精神病学（psych + iatry 医疗）" },
      { word: "psychic", meaning: "心灵感应的（psych + ic 形容词）" },
      { word: "biology", meaning: "生物学（bio 生命 + logy）" },
      { word: "sociology", meaning: "社会学（socio 社会 + logy）" },
      { word: "psychopath", meaning: "精神病患者（psycho + path 病）" }
    ],
    tags: ["学术", "科学", "人文"]
  }
];

export const rootDatabase = [
  { root: "port", meaning: "携带，运送", origin: "拉丁语", examples: ["transport", "export", "import", "portable"] },
  { root: "spect/spec", meaning: "看，观察", origin: "拉丁语", examples: ["inspect", "respect", "expect", "spectacle"] },
  { root: "graph/graphy", meaning: "写，记录", origin: "希腊语", examples: ["biography", "photograph", "geography"] },
  { root: "phone", meaning: "声音", origin: "希腊语", examples: ["telephone", "microphone", "symphony"] },
  { root: "dict", meaning: "说，宣告", origin: "拉丁语", examples: ["contradict", "predict", "dictate", "dictionary"] },
  { root: "mar/marine", meaning: "海，海洋", origin: "拉丁语", examples: ["submarine", "marine", "maritime"] },
  { root: "anthrop", meaning: "人，人类", origin: "希腊语", examples: ["philanthropy", "anthropology"] },
  { root: "psych", meaning: "心理，灵魂", origin: "希腊语", examples: ["psychology", "psychiatry", "psychic"] },
];
