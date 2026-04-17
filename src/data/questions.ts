export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  aChoice: string;
  bChoice: string;
}

export const questions: Question[] = [
  // E vs I
  { id: 1, dimension: 'EI', text: '周末聚会结束后，你通常感觉？', aChoice: '精力充沛，还想继续玩', bChoice: '有点累，需要一个人待着恢复' },
  { id: 2, dimension: 'EI', text: '在陌生人多的场合，你倾向于？', aChoice: '主动搭话，认识新朋友', bChoice: '等别人来找我，或者安静观察' },
  { id: 3, dimension: 'EI', text: '你更享受哪种工作方式？', aChoice: '和团队热烈讨论、头脑风暴', bChoice: '一个人专注思考、独立完成' },
  { id: 4, dimension: 'EI', text: '当你有烦恼时，通常会？', aChoice: '找朋友倾诉，说出来才舒服', bChoice: '自己消化，不想麻烦别人' },
  { id: 5, dimension: 'EI', text: '你的社交圈通常是？', aChoice: '朋友很多，认识各种各样的人', bChoice: '朋友不多，但关系很深' },

  // S vs N
  { id: 6, dimension: 'SN', text: '你更信任哪种判断？', aChoice: '亲眼看到、亲手摸到的事实', bChoice: '直觉和隐约的感觉' },
  { id: 7, dimension: 'SN', text: '阅读一本书时，你更喜欢？', aChoice: '细节丰富、接地气的故事', bChoice: '充满想象力、有深度的世界观' },
  { id: 8, dimension: 'SN', text: '做计划时，你倾向于？', aChoice: '具体步骤，每一步都要清晰', bChoice: '大方向就够了，细节随机应变' },
  { id: 9, dimension: 'SN', text: '你对未来的态度？', aChoice: '脚踏实地，做好当下最重要', bChoice: '充满可能性，喜欢展望和构想' },
  { id: 10, dimension: 'SN', text: '学新东西时，你更喜欢？', aChoice: '先看例子和实际操作', bChoice: '先理解底层原理和逻辑' },

  // T vs F
  { id: 11, dimension: 'TF', text: '朋友向你倾诉问题，你首先会？', aChoice: '帮他分析原因，给出解决方案', bChoice: '先表达理解和共情，陪他说说话' },
  { id: 12, dimension: 'TF', text: '做重要决定时，你更看重？', aChoice: '逻辑和客观分析', bChoice: '自己和他人的感受' },
  { id: 13, dimension: 'TF', text: '当有人批评你时，你会？', aChoice: '就事论事，看对方说得对不对', bChoice: '先在意对方的态度和语气' },
  { id: 14, dimension: 'TF', text: '你认为公平是指？', aChoice: '按规则和逻辑一视同仁', bChoice: '根据具体情况照顾每个人的感受' },
  { id: 15, dimension: 'TF', text: '工作中你更在意？', aChoice: '任务完成质量和效率', bChoice: '团队氛围和每个人是否开心' },

  // J vs P
  { id: 16, dimension: 'JP', text: '对于计划，你的态度是？', aChoice: '喜欢提前安排好，按计划执行', bChoice: '走一步看一步，临时决定也没关系' },
  { id: 17, dimension: 'JP', text: '你的桌面/房间通常是？', aChoice: '整洁有序，东西都有固定位置', bChoice: '有点乱，但我知道东西在哪' },
  { id: 18, dimension: 'JP', text: '截止日期对你来说？', aChoice: '必须提前完成，拖到最后很焦虑', bChoice: '压力能激发我，最后关头效率最高' },
  { id: 19, dimension: 'JP', text: '旅行时你偏好？', aChoice: '提前规划好行程、酒店、景点', bChoice: '大概知道去哪，其他随缘' },
  { id: 20, dimension: 'JP', text: '面对未完成的事情，你会？', aChoice: '不做完心里不舒服', bChoice: '先放放，之后再说' },
];

