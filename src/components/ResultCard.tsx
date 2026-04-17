'use client';

import { useState } from 'react';

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

export default function ResultCard({ mbti, description, onRestart }: Props) {
  const [saving, setSaving] = useState(false);

  const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${description.avatarSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  const fortuneScores = [
    { label: '事业运', value: 78 + (mbti.charCodeAt(0) % 15) },
    { label: '财运', value: 70 + (mbti.charCodeAt(1) % 18) },
    { label: '爱情运', value: 72 + (mbti.charCodeAt(2) % 16) },
    { label: '健康运', value: 75 + (mbti.charCodeAt(3) % 14) },
  ];

  // 渐变色映射
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

  const headerGradient = gradientMap[description.bgGradient] || 'linear-gradient(to bottom, #4c1d95, #6d28d9)';

  function generateHTML(): string {
    return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MBTI ${mbti} 人格报告</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #030712;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    color: white;
    padding: 24px 16px 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .report {
    width: 100%;
    max-width: 400px;
  }
  .header {
    background: ${headerGradient};
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .header-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 24px 16px;
  }
  .avatar {
    width: 112px;
    height: 112px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid rgba(255,255,255,0.2);
    margin-bottom: 12px;
  }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
  .type-label { font-size: 11px; letter-spacing: 3px; color: rgba(255,255,255,0.6); margin-bottom: 4px; }
  .type-name { font-size: 52px; font-weight: 900; color: white; letter-spacing: 6px; line-height: 1; }
  .type-title { font-size: 20px; font-weight: 700; color: rgba(255,255,255,0.9); margin-top: 6px; }
  .rarity {
    margin-top: 10px;
    padding: 3px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,0.1);
    font-size: 12px;
    color: rgba(255,255,255,0.7);
  }
  .traits {
    padding: 0 24px 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .trait-tag {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.85);
  }
  .tagline-wrap {
    padding: 0 24px 24px;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 12px;
    margin: 0 24px;
  }
  .tagline {
    text-align: center;
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    font-style: italic;
  }
  .card {
    background: #111827;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
  }
  .card-title {
    font-size: 14px;
    font-weight: 700;
    color: white;
    margin-bottom: 14px;
  }
  .dot-row {
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
  }
  .dot { color: #a78bfa; flex-shrink: 0; margin-top: 2px; }
  .dot-pink { color: #f472b6; flex-shrink: 0; margin-top: 2px; }
  .dot-text { font-size: 14px; color: #d1d5db; line-height: 1.6; }
  .celebrity-row {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 14px;
  }
  .celebrity-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(109,40,217,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 700;
    color: #c4b5fd;
  }
  .celebrity-name { font-size: 14px; font-weight: 600; color: white; }
  .era-tag {
    display: inline-block;
    font-size: 11px;
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(255,255,255,0.1);
    color: #9ca3af;
    margin-left: 8px;
  }
  .celebrity-desc { font-size: 12px; color: #9ca3af; line-height: 1.5; margin-top: 3px; }
  .career-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
  .career-tag {
    padding: 6px 14px;
    border-radius: 12px;
    background: rgba(76,29,149,0.5);
    color: #ddd6fe;
    font-size: 14px;
    font-weight: 500;
  }
  .city-row { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; }
  .city-icon { font-size: 18px; flex-shrink: 0; }
  .city-name { font-size: 14px; font-weight: 600; color: white; margin-bottom: 2px; }
  .city-reason { font-size: 12px; color: #9ca3af; line-height: 1.5; }
  .fortune-text { font-size: 14px; color: #d1d5db; line-height: 1.7; margin-bottom: 20px; }
  .fortune-sub { font-size: 12px; color: #6b7280; margin-bottom: 16px; margin-top: 4px; }
  .bar-row { margin-bottom: 12px; }
  .bar-labels { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px; }
  .bar-label { color: #9ca3af; }
  .bar-value { color: #c4b5fd; font-weight: 600; }
  .bar-bg { height: 6px; background: #1f2937; border-radius: 999px; overflow: hidden; }
  .bar-fill { height: 100%; background: linear-gradient(to right, #8b5cf6, #ec4899); border-radius: 999px; }
  .divider { height: 1px; background: rgba(255,255,255,0.1); margin: 14px 0; }
  .section-sub { font-size: 14px; font-weight: 700; color: white; margin: 16px 0 12px; }
  .footer { text-align: center; padding: 16px; color: #374151; font-size: 12px; }
</style>
</head>
<body>
<div class="report">

  <!-- 头部 -->
  <div class="header">
    <div class="header-top">
      <div class="avatar">
        <img src="${avatarUrl}" alt="${mbti}" crossorigin="anonymous" />
      </div>
      <div class="type-label">人格类型</div>
      <div class="type-name">${mbti}</div>
      <div class="type-title">${description.title}</div>
      <div class="rarity">稀有度 ${description.rarity}</div>
    </div>
    <div class="traits">
      ${description.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
    </div>
    <div style="margin: 0 24px; height: 1px; background: rgba(255,255,255,0.1); margin-bottom: 12px;"></div>
    <div style="text-align:center; font-size:12px; color:rgba(255,255,255,0.6); font-style:italic; padding-bottom: 24px;">
      「${description.tagline}」
    </div>
  </div>

  <!-- 性格特点 -->
  <div class="card">
    <div class="card-title">🧠 性格特点详解</div>
    ${description.personality.map(p => `
      <div class="dot-row">
        <span class="dot">•</span>
        <span class="dot-text">${p}</span>
      </div>
    `).join('')}
  </div>

  <!-- 相似名人 -->
  <div class="card">
    <div class="card-title">⭐ 相似性格名人</div>
    ${description.celebrities.map(c => `
      <div class="celebrity-row">
        <div class="celebrity-avatar">${c.name[0]}</div>
        <div>
          <div>
            <span class="celebrity-name">${c.name}</span>
            <span class="era-tag">${c.era}</span>
          </div>
          <div class="celebrity-desc">${c.desc}</div>
        </div>
      </div>
    `).join('')}
  </div>

  <!-- 职业 -->
  <div class="card">
    <div class="card-title">💼 适合的工作类型</div>
    <div class="career-tags">
      ${description.career.map(c => `<span class="career-tag">${c}</span>`).join('')}
    </div>
    <div class="card-title">🧠 职场性格分析</div>
    ${description.personality.slice(0, 3).map(p => `
      <div class="dot-row">
        <span class="dot">•</span>
        <span class="dot-text">${p}</span>
      </div>
    `).join('')}
  </div>

  <!-- 爱情 -->
  <div class="card">
    <div class="card-title">💕 爱情与择偶建议</div>
    ${description.love.map(l => `
      <div class="dot-row">
        <span class="dot-pink">♥</span>
        <span class="dot-text">${l}</span>
      </div>
    `).join('')}
    <div class="divider"></div>
    <div class="card-title">✨ 你在感情中的样子</div>
    ${description.personality.slice(3).map(p => `
      <div class="dot-row">
        <span class="dot-pink">•</span>
        <span class="dot-text">${p}</span>
      </div>
    `).join('')}
  </div>

  <!-- 居住地 -->
  <div class="card">
    <div class="card-title">🌍 适合居住的地方</div>
    ${description.cities.map((c, i) => `
      <div class="city-row">
        <span class="city-icon">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
        <div>
          <div class="city-name">${c.city}</div>
          <div class="city-reason">${c.reason}</div>
        </div>
      </div>
    `).join('')}
  </div>

  <!-- 运势 -->
  <div class="card">
    <div class="card-title">🔮 2026年专属运势</div>
    <div class="fortune-sub">基于 ${mbti} 人格特质分析</div>
    <div class="fortune-text">${description.fortune2026}</div>
    <div class="card-title">📊 各项运势指数</div>
    ${fortuneScores.map(item => `
      <div class="bar-row">
        <div class="bar-labels">
          <span class="bar-label">${item.label}</span>
          <span class="bar-value">${item.value}</span>
        </div>
        <div class="bar-bg">
          <div class="bar-fill" style="width: ${item.value}%"></div>
        </div>
      </div>
    `).join('')}
  </div>

  <div class="footer">MBTI 人格测试 · 仅供参考娱乐</div>
</div>
</body>
</html>`;
  }

  function handleSave() {
    if (saving) return;
    setSaving(true);
    try {
      const html = generateHTML();
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `MBTI-${mbti}-完整报告.html`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('保存失败:', err);
      alert('保存失败，请重试');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 flex flex-col items-center">

      {/* 预览区域 */}
      <div className="w-full max-w-sm">

        {/* 头部卡片 */}
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

        {/* 性格特点 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-3">🧠 性格特点详解</h3>
          {description.personality.map((p, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <span className="text-violet-400 flex-shrink-0 mt-0.5">•</span>
              <p className="text-gray-300 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        {/* 相似名人 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-3">⭐ 相似性格名人</h3>
          {description.celebrities.map((c, i) => (
            <div key={i} className="flex gap-3 items-start mb-3">
              <div className="w-8 h-8 rounded-full bg-violet-900/60 flex items-center justify-center flex-shrink-0 text-sm font-bold text-violet-300">
                {c.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
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
          <h3 className="text-white font-bold text-sm mb-3">💼 适合的工作类型</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {description.career.map((c, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-violet-900/50 text-violet-200 text-sm font-medium">{c}</span>
            ))}
          </div>
          <h3 className="text-white font-bold text-sm mb-3">🧠 职场性格分析</h3>
          {description.personality.slice(0, 3).map((p, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <span className="text-violet-400 flex-shrink-0 mt-0.5">•</span>
              <p className="text-gray-300 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        {/* 爱情 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-3">💕 爱情与择偶建议</h3>
          {description.love.map((l, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <span className="text-pink-400 flex-shrink-0 mt-0.5">♥</span>
              <p className="text-gray-300 text-sm leading-relaxed">{l}</p>
            </div>
          ))}
          <div className="h-px bg-gray-800 my-4" />
          <h3 className="text-white font-bold text-sm mb-3">✨ 你在感情中的样子</h3>
          {description.personality.slice(3).map((p, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <span className="text-pink-400 flex-shrink-0 mt-0.5">•</span>
              <p className="text-gray-300 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>

        {/* 居住地 */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-4">
          <h3 className="text-white font-bold text-sm mb-3">🌍 适合居住的地方</h3>
          {description.cities.map((c, i) => (
            <div key={i} className="flex gap-3 items-start mb-3">
              <span className="text-lg flex-shrink-0">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
              <div>
                <p className="text-white text-sm font-semibold mb-0.5">{c.city}</p>
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
          <h3 className="text-white font-bold text-sm mb-4">📊 各项运势指数</h3>
          {fortuneScores.map((item, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-violet-300 font-semibold">{item.value}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 操作按钮 */}
      <div className="mt-6 flex flex-col gap-3 w-full max-w-sm pb-10">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-sm transition-all"
        >
          {saving ? '⏳ 生成中...' : '📥 下载完整报告 (HTML)'}
        </button>
        <button
          onClick={onRestart}
          className="w-full py-3.5 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm transition-all"
        >
          🔄 重新测试
        </button>
      </div>
    </div>
  );
}