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

const PRO_PAYMENT_URL = '/pay';

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

type ReportType = 'select' | 'free' | 'pro';

export default function ResultCard({ mbti, description, onRestart }: Props) {
  const [reportType, setReportType] = useState<ReportType>(() => {
    if (typeof window !== 'undefined') {
      const unlocked = localStorage.getItem('mbti_pro_unlocked');
      if (unlocked === 'true') return 'pro';
    }
    return 'select';
  });
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
    { label: mbti[0] === 'E' ? '外向 E' : '内向 I', score: mbti[0] === 'E' ? 72 + (mbti.charCodeAt(0) % 20) : 28 - (mbti.charCodeAt(0) % 10), desc: explanation.ei, color: 'bg-blue-500' },
    { label: mbti[1] === 'S' ? '实感 S' : '直觉 N', score: mbti[1] === 'S' ? 70 + (mbti.charCodeAt(1) % 22) : 30 - (mbti.charCodeAt(1) % 10), desc: explanation.sn, color: 'bg-green-500' },
    { label: mbti[2] === 'T' ? '思考 T' : '情感 F', score: mbti[2] === 'T' ? 68 + (mbti.charCodeAt(2) % 24) : 32 - (mbti.charCodeAt(2) % 10), desc: explanation.tf, color: 'bg-violet-500' },
    { label: mbti[3] === 'J' ? '判断 J' : '感知 P', score: mbti[3] === 'J' ? 65 + (mbti.charCodeAt(3) % 25) : 35 - (mbti.charCodeAt(3) % 10), desc: explanation.jp, color: 'bg-pink-500' },
  ];

  function generateEmailHTML(): string {
    return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>你的 ${mbti} 专业人格报告</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #030712; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; color: white; padding: 24px 16px 48px; }
  .container { max-width: 480px; margin: 0 auto; }
  .header { background: ${headerGradient}; border-radius: 20px; padding: 32px 24px; text-align: center; margin-bottom: 16px; }
  .avatar { width: 100px; height: 100px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.2); margin: 0 auto 12px; overflow: hidden; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
  .type-name { font-size: 48px; font-weight: 900; color: white; letter-spacing: 6px; }
  .type-title { font-size: 20px; font-weight: 700; color: rgba(255,255,255,0.9); margin-top: 4px; }
  .rarity { display: inline-block; margin-top: 8px; padding: 3px 14px; border-radius: 999px; background: rgba(255,255,255,0.1); font-size: 12px; color: rgba(255,255,255,0.7); }
  .traits { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; justify-content: center; }
  .trait { font-size: 12px; padding: 4px 10px; border-radius: 999px; background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); }
  .tagline { margin-top: 16px; font-size: 12px; color: rgba(255,255,255,0.6); font-style: italic; }
  .card { background: #111827; border-radius: 16px; padding: 20px; margin-bottom: 16px; }
  .card-title { font-size: 15px; font-weight: 700; color: white; margin-bottom: 4px; }
  .card-sub { font-size: 12px; color: #6b7280; margin-bottom: 16px; }
  .dim-bar { height: 8px; background: #1f2937; border-radius: 999px; overflow: hidden; margin: 6px 0 4px; }
  .dim-desc { font-size: 12px; color: #9ca3af; line-height: 1.6; margin-bottom: 12px; }
  .dot-row { display: flex; gap: 8px; margin-bottom: 10px; }
  .dot { color: #a78bfa; flex-shrink: 0; }
  .dot-pink { color: #f472b6; flex-shrink: 0; }
  .dot-text { font-size: 14px; color: #d1d5db; line-height: 1.6; }
  .celebrity-row { display: flex; gap: 12px; margin-bottom: 14px; align-items: flex-start; }
  .celebrity-avatar { width: 36px; height: 36px; border-radius: 50%; background: rgba(109,40,217,0.4); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; font-weight: 700; color: #c4b5fd; }
  .era-tag { display: inline-block; font-size: 11px; padding: 1px 7px; border-radius: 999px; background: rgba(255,255,255,0.1); color: #9ca3af; margin-left: 6px; }
  .career-tag { display: inline-block; padding: 6px 14px; border-radius: 12px; background: rgba(76,29,149,0.5); color: #ddd6fe; font-size: 13px; margin: 4px; }
  .city-row { display: flex; gap: 12px; margin-bottom: 12px; align-items: flex-start; }
  .bar-row { margin-bottom: 12px; }
  .bar-labels { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px; }
  .bar-bg { height: 6px; background: #1f2937; border-radius: 999px; overflow: hidden; }
  .bar-fill { height: 100%; background: linear-gradient(to right, #8b5cf6, #ec4899); border-radius: 999px; }
  .divider { height: 1px; background: rgba(255,255,255,0.1); margin: 14px 0; }
  .footer { text-align: center; padding: 16px; color: #374151; font-size: 12px; }
  .section-sub { font-size: 13px; font-weight: 600; color: white; margin: 14px 0 10px; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="avatar"><img src="${avatarUrl}" alt="${mbti}" /></div>
    <div style="font-size:11px;letter-spacing:3px;color:rgba(255,255,255,0.6);margin-bottom:4px;">人格类型</div>
    <div class="type-name">${mbti}</div>
    <div class="type-title">${description.title}</div>
    <div class="rarity">稀有度 ${description.rarity}</div>
    <div class="traits">${description.traits.map(t => `<span class="trait">${t}</span>`).join('')}</div>
    <div class="tagline">「${description.tagline}」</div>
  </div>

  <div class="card">
    <div class="card-title">🧠 为什么你是 ${mbti}？</div>
    <div class="card-sub">根据你的答题倾向分析</div>
    ${dimensions.map(dim => `
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:12px;font-weight:600;color:white;">${dim.label}</span>
        <span style="font-size:12px;color:#9ca3af;">${dim.score}%</span>
      </div>
      <div class="dim-bar"><div style="height:100%;width:${dim.score}%;background:linear-gradient(to right,#8b5cf6,#ec4899);border-radius:999px;"></div></div>
      <div class="dim-desc">${dim.desc}</div>
    `).join('')}
  </div>

  <div class="card">
    <div class="card-title">💡 性格特点详解</div>
    <div class="card-sub">${mbti} 人格的核心特质</div>
    ${description.personality.map((p, i) => `
      <div class="dot-row">
        <span class="dot" style="font-weight:700;">${i + 1}.</span>
        <span class="dot-text">${p}</span>
      </div>
    `).join('')}
  </div>

  <div class="card">
    <div class="card-title">⭐ 相似性格名人</div>
    <div class="card-sub">与你同类型的历史人物</div>
    ${description.celebrities.map(c => `
      <div class="celebrity-row">
        <div class="celebrity-avatar">${c.name[0]}</div>
        <div>
          <span style="color:white;font-size:14px;font-weight:600;">${c.name}</span>
          <span class="era-tag">${c.era}</span>
          <div style="color:#9ca3af;font-size:12px;margin-top:3px;line-height:1.5;">${c.desc}</div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="card">
    <div class="card-title">💼 职业与工作</div>
    <div class="card-sub">最适合 ${mbti} 发挥的领域</div>
    <div style="margin-bottom:14px;">${description.career.map(c => `<span class="career-tag">${c}</span>`).join('')}</div>
    <div class="divider"></div>
    <div class="section-sub">职场性格分析</div>
    ${description.personality.slice(0, 3).map(p => `
      <div class="dot-row"><span class="dot">•</span><span class="dot-text">${p}</span></div>
    `).join('')}
  </div>

  <div class="card">
    <div class="card-title">💕 爱情与关系</div>
    <div class="card-sub">${mbti} 在感情中的样子</div>
    <div class="section-sub">择偶建议</div>
    ${description.love.map(l => `
      <div class="dot-row"><span class="dot-pink">♥</span><span class="dot-text">${l}</span></div>
    `).join('')}
    <div class="divider"></div>
    <div class="section-sub">感情中的你</div>
    ${description.personality.slice(3).map(p => `
      <div class="dot-row"><span class="dot-pink">•</span><span class="dot-text">${p}</span></div>
    `).join('')}
  </div>

  <div class="card">
    <div class="card-title">🌍 适合居住的地方</div>
    <div class="card-sub">与你性格最契合的城市</div>
    ${description.cities.map((c, i) => `
      <div class="city-row">
        <span style="font-size:20px;flex-shrink:0;">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
        <div>
          <div style="color:white;font-size:14px;font-weight:600;margin-bottom:2px;">${c.city}</div>
          <div style="color:#9ca3af;font-size:12px;line-height:1.5;">${c.reason}</div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="card">
    <div class="card-title">🔮 2026年专属运势</div>
    <div class="card-sub">基于 ${mbti} 人格特质分析</div>
    <div style="color:#d1d5db;font-size:14px;line-height:1.7;margin-bottom:20px;">${description.fortune2026}</div>
    <div class="divider"></div>
    <div class="section-sub">📊 各项运势指数</div>
    ${fortuneScores.map(item => `
      <div class="bar-row">
        <div class="bar-labels">
          <span style="color:#9ca3af;">${item.label}</span>
          <span style="color:#c4b5fd;font-weight:600;">${item.value}</span>
        </div>
        <div class="bar-bg"><div class="bar-fill" style="width:${item.value}%"></div></div>
      </div>
    `).join('')}
  </div>

  <div class="footer">MBTI 人格测试 · 仅供参考娱乐</div>
</div>
</body>
</html>`;
  }

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
        body: JSON.stringify({ email: email.trim(), mbti, reportHtml: generateEmailHTML() }),
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

  // ── 顶部公众号提示条 ──
  const WechatBanner = () => (
    <div className="w-full bg-gradient-to-r from-green-900/80 to-emerald-900/80 border-b border-green-700/50 px-4 py-2.5 flex items-center justify-between gap-3 sticky top-0 z-10">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-green-400 text-base flex-shrink-0">📱</span>
        <p className="text-green-200 text-xs leading-tight">关注公众号，发手机后4位获取验证码</p>
      </div>
      <div className="w-10 h-10 bg-white rounded-lg overflow-hidden flex-shrink-0">
        <img src="/wechat_qr.png" alt="公众号" className="w-full h-full object-contain" />
      </div>
    </div>
  );

  // ── 头部卡片 ──
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

  // ── 模糊锁定块 ──
  const LockedSection = ({ title, emoji }: { title: string; emoji: string }) => (
    <div className="relative bg-gray-900 rounded-2xl p-5 mb-4 overflow-hidden">
      <h3 className="text-white font-bold text-sm mb-3">{emoji} {title}</h3>
      <div className="blur-sm select-none pointer-events-none">
        <div className="space-y-2">
          {['████████████████████', '██████████████', '█████████████████████████', '████████████'].map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-violet-400">•</span>
              <span className="text-gray-300 text-sm">{line}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 top-10 flex flex-col items-center justify-center bg-gray-950/70 rounded-b-2xl">
        <div className="text-xl mb-1">🔒</div>
        <p className="text-white text-xs font-semibold mb-0.5">专业版内容</p>
        <p className="text-gray-400 text-xs">升级解锁完整报告</p>
      </div>
    </div>
  );

  // ── 报告选择页 ──
  if (reportType === 'select') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center">
        <WechatBanner />
        <div className="w-full max-w-sm px-4 py-8">
          <HeaderCard />
          <h2 className="text-white text-lg font-bold text-center mb-2">选择你的报告版本</h2>
          <p className="text-gray-500 text-sm text-center mb-6">你的 {mbti} 测试结果已生成</p>

          <div className="bg-gray-900 rounded-2xl p-5 mb-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-base">免费版报告</h3>
              <span className="text-green-400 font-bold text-sm">免费</span>
            </div>
            <ul className="space-y-2 mb-5">
              <li className="flex items-center gap-2 text-sm text-gray-300"><span className="text-green-400">✓</span> 人格类型 + 稀有度</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><span className="text-green-400">✓</span> 性格标签</li>
              <li className="flex items-center gap-2 text-sm text-gray-400 line-through"><span className="text-gray-600">✗</span> 性格详细分析</li>
              <li className="flex items-center gap-2 text-sm text-gray-400 line-through"><span className="text-gray-600">✗</span> 相似名人 / 职业 / 爱情</li>
              <li className="flex items-center gap-2 text-sm text-gray-400 line-through"><span className="text-gray-600">✗</span> 城市推荐 / 2026运势</li>
            </ul>
            <button onClick={() => setReportType('free')} className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm transition-all">
              查看免费版
            </button>
          </div>

          <div className="bg-gray-900 rounded-2xl p-5 mb-6 border border-violet-500 relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-xs font-bold">推荐</div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold text-base">✨ 专业版报告</h3>
              <span className="text-violet-300 font-bold text-sm">¥9.9</span>
            </div>
            <ul className="space-y-2 mb-5">
              <li className="flex items-center gap-2 text-sm text-gray-300"><span className="text-violet-400">✓</span> 人格类型 + 维度分析图</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><span className="text-violet-400">✓</span> 为什么是这个类型的解释</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><span className="text-violet-400">✓</span> 性格详细分析（5大特点）</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><span className="text-violet-400">✓</span> 相似名人 + 职业 + 爱情</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><span className="text-violet-400">✓</span> 城市推荐 + 2026运势</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><span className="text-violet-400">✓</span> 📧 发送到邮箱永久保存</li>
            </ul>
            <button
              onClick={() => window.open(PRO_PAYMENT_URL, '_blank')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold text-sm transition-all"
            >
              立即解锁 ¥9.9 →
            </button>
          </div>

          <button onClick={onRestart} className="w-full py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium text-sm transition-all">
            🔄 重新测试
          </button>
        </div>
      </div>
    );
  }

  // ── 免费版报告页 ──
  if (reportType === 'free') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center">
        <WechatBanner />
        <div className="w-full max-w-sm px-4 py-8">
          <HeaderCard />
          {[
            { emoji: '🧠', title: '为什么是这个类型' },
            { emoji: '💡', title: '性格特点详解' },
            { emoji: '⭐', title: '相似性格名人' },
            { emoji: '💼', title: '职业分析' },
            { emoji: '💕', title: '爱情建议' },
            { emoji: '🌍', title: '适合居住地' },
            { emoji: '🔮', title: '2026运势' },
          ].map((item, i) => (
            <LockedSection key={i} title={item.title} emoji={item.emoji} />
          ))}
          <button
            onClick={() => window.open(PRO_PAYMENT_URL, '_blank')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold text-base transition-all mb-3"
          >
            ✨ 解锁完整专业版 ¥9.9
          </button>
          <button onClick={() => setReportType('select')} className="w-full py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium text-sm transition-all mb-3">
            ← 返回选择
          </button>
          <button onClick={onRestart} className="w-full py-3 rounded-2xl bg-gray-900 text-gray-500 text-sm transition-all">
            🔄 重新测试
          </button>
        </div>
      </div>
    );
  }

  // ── 专业版报告页 ──
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center">
      <WechatBanner />
      <div className="w-full max-w-sm px-4 py-8">

        <div className="text-center mb-4">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-bold">✨ 专业版报告</span>
        </div>

        <HeaderCard />

        {/* 为什么是这个类型 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-1">🧠 为什么你是 {mbti}？</h3>
          <p className="text-gray-500 text-xs mb-4">根据你的答题倾向分析</p>
          <div className="space-y-4">
            {dimensions.map((dim, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-xs font-semibold">{dim.label}</span>
                  <span className="text-gray-500 text-xs">{dim.score}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                  <div className={`h-full ${dim.color} rounded-full`} style={{ width: `${dim.score}%` }} />
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{dim.desc}</p>
                {i < dimensions.length - 1 && <div className="mt-3 h-px bg-gray-800" />}
              </div>
            ))}
          </div>
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

        {/* 邮件发送 - 直接写在JSX里避免焦点问题 */}
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

        {/* 底部公众号 */}
        <div className="bg-green-900/30 border border-green-700/40 rounded-2xl p-5 mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0">
            <img src="/wechat_qr.png" alt="公众号" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-green-300 text-sm font-semibold mb-1">📱 关注公众号</p>
            <p className="text-gray-400 text-xs leading-relaxed">获取更多人格分析内容<br />以及专属优惠码</p>
          </div>
        </div>

        <button onClick={() => setReportType('select')} className="w-full py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium text-sm transition-all mb-3">
          ← 返回选择
        </button>
        <button onClick={onRestart} className="w-full py-3 rounded-2xl bg-gray-900 text-gray-500 text-sm transition-all">
          🔄 重新测试
        </button>
      </div>
    </div>
  );
}