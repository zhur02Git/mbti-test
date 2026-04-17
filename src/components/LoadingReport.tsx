'use client';

import { useEffect, useState } from 'react';

interface Props {
  onDone: () => void;
}

const LOADING_STEPS = [
  { label: '正在分析你的性格维度数据' },
  { label: '正在匹配16种人格类型库' },
  { label: '正在生成你的职业性格报告' },
  { label: '正在分析你的爱情择偶倾向' },
  { label: '正在计算2026年专属运势' },
];

const TOTAL_SECONDS = 15;

export default function LoadingReport({ onDone }: Props) {
  const [elapsed, setElapsed] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= TOTAL_SECONDS) {
          clearInterval(interval);
          setTimeout(onDone, 300);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onDone]);

  useEffect(() => {
    const stepDuration = TOTAL_SECONDS / LOADING_STEPS.length;
    const currentStep = Math.floor(elapsed / stepDuration);
    const newCompleted = [];
    for (let i = 0; i < currentStep; i++) newCompleted.push(i);
    setCompletedSteps(newCompleted);
  }, [elapsed]);

  const progress = Math.min((elapsed / TOTAL_SECONDS) * 100, 100);
  const currentStepIndex = Math.min(
    Math.floor(elapsed / (TOTAL_SECONDS / LOADING_STEPS.length)),
    LOADING_STEPS.length - 1
  );

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 rounded-full border-4 border-violet-500/20 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-violet-500 animate-spin" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-pink-400 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white font-black text-xl">MBTI</span>
              <span className="text-violet-400 text-xs mt-0.5">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        <h2 className="text-white text-lg font-bold text-center mb-1">你的专属报告正在生成中</h2>
        <p className="text-gray-500 text-sm text-center mb-8">预计还需 {Math.max(TOTAL_SECONDS - elapsed, 0)} 秒</p>

        <div className="w-full h-1.5 bg-gray-800 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-4">
          {LOADING_STEPS.map((step, i) => {
            const isDone = completedSteps.includes(i);
            const isActive = i === currentStepIndex && !isDone;
            return (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all
                    ${isDone ? 'bg-violet-500' : isActive ? 'bg-gray-700 border-2 border-violet-500' : 'bg-gray-800'}`}>
                    {isDone && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isActive && <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />}
                  </div>
                  <span className={`text-sm transition-all ${isDone ? 'text-gray-500 line-through' : isActive ? 'text-white font-medium' : 'text-gray-600'}`}>
                    {step.label}
                  </span>
                </div>
                {isActive && (
                  <div className="ml-8 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full"
                      style={{ width: `${((elapsed % 3) / 3) * 100}%`, transition: 'width 1s linear' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}