export const mbtiDescriptions: Record<string, {
  title: string;
  nickname: string;
  emoji: string;
  color: string;
  bgGradient: string;
  traits: string[];
  rarity: string;
  tagline: string;
  avatarSeed: string;
}> = {
  INTJ: {
    title: '建筑师', nickname: 'INTJ', emoji: '🏛️',
    color: '#7C3AED', bgGradient: 'from-purple-900 to-purple-700',
    traits: ['毒舌 翻王', '臭脸 自恋 慕强', '坚定 固执 独立', '强烈爱 秒情王', '嘴硬心软 完美主义', '一般不回 熟客冠军', '理性疯批'],
    rarity: '2.1%', tagline: '一切都在计划之中',
    avatarSeed: 'INTJ-architect',
  },
  INTP: {
    title: '逻辑学家', nickname: 'INTP', emoji: '🔬',
    color: '#2563EB', bgGradient: 'from-blue-900 to-blue-700',
    traits: ['厌鬼 发疯', '自尊 自虐 玄学', '独处 回避型', '智性恋 爱爱脑', '逻辑自治 好奇心强', '冷漠无情'],
    rarity: '3.3%', tagline: '永远不要停止质疑',
    avatarSeed: 'INTP-logician',
  },
  ENTJ: {
    title: '指挥官', nickname: 'ENTJ', emoji: '⚔️',
    color: '#DC2626', bgGradient: 'from-red-900 to-red-700',
    traits: ['天生领袖', '强势果断', '目标驱动', '效率至上', '不接受借口', '战略眼光', '意志坚定'],
    rarity: '1.8%', tagline: '我来，我见，我征服',
    avatarSeed: 'ENTJ-commander',
  },
  ENTP: {
    title: '辩论家', nickname: 'ENTP', emoji: '💡',
    color: '#D97706', bgGradient: 'from-amber-900 to-amber-700',
    traits: ['自我执拗', '厌鬼 捣戏', '内心剧场', '专注力差 一句惊人', '兴趣广泛', '有广度没深度', '最的E人'],
    rarity: '2.7%', tagline: '思想，就是与自己辩论',
    avatarSeed: 'ENTP-debater',
  },
  INFJ: {
    title: '提倡者', nickname: 'INFJ', emoji: '🌙',
    color: '#059669', bgGradient: 'from-emerald-900 to-emerald-700',
    traits: ['治愈 温暖', '闷骚 神秘 内耗', '嘴严 可爱', '道德感', '照顾人 哲学家', '理想主义', '天选牛马'],
    rarity: '1.5%', tagline: '别活在别人的期望下',
    avatarSeed: 'INFJ-advocate',
  },
  INFP: {
    title: '调停者', nickname: 'INFP', emoji: '🌸',
    color: '#7C3AED', bgGradient: 'from-violet-900 to-violet-700',
    traits: ['忧郁 爱哭', '纯粹 慢热', '回避型', '自我中心', '纯爱战神 拖延症晚期', '单纯无害'],
    rarity: '4.4%', tagline: '任何事都有好的一面',
    avatarSeed: 'INFP-mediator',
  },
  ENFJ: {
    title: '主人公', nickname: 'ENFJ', emoji: '✨',
    color: '#0891B2', bgGradient: 'from-cyan-900 to-cyan-700',
    traits: ['天生导师', '感染力强', '利他主义', '过度付出', '善于激励', '完美形象'],
    rarity: '2.5%', tagline: '每个人都值得被看见',
    avatarSeed: 'ENFJ-protagonist',
  },
  ENFP: {
    title: '竞选者', nickname: 'ENFP', emoji: '🌈',
    color: '#EA580C', bgGradient: 'from-orange-900 to-orange-700',
    traits: ['快乐小狗 终极DDL', '熟人发癫', '永远真诚 精力旺盛', '浪漫主义', '三分钟热度', '天马行空'],
    rarity: '8.1%', tagline: '想跟我一起改变世界吗',
    avatarSeed: 'ENFP-campaigner',
  },
  ISTJ: {
    title: '物流师', nickname: 'ISTJ', emoji: '📋',
    color: '#1D4ED8', bgGradient: 'from-blue-900 to-indigo-700',
    traits: ['责任感强', '沉默寡言', '传统守旧', '一板一眼', '可靠稳定', '细节控'],
    rarity: '11.6%', tagline: '规则存在是有原因的',
    avatarSeed: 'ISTJ-logistician',
  },
  ISFJ: {
    title: '守卫者', nickname: 'ISFJ', emoji: '🛡️',
    color: '#065F46', bgGradient: 'from-emerald-900 to-teal-700',
    traits: ['温柔体贴', '默默付出', '记忆力强', '害怕冲突', '忠诚可靠', '注重细节'],
    rarity: '13.8%', tagline: '我记得你说过的每一件事',
    avatarSeed: 'ISFJ-defender',
  },
  ESTJ: {
    title: '总经理', nickname: 'ESTJ', emoji: '💼',
    color: '#92400E', bgGradient: 'from-amber-900 to-yellow-700',
    traits: ['执行力强', '直接果断', '传统权威', '爱管闲事', '效率第一', '天生管理者'],
    rarity: '8.7%', tagline: '规矩就是规矩',
    avatarSeed: 'ESTJ-executive',
  },
  ESFJ: {
    title: '执政官', nickname: 'ESFJ', emoji: '🤝',
    color: '#BE185D', bgGradient: 'from-pink-900 to-rose-700',
    traits: ['热情好客', '在意他人眼光', '爱操心', '忠诚温暖', '和谐至上', '天生照料者'],
    rarity: '12.3%', tagline: '一起开心才是真的开心',
    avatarSeed: 'ESFJ-consul',
  },
  ISTP: {
    title: '鉴赏家', nickname: 'ISTP', emoji: '🔧',
    color: '#374151', bgGradient: 'from-gray-800 to-gray-600',
    traits: ['高冷 宅', '冷漠 没有心', '帮理不帮亲', '喜欢回避', '逻辑鬼魅', '反社会就社会'],
    rarity: '5.4%', tagline: '世界尽在我的掌握中',
    avatarSeed: 'ISTP-virtuoso',
  },
  ISFP: {
    title: '探险家', nickname: 'ISFP', emoji: '🎨',
    color: '#B45309', bgGradient: 'from-yellow-900 to-amber-700',
    traits: ['不会说话 讨好型', '懦懦 反差', '猫猫脑', '睡觉大师', '表面笑嘻嘻', '反骨'],
    rarity: '8.8%', tagline: '我的审美能颠覆传统',
    avatarSeed: 'ISFP-adventurer',
  },
  ESTP: {
    title: '企业家', nickname: 'ESTP', emoji: '⚡',
    color: '#DC2626', bgGradient: 'from-red-900 to-orange-700',
    traits: ['活在当下', '行动派', '爱冒险', '说话直接', '魅力十足', '享乐主义'],
    rarity: '4.3%', tagline: '机会稍纵即逝',
    avatarSeed: 'ESTP-entrepreneur',
  },
  ESFP: {
    title: '表演家', nickname: 'ESFP', emoji: '🎭',
    color: '#7C2D12', bgGradient: 'from-orange-900 to-yellow-700',
    traits: ['情绪化 自私刁蛮', '油嘴滑舌', '察言观色', '神经大条 孩子气', '及时行乐', '人群焦点'],
    rarity: '8.5%', tagline: '明天的事儿明天再说',
    avatarSeed: 'ESFP-entertainer',
  },
};