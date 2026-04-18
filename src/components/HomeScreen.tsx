'use client';

import { useState } from 'react';
import MbtiTest from './MbtiTest';

export default function HomeScreen() {
  const [started, setStarted] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [debugPro, setDebugPro] = useState(false);

  if (started) {
    return <MbtiTest debugMode={debugMode} debugPro={debugPro} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-start px-4 py-8">
      <div className="w-full max-w-sm">

        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🧠</div>
          <h1 className="text-3xl font-black text-white tracking-wide mb-2">MBTI 人格测试</h1>
          <p className="text-gray-400 text-sm leading-relaxed">100道题，深度分析你的人格类型<br />专属报告 + AI解读 + 2026运势</p>
        </div>

        {/* MBTI 介绍（默认展开） */}
        <div className="mb-8 bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            <span>ℹ️</span> 什么是 MBTI？
          </h2>
          
          <div className="space-y-4 text-gray-300 text-sm">
            {/* 简介 */}
            <div>
              <p className="leading-relaxed">
                MBTI（迈尔斯-布里格斯人格分类法）是全球最受欢迎的人格评估工具，通过 4 个维度将人格分为 16 种类型。
              </p>
            </div>

            {/* 4 个维度 */}
            <div className="border-t border-gray-800 pt-3">
              <p className="text-gray-400 text-xs mb-3 font-semibold">4 个维度：</p>
              <div className="space-y-2 text-xs">
                <div className="flex gap-2">
                  <span className="text-violet-400 font-bold min-w-12">E ↔ I</span>
                  <span>内向/外向 (Extraversion ↔ Introversion)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-violet-400 font-bold min-w-12">S ↔ N</span>
                  <span>感知/直觉 (Sensing ↔ Intuition)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-violet-400 font-bold min-w-12">T ↔ F</span>
                  <span>思考/情感 (Thinking ↔ Feeling)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-violet-400 font-bold min-w-12">J ↔ P</span>
                  <span>判断/知觉 (Judging ↔ Perceiving)</span>
                </div>
              </div>
            </div>

            {/* 历史 */}
            <div className="border-t border-gray-800 pt-3">
              <p className="text-gray-400 text-xs mb-2 font-semibold">发明与历史：</p>
              <p className="text-xs leading-relaxed">
                由美国心理学家 <span className="text-violet-300">Isabel Briggs Myers</span> 和其母亲 Katharine Cook Briggs 在 1942 年开发，基于荣格心理学理论，已被全球 9000+ 万人使用。
              </p>
            </div>
          </div>
        </div>

        {/* 开始测试 */}
        <button
          onClick={() => { setDebugMode(false); setDebugPro(false); setStarted(true); }}
          className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-base transition-all mb-3"
        >
          开始测试 →
        </button>

        <div className="flex justify-center gap-4 text-gray-600 text-xs mb-8">
          <span>📝 100道题</span>
          <span>⏱ 约10分钟</span>
          <span>🔒 隐私保护</span>
        </div>

        {/* 调试区域 */}
        <div className="border-t border-gray-800 pt-6 space-y-2">
          <p className="text-gray-700 text-xs text-center mb-3">— 开发调试 —</p>
          <button
            onClick={() => { setDebugMode(true); setDebugPro(false); setStarted(true); }}
            className="w-full py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-500 font-medium text-sm transition-all"
          >
            🛠 跳过题目，查看报告
          </button>
          <button
            onClick={() => { setDebugMode(true); setDebugPro(true); setStarted(true); }}
            className="w-full py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-violet-800 text-violet-500 font-medium text-sm transition-all"
          >
            ✨ 跳过题目，直接查看报告
          </button>
        </div>

      </div>
    </div>
  );
}