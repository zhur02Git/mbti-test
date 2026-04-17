'use client';

import { useState } from 'react';
import MbtiTest from './MbtiTest';

type Gender = 'male' | 'female' | 'other' | null;
type AgeGroup = 'under18' | '18-24' | '25-34' | '35-44' | '45+' | null;

export default function HomeScreen() {
  const [started, setStarted] = useState(false);
  const [gender, setGender] = useState<Gender>(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(null);
  const [debugMode, setDebugMode] = useState(false);

  if (started) {
    return <MbtiTest debugMode={debugMode} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">

        {/* 标题 */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🧠</div>
          <h1 className="text-3xl font-black text-white tracking-wide mb-2">MBTI 人格测试</h1>
          <p className="text-gray-400 text-sm leading-relaxed">100道题，深度分析你的人格类型<br />专属报告 + AI解读 + 2026运势</p>
        </div>

        {/* 性别选择 */}
        <div className="mb-6">
          <p className="text-gray-400 text-xs mb-3 tracking-wide">你的性别</p>
          <div className="flex gap-2">
            {[
              { key: 'male', label: '♂ 男生' },
              { key: 'female', label: '♀ 女生' },
              { key: 'other', label: '⚧ 其他' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setGender(item.key as Gender)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border
                  ${gender === item.key
                    ? 'bg-violet-600 border-violet-500 text-white'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 年龄选择 */}
        <div className="mb-8">
          <p className="text-gray-400 text-xs mb-3 tracking-wide">你的年龄段</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'under18', label: '18岁以下' },
              { key: '18-24', label: '18-24岁' },
              { key: '25-34', label: '25-34岁' },
              { key: '35-44', label: '35-44岁' },
              { key: '45+', label: '45岁以上' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setAgeGroup(item.key as AgeGroup)}
                className={`py-2.5 rounded-xl text-xs font-medium transition-all border
                  ${ageGroup === item.key
                    ? 'bg-violet-600 border-violet-500 text-white'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 开始测试按钮 */}
        <button
          onClick={() => {
            setDebugMode(false);
            setStarted(true);
          }}
          className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-base transition-all mb-3"
        >
          开始测试 →
        </button>

        {/* 测试说明 */}
        <div className="flex justify-center gap-4 text-gray-600 text-xs mb-8">
          <span>📝 100道题</span>
          <span>⏱ 约10分钟</span>
          <span>🔒 隐私保护</span>
        </div>

        {/* 调试按钮（分隔线） */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-700 text-xs text-center mb-3">— 开发调试 —</p>
          <button
            onClick={() => {
              setDebugMode(true);
              setStarted(true);
            }}
            className="w-full py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-500 font-medium text-sm transition-all"
          >
            🛠 跳过题目，直接看报告
          </button>
        </div>

      </div>
    </div>
  );
}