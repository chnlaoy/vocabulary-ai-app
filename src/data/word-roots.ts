export interface WordRoot {
  id: string;
  root: string;
  meaning: string;
  frequency: number; // higher means more common
  example: string;
  exampleTranslation: string;
  // For TTS spelling: we can just split root into letters
}

export const wordRoots: WordRoot[] = [
  {
    id: 'port',
    root: 'port',
    meaning: '携带',
    frequency: 95,
    example: 'She needs to transport the goods to the warehouse.',
    exampleTranslation: '她需要将货物运送到仓库。'
  },
  {
    id: 'spect',
    root: 'spect',
    meaning: '看',
    frequency: 90,
    example: 'Please inspect the document before signing.',
    exampleTranslation: '请在签署前检查文件。'
  },
  {
    id: 'phone',
    root: 'phone',
    meaning: '声音',
    frequency: 85,
    example: 'He uses a smartphone to call his parents every day.',
    exampleTranslation: '他每天用智能手机给父母打电话。'
  },
  {
    id: 'bio',
    root: 'bio',
    meaning: '生命',
    frequency: 80,
    example: 'Biology is the study of living organisms.',
    exampleTranslation: '生物学是研究生物的科学。'
  },
  {
    id: 'graph',
    root: 'graph',
    meaning: '写、记录',
    frequency: 78,
    example: 'Please write your signature here.',
    exampleTranslation: '请在这里签署您的名字。'
  },
  {
    id: 'dict',
    root: 'dict',
    meaning: '说',
    frequency: 75,
    example: 'The judge will dictate the terms of the agreement.',
    exampleTranslation: '法官将宣读协议的条款。'
  },
  {
    id: 'struct',
    root: 'struct',
    meaning: '建造',
    frequency: 70,
    example: 'The engineer designed a new structure for the bridge.',
    exampleTranslation: '工程师为桥梁设计了新的结构。'
  },
  {
    id: 'ject',
    root: 'ject',
    meaning: '投掷',
    frequency: 68,
    example: 'He rejected the offer because it was too low.',
    exampleTranslation: '他因为报价太低而拒绝了这个提议。'
  },
  {
    id: 'vert',
    root: 'vert',
    meaning: '转',
    frequency: 65,
    example: 'Please convert the file to PDF format.',
    exampleTranslation: '请将文件转换为PDF格式。'
  },
  {
    id: 'form',
    root: 'form',
    meaning: '形状',
    frequency: 63,
    example: 'Water freezes and forms ice at zero degrees Celsius.',
    exampleTranslation: '水在零摄氏度时会冻结并形成冰。'
  },
  {
    id: 'tract',
    root: 'tract',
    meaning: '拉、引',
    frequency: 60,
    example: 'The tractor pulls the trailer across the field.',
    exampleTranslation: '拖拉机将拖车拉过田野。'
  },
  {
    id: 'cede',
    root: 'cede',
    meaning: '让、去',
    frequency: 58,
    example: 'He had to concede defeat in the match.',
    exampleTranslation: '他在比赛中不得不承认失败。'
  },
  {
    id: 'fer',
    root: 'fer',
    meaning: '带',
    frequency: 55,
    example: 'The ferry transports passengers across the river.',
    exampleTranslation: '渡轮将乘客送渡过河。'
  },
  {
    id: 'duc',
    root: 'duc',
    meaning: '导',
    frequency: 52,
    example: 'The conductor directs the orchestra with great skill.',
    exampleTranslation: '指挥师以极高的技巧指挥管弦乐队。'
  },
  {
    id: 'mit',
    root: 'mit',
    meaning: '送',
    frequency: 50,
    example: 'Please permit me to enter the building.',
    exampleTranslation: '请允许我进入大楼。'
  },
  {
    id: 'ven',
    root: 'ven',
    meaning: '来',
    frequency: 48,
    example: 'The convention will convene next Monday.',
    exampleTranslation: '大会将于下周一召开。'
  },
  {
    id: 'script',
    root: 'script',
    meaning: '写',
    frequency: 45,
    example: 'The doctor prescribed a new medication for the patient.',
    exampleTranslation: '医生为患者开了一种新药。'
  },
  {
    id: 'pel',
    root: 'pel',
    meaning: '推',
    frequency: 42,
    example: 'The propeller pushes the boat forward through the water.',
    exampleTranslation: '螺旋桨推动船只在水中前进。'
  },
  {
    id: 'leg',
    root: 'leg',
    meaning: '法律',
    frequency: 40,
    example: 'He is a legal advisor for the company.',
    exampleTranslation: '他是公司的法律顾问。'
  },
  // Additional roots for IELTS/TOEFL level
  {
    id: 'cid',
    root: 'cid',
    meaning: '落下',
    frequency: 38,
    example: 'An accident occurred on the highway yesterday.',
    exampleTranslation: '昨天在高速公路上发生了一起事故。'
  },
  {
    id: 'val',
    root: 'val',
    meaning: '价值',
    frequency: 36,
    example: 'This antique vase is very valuable.',
    exampleTranslation: '这个古董花瓶非常有价值。'
  },
  {
    id: 'sid',
    root: 'sid',
    meaning: '坐',
    frequency: 34,
    example: 'Please take a seat and wait for your turn.',
    exampleTranslation: '请坐下等待您的轮到。'
  },
  {
    id: 'fin',
    root: 'fin',
    meaning: '结束',
    frequency: 32,
    example: 'The movie finally came to an end after three hours.',
    exampleTranslation: '电影终于在三个小时后结束了。'
  },
  {
    id: 'fir',
    root: 'fir',
    meaning: '携带',
    frequency: 30,
    example: 'She suffers from asthma and needs to use an inhaler.',
    exampleTranslation: '她患有哮喘，需要使用吸入器。'
  },
  {
    id: 'lum',
    root: 'lum',
    meaning: '光',
    frequency: 28,
    example: 'The room was illuminated by a bright chandelier.',
    exampleTranslation: '房间被一盏明亮的吊灯照亮。'
  },
  {
    id: 'magn',
    root: 'magn',
    meaning: '大',
    frequency: 26,
    example: 'He has a magnificent collection of rare books.',
    exampleTranslation: '他拥有一本珍藏书籍的宏伟收藏。'
  },
  {
    id: 'tract',
    root: 'tract',
    meaning: '拉',
    frequency: 24,
    example: 'The attraction between them was undeniable.',
    exampleTranslation: '他们之间的吸引力是不可否认的。'
  },
  {
    id: 'tend',
    root: 'tend',
    meaning: '伸展',
    frequency: 22,
    example: 'She tends to her garden every morning.',
    exampleTranslation: '她每天早上都照料她的花园。'
  },
  {
    id: 'terr',
    root: 'terr',
    meaning: '土地',
    frequency: 20,
    example: 'The territory was disputed between the two countries.',
    exampleTranslation: '这片领土被两个国家争夺。'
  }
];

// Sorted by frequency descending (already sorted in array)
export const getSortedRoots = (count?: number) => {
  let sorted = [...wordRoots].sort((a, b) => b.frequency - a.frequency);
  if (count && count > 0) {
    sorted = sorted.slice(0, count);
  }
  return sorted;
};