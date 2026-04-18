'use client';

import { useState } from 'react';
import MbtiTest from './MbtiTest';

type Gender = 'male' | 'female' | null;

export default function HomeScreen() {
  const [started, setStarted] = useState(false);
  const [gender, setGender] = useState<Gender>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [debugPro, setDebugPro] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugCode, setDebugCode] = useState('');

  if (started) {
    return <MbtiTest gender={gender || 'male'} debugMode={debugMode} debugPro={debugPro} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-start px-4 py-8">
      <div className="w-full max-w-sm">

        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl font-black text-violet-500 mb-4 tracking-wider">MBTI</div>
          <h1 className="text-3xl font-black text-white tracking-wide mb-2">人格测试</h1>
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
                  <span>外向/内向 (Extraversion ↔ Introversion)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-violet-400 font-bold min-w-12">S ↔ N</span>
                  <span>感觉/直觉 (Sensing ↔ Intuition)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-violet-400 font-bold min-w-12">T ↔ F</span>
                  <span>思考/情感 (Thinking ↔ Feeling)</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-violet-400 font-bold min-w-12">J ↔ P</span>
                  <span>判断/感知 (Judging ↔ Perceiving)</span>
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

        {/* 性别选择 */}
        <div className="mb-8">
          <p className="text-gray-400 text-xs mb-3 tracking-wide font-semibold">选择你的性别</p>
          <div className="flex gap-3">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border
                ${gender === 'male'
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
            >
              ♂ 男性
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border
                ${gender === 'female'
                  ? 'bg-pink-600 border-pink-500 text-white'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
            >
              ♀ 女性
            </button>
          </div>
        </div>

        {/* 开始测试 */}
        <button
          onClick={() => { setDebugMode(false); setDebugPro(false); setStarted(true); }}
          disabled={!gender}
          className={`w-full py-4 rounded-2xl text-white font-bold text-base transition-all mb-3
            ${gender 
              ? 'bg-violet-600 hover:bg-violet-500' 
              : 'bg-gray-700 cursor-not-allowed opacity-50'
            }`}
        >
          开始测试 →
        </button>

        <div className="flex justify-center gap-4 text-gray-600 text-xs mb-8">
          <span>📝 100道题</span>
          <span>⏱ 约10分钟</span>
          <span>🔒 隐私保护</span>
        </div>

        {/* 密码输入 */}
        {!showDebug && (
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-700 text-xs text-center mb-3">开发者模式</p>
            <div className="flex gap-2">
              <input
                type="password"
                value={debugCode}
                onChange={(e) => setDebugCode(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && debugCode === 'Rui') {
                    setShowDebug(true);
                    setDebugCode('');
                  }
                }}
                placeholder="输入密码"
                className="flex-1 bg-gray-800 text-white text-xs rounded-xl px-3 py-2 outline-none border border-gray-700 focus:border-violet-500"
              />
              <button
                onClick={() => {
                  if (debugCode === 'Rui') {
                    setShowDebug(true);
                    setDebugCode('');
                  }
                }}
                className="px-3 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-400 text-xs font-medium transition-all"
              >
                确认
              </button>
            </div>
          </div>
        )}

        {/* 调试区域 */}
        {showDebug && (
          <div className="border-t border-gray-800 pt-6 space-y-2">
            <p className="text-gray-700 text-xs text-center mb-3">— 开发调试 —</p>
            <button
              onClick={() => { setDebugMode(true); setDebugPro(false); setGender('male'); setStarted(true); }}
              className="w-full py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-500 font-medium text-sm transition-all"
            >
              🛠 跳过题目，查看报告1
            </button>
            <button
              onClick={() => { setDebugMode(true); setDebugPro(true); setGender('male'); setStarted(true); }}
              className="w-full py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-violet-800 text-violet-500 font-medium text-sm transition-all"
            >
              ✨ 跳过题目，直接查看报告
            </button>
            <button
              onClick={() => {
                setShowDebug(false);
                setDebugCode('');
              }}
              className="w-full py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-500 font-medium text-sm transition-all"
            >
              关闭
            </button>
          </div>
        )}

      </div>
    </div>
  );
}