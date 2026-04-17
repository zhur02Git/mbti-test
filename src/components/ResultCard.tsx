'use client';

import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

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
}

interface Props {
  mbti: string;
  description: Description;
  onRestart: () => void;
}

export default function ResultCard({ mbti, description, onRestart }: Props) {
  const [aiText, setAiText] = useState('');
  const [loading, setLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${description.avatarSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  useEffect(() => {
    fetchAiDescription();
  }, [mbti]);

  async function fetchAiDescription() {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mbti }),
      });
      const data = await res.json();
      setAiText(data.text || '');
    } catch {
      setAiText('你是独一无二的存在，无论是哪种类型，都有属于自己的光芒。');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2, useCORS: true });
    const link = document.createElement('a');
    link.download = `MBTI-${mbti}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-10">
      <div ref={cardRef} className={`w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b ${description.bgGradient}`}>

        {/* 头像区域 */}
        <div className="flex flex-col items-center pt-8 pb-2 px-6">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-white/10 border-4 border-white/20 shadow-lg mb-3">
            <img
              src={avatarUrl}
              alt={mbti}
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-xs font-semibold tracking-widest text-white/60 mb-1">人格类型</div>
          <h1 className="text-5xl font-black text-white tracking-wider mb-1">{mbti}</h1>
          <h2 className="text-xl font-bold text-white/90">{description.title}</h2>
          <div className="mt-2 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs">
            稀有度 {description.rarity}
          </div>
        </div>

        {/* 分隔线 */}
        <div className="mx-6 mt-4 h-px bg-white/10" />

        {/* 特征标签 */}
        <div className="px-6 py-5">
          <p className="text-white/50 text-xs mb-3 tracking-wide">性格特征</p>
          <div className="flex flex-wrap gap-2">
            {description.traits.map((trait, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* AI 个性化描述 */}
        <div className="px-6 pb-5">
          <p className="text-white/50 text-xs mb-2 tracking-wide">AI 解读</p>
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <p className="text-white/80 text-sm leading-relaxed">{aiText}</p>
          )}
        </div>

        {/* 底部 tagline */}
        <div className="px-6 pb-8">
          <div className="h-px bg-white/10 mb-4" />
          <p className="text-center text-white/60 text-xs italic">「{description.tagline}」</p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="mt-6 flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all"
        >
          📥 保存卡片
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