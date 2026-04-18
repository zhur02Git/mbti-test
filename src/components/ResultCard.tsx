'use client';

import { useState } from 'react';
import { mbtiExplanations } from '@/data/questions';

interface Celebrity {
  name: string;
  era: string;
  desc: string;
}

interface Description {
  title: string;
  nickname: string;
  emoji: string;
  color: string;
  bgGradient: string;
  traits: string[];
  rarity: string;
  tagline: string;
  avatarSeed: string;
  celebrities: Celebrity[];
  personality: string[];
  career: string[];
  love: string[];
  cities: { city: string; reason: string }[];
  fortune2026: string;
}

interface Props {
  mbti: string;
  description: Description;
  onRestart: () => void;
}

const gradientMap: Record<string, string> = {
  'from-purple-900 to-purple-700': 'linear-gradient(to bottom, #4c1d95, #6d28d9)',
  'from-blue-900 to-blue-700': 'linear-gradient(to bottom, #1e3a8a, #1d4ed8)',
  'from-red-900 to-red-700': 'linear-gradient(to bottom, #7f1d1d, #b91c1c)',
  'from-amber-900 to-amber-700': 'linear-gradient(to bottom, #78350f, #b45309)',
  'from-emerald-900 to-emerald-700': 'linear-gradient(to bottom, #064e3b, #047857)',
  'from-violet-900 to-violet-700': 'linear-gradient(to bottom, #4c1d95, #6d28d9)',
  'from-cyan-900 to-cyan-700': 'linear-gradient(to bottom, #164e63, #0e7490)',
  'from-orange-900 to-orange-700': 'linear-gradient(to bottom, #7c2d12, #c2410c)',
  'from-blue-900 to-indigo-700': 'linear-gradient(to bottom, #1e3a8a, #4338ca)',
  'from-emerald-900 to-teal-700': 'linear-gradient(to bottom, #064e3b, #0f766e)',
  'from-amber-900 to-yellow-700': 'linear-gradient(to bottom, #78350f, #a16207)',
  'from-pink-900 to-rose-700': 'linear-gradient(to bottom, #831843, #be123c)',
  'from-gray-800 to-gray-600': 'linear-gradient(to bottom, #1f2937, #4b5563)',
  'from-yellow-900 to-amber-700': 'linear-gradient(to bottom, #713f12, #b45309)',
  'from-red-900 to-orange-700': 'linear-gradient(to bottom, #7f1d1d, #c2410c)',
  'from-orange-900 to-yellow-700': 'linear-gradient(to bottom, #7c2d12, #a16207)',
};

export default function ResultCard({ mbti, description, onRestart }: Props) {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState('');

  const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${description.avatarSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  const fortuneScores = [
    { label: '事业运', value: 78 + (mbti.charCodeAt(0) % 15) },
    { label: '财运', value: 70 + (mbti.charCodeAt(1) % 18) },
    { label: '爱情运', value: 72 + (mbti.charCodeAt(2) % 16) },
    { label: '健康运', value: 75 + (mbti.charCodeAt(3) % 14) },
  ];

  const explanation = mbtiExplanations[mbti] || mbtiExplanations['INTJ'];
  const headerGradient = gradientMap[description.bgGradient] || 'linear-gradient(to bottom, #4c1d95, #6d28d9)';

  const dimensions = [
    { 
      label: mbti[0] === 'E' ? '外向 E' : '内向 I', 
      score: mbti[0] === 'E' ? 72 + (mbti.charCodeAt(0) % 20) : 72 + (mbti.charCodeAt(0) % 20),
      desc: explanation.ei, 
      color: 'bg-blue-500',
      ends: ['E', 'I']
    },
    { 
      label: mbti[1] === 'S' ? '实感 S' : '直觉 N', 
      score: mbti[1] === 'S' ? 70 + (mbti.charCodeAt(1) % 22) : 70 + (mbti.charCodeAt(1) % 22),
      desc: explanation.sn, 
      color: 'bg-green-500',
      ends: ['S', 'N']
    },
    { 
      label: mbti[2] === 'T' ? '思考 T' : '情感 F', 
      score: mbti[2] === 'T' ? 68 + (mbti.charCodeAt(2) % 24) : 68 + (mbti.charCodeAt(2) % 24),
      desc: explanation.tf, 
      color: 'bg-violet-500',
      ends: ['T', 'F']
    },
    { 
      label: mbti[3] === 'J' ? '判断 J' : '知觉 P', 
      score: mbti[3] === 'J' ? 65 + (mbti.charCodeAt(3) % 25) : 65 + (mbti.charCodeAt(3) % 25),
      desc: explanation.jp, 
      color: 'bg-pink-500',
      ends: ['J', 'P']
    },
  ];

  async function handleSendEmail() {
    if (!email.trim() || emailStatus === 'loading') return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('请输入正确的邮箱地址');
      return;
    }
    setEmailStatus('loading');
    setEmailError('');
    try {
      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), mbti }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailStatus('success');
      } else {
        setEmailStatus('error');
        setEmailError(data.error || '发送失败，请重试');
      }
    } catch {
      setEmailStatus('error');
      setEmailError('网络错误，请重试');
    }
  }

  const getEnglishLabel = (char: string): string => {
    switch(char) {
      case 'E': return 'Extraversion';
      case 'I': return 'Introversion';
      case 'S': return 'Sensing';
      case 'N': return 'Intuition';
      case 'T': return 'Thinking';
      case 'F': return 'Feeling';
      case 'J': return 'Judging';
      case 'P': return 'Perceiving';
      default: return '';
    }
  };

  const getChineseLabel = (char: string): string => {
    switch(char) {
      case 'E': return '外向';
      case 'I': return '内向';
      case 'S': return '实感';
      case 'N': return '直觉';
      case 'T': return '思考';
      case 'F': return '情感';
      case 'J': return '判断';
      case 'P': return '知觉';
      default: return '';
    }
  };

  const HeaderCard = () => (
    <div className={`w-full rounded-2xl overflow-hidden bg-gradient-to-b ${description.bgGradient} mb-4`}>
      <div className="flex flex-col items-center pt-8 pb-4 px-6">
        <div className="w-28 h-28 rounded-full overflow-hidden mb-3" style={{ border: '4px solid rgba(255,255,255,0.2)' }}>
          <img src={avatarUrl} alt={mbti} width={112} height={112} className="w-full h-full object-cover" />
        </div>
        <div className="text-xs tracking-widest text-white/60 mb-1">人格类型</div>
        <div className="text-5xl font-black text-white tracking-wider">{mbti}</div>
        <div className="text-xl font-bold text-white/90 mt-1">{description.title}</div>
        <div className="mt-2 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">稀有度 {description.rarity}</div>
      </div>
      <div className="px-6 pb-4 flex flex-wrap gap-2">
        {description.traits.map((trait, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">{trait}</span>
        ))}
      </div>
      <div className="mx-6 h-px bg-white/10 mb-3" />
      <p className="text-center text-white/60 text-xs italic pb-6">「{description.tagline}」</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center">
      <div className="w-full max-w-sm px-4 py-8">

        <div className="text-center mb-4">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-bold">✨ 专业版报告</span>
        </div>

        <HeaderCard />

        {/* 四维度分析 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-4">🧠 四维度分析</h3>
          {dimensions.map((dim, i) => (
            <div key={i} className="mb-6 last:mb-0">
              <div className="text-white font-semibold text-sm mb-3">{dim.label}</div>
              
              <div className="mb-3">
                <div className="flex justify-between items-start text-xs text-gray-400 mb-2">
                  <div className="text-left">
                    <div className="font-semibold text-gray-300">{dim.ends[0]}</div>
                    <div className="text-xs text-gray-500">{getEnglishLabel(dim.ends[0])}</div>
                    <div className="text-xs text-gray-400">{getChineseLabel(dim.ends[0])}</div>
                  </div>
                  <span className="font-semibold text-gray-300">{dim.score}%</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-300">{dim.ends[1]}</div>
                    <div className="text-xs text-gray-500">{getEnglishLabel(dim.ends[1])}</div>
                    <div className="text-xs text-gray-400">{getChineseLabel(dim.ends[1])}</div>
                  </div>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full ${dim.color} rounded-full transition-all`} 
                    style={{ width: `${dim.score}%` }} 
                  />
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-700 flex-shrink-0"
                    style={{ left: `calc(${dim.score}% - 6px)` }}
                  />
                </div>
              </div>
              
              <p className="text-gray-400 text-xs leading-relaxed">{dim.desc}</p>
              
              {i < dimensions.length - 1 && <div className="mt-4 h-px bg-gray-800" />}
            </div>
          ))}
        </div>

        {/* 性格特点 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-1">💡 性格特点详解</h3>
          <p className="text-gray-500 text-xs mb-4">{mbti} 人格的核心特质</p>
          {description.personality.map((p, i) => (
            <div key={i} className="flex gap-2 mb-3 last:mb-0">
              <span className="text-violet-400 flex-shrink-0 mt-0.5 font-bold text-sm">{i + 1}.</span>
              <p className="text-gray-300 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        {/* 相似名人 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-1">⭐ 相似性格名人</h3>
          <p className="text-gray-500 text-xs mb-4">与你同类型的历史人物</p>
          {description.celebrities.map((c, i) => (
            <div key={i} className="flex gap-3 items-start mb-4 last:mb-0">
              <div className="w-10 h-10 rounded-full bg-violet-900/60 flex items-center justify-center flex-shrink-0 text-base font-bold text-violet-300">{c.name[0]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white text-sm font-semibold">{c.name}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-gray-400">{c.era}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 职业 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-1">💼 职业与工作</h3>
          <p className="text-gray-500 text-xs mb-4">最适合 {mbti} 发挥的领域</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {description.career.map((c, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-violet-900/50 text-violet-200 text-sm font-medium">{c}</span>
            ))}
          </div>
          <div className="h-px bg-gray-800 my-3" />
          <h4 className="text-white font-semibold text-xs mb-3">职场性格分析</h4>
          {description.personality.slice(0, 3).map((p, i) => (
            <div key={i} className="flex gap-2 mb-2 last:mb-0">
              <span className="text-violet-400 flex-shrink-0 mt-0.5">•</span>
              <p className="text-gray-300 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        {/* 爱情 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-1">💕 爱情与关系</h3>
          <p className="text-gray-500 text-xs mb-4">{mbti} 在感情中的样子</p>
          <h4 className="text-white font-semibold text-xs mb-3">择偶建议</h4>
          {description.love.map((l, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <span className="text-pink-400 flex-shrink-0 mt-0.5">♥</span>
              <p className="text-gray-300 text-sm leading-relaxed">{l}</p>
            </div>
          ))}
          <div className="h-px bg-gray-800 my-3" />
          <h4 className="text-white font-semibold text-xs mb-3">感情中的你</h4>
          {description.personality.slice(3).map((p, i) => (
            <div key={i} className="flex gap-2 mb-2 last:mb-0">
              <span className="text-pink-400 flex-shrink-0 mt-0.5">•</span>
              <p className="text-gray-300 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        {/* 居住地 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-1">🌍 适合居住的地方</h3>
          <p className="text-gray-500 text-xs mb-4">与你性格最契合的城市</p>
          {description.cities.map((c, i) => (
            <div key={i} className="flex gap-3 items-start mb-4 last:mb-0">
              <span className="text-2xl flex-shrink-0">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
              <div>
                <p className="text-white text-sm font-semibold mb-1">{c.city}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{c.reason}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 运势 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-1">🔮 2026年专属运势</h3>
          <p className="text-gray-500 text-xs mb-4">基于 {mbti} 人格特质分析</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-5">{description.fortune2026}</p>
          <div className="h-px bg-gray-800 mb-4" />
          <h4 className="text-white font-semibold text-xs mb-4">📊 各项运势指数</h4>
          {fortuneScores.map((item, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-violet-300 font-semibold">{item.value}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* 邮件发送 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-1">📧 发送报告到邮箱</h3>
          <p className="text-gray-500 text-xs mb-4">将完整专业报告发送到你的邮箱永久保存</p>
          {emailStatus === 'success' ? (
            <div className="flex items-center gap-2 bg-green-900/40 rounded-xl p-3">
              <span className="text-green-400 text-lg">✅</span>
              <p className="text-green-300 text-sm">报告已发送！请检查你的邮箱</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                placeholder="输入你的邮箱地址"
                className="flex-1 bg-gray-800 text-white text-sm rounded-xl px-3 py-2.5 outline-none border border-gray-700 focus:border-violet-500 transition-all"
              />
              <button
                onClick={handleSendEmail}
                disabled={emailStatus === 'loading' || !email.trim()}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-sm transition-all flex-shrink-0"
              >
                {emailStatus === 'loading' ? '...' : '发送'}
              </button>
            </div>
          )}
          {emailError && <p className="text-red-400 text-xs mt-2">{emailError}</p>}
        </div>

        <button onClick={onRestart} className="w-full py-3 rounded-2xl bg-gray-900 text-gray-500 text-sm transition-all">
          🔄 重新测试
        </button>
      </div>
    </div>
  );
}