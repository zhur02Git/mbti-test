'use client';

import { useState } from 'react';
import { questions, mbtiDescriptions, PHASE_1_END, PHASE_2_END, PHASE_3_END, type Dimension } from '@/data/questions';
import ResultCard from './ResultCard';
import LoadingReport from './LoadingReport';

type Phase = 1 | 2 | 3;
type AppState = 'test' | 'phase-transition' | 'loading' | 'result';

const ALL_TYPES = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];

function randomType() {
  return ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)];
}

function calculateMBTI(answers: Record<number, number>): string {
  const scores: Record<Dimension, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const counts: Record<Dimension, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };

  questions.forEach((q) => {
    const val = answers[q.id];
    if (val !== undefined) {
      scores[q.dimension] += val;
      counts[q.dimension]++;
    }
  });

  const ei = (scores.EI / counts.EI) <= 3 ? 'E' : 'I';
  const sn = (scores.SN / counts.SN) <= 3 ? 'S' : 'N';
  const tf = (scores.TF / counts.TF) <= 3 ? 'T' : 'F';
  const jp = (scores.JP / counts.JP) <= 3 ? 'J' : 'P';

  return `${ei}${sn}${tf}${jp}`;
}

const PHASE_MESSAGES = {
  1: {
    title: '第一阶段完成 🎯',
    subtitle: '已初步定位你的人格类型',
    desc: '接下来将探索你的深层隐藏人格，请继续',
    next: '好的，继续测试',
  },
  2: {
    title: '第二阶段完成 🔍',
    subtitle: '人格轮廓已经逐渐清晰',
    desc: '最后阶段将深度分析你的核心性格，请继续',
    next: '开始最终测试',
  },
};

export default function MbtiTest({ debugMode = false, debugPro = false }: { debugMode?: boolean; debugPro?: boolean }) {
  const initType = debugMode ? randomType() : null;
  const [appState, setAppState] = useState<AppState>(debugMode ? 'result' : 'test');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<string | null>(initType);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>(1);

  // 专业版调试：直接设置 localStorage
  if (debugPro && typeof window !== 'undefined') {
    localStorage.setItem('mbti_pro_unlocked', 'true');
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = (currentIndex / totalQuestions) * 100;

  function handleSelect(value: number) {
    setSelected(value);
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQuestion.id]: value };
      setAnswers(newAnswers);
      setSelected(null);

      const nextIndex = currentIndex + 1;

      if (currentIndex + 1 === PHASE_1_END) {
        setCurrentIndex(nextIndex);
        setAppState('phase-transition');
        setPhase(1);
      } else if (currentIndex + 1 === PHASE_2_END) {
        setCurrentIndex(nextIndex);
        setAppState('phase-transition');
        setPhase(2);
      } else if (currentIndex + 1 === PHASE_3_END) {
        const mbti = calculateMBTI(newAnswers);
        setResult(mbti);
        setAppState('loading');
      } else {
        setCurrentIndex(nextIndex);
      }
    }, 250);
  }

  function handlePrev() {
    if (currentIndex === 0) return;
    setSelected(null);
    setCurrentIndex((i) => i - 1);
    const prevIndex = currentIndex - 1;
    if (prevIndex < PHASE_1_END) setPhase(1);
    else if (prevIndex < PHASE_2_END) setPhase(2);
    else setPhase(3);
  }

  function handlePhaseNext() {
    setPhase((p) => (p === 1 ? 2 : 3) as Phase);
    setAppState('test');
  }

  function handlePhaseBack() {
    setCurrentIndex(currentIndex - 1);
    setSelected(null);
    if (phase === 1) setPhase(1);
    else setPhase((p) => (p - 1) as Phase);
    setAppState('test');
  }

  function handleLoadingDone() {
    setAppState('result');
  }

  function handleRestart() {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setSelected(null);
    setPhase(1);
    setAppState('test');
  }

  if (appState === 'phase-transition') {
    const msg = PHASE_MESSAGES[phase as 1 | 2];
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="w-full h-52 bg-gradient-to-b from-violet-900/40 to-gray-900/40 rounded-2xl mb-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-3">{phase === 1 ? '🧠' : '🔮'}</div>
              <div className="flex gap-1 justify-center">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i <= phase ? 'bg-violet-500 w-8' : 'bg-gray-700 w-4'}`} />
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white text-center mb-2">{msg.title}</h2>
          <p className="text-violet-300 text-sm text-center font-medium mb-2">{msg.subtitle}</p>
          <p className="text-gray-400 text-sm text-center mb-8">{msg.desc}</p>
          <button onClick={handlePhaseNext} className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all mb-3">
            {msg.next}
          </button>
          <button onClick={handlePhaseBack} className="w-full py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium text-sm transition-all">
            ← 返回修改上一题
          </button>
        </div>
      </div>
    );
  }

  if (appState === 'loading' && result) {
    return <LoadingReport onDone={handleLoadingDone} />;
  }

  if (appState === 'result' && result) {
    const desc = mbtiDescriptions[result];
    return <ResultCard mbti={result} description={desc} onRestart={handleRestart} />;
  }

  const canGoBack = currentIndex > 0;
  const circles = [
    { val: 1, label: null },
    { val: 2, label: null },
    { val: 3, label: '都有' },
    { val: 4, label: null },
    { val: 5, label: null },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md mb-2 flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={!canGoBack}
          className={`text-xs px-3 py-1.5 rounded-xl transition-all
            ${canGoBack ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-700 cursor-not-allowed'}`}
        >
          ← 上一题
        </button>
        <span className="text-gray-500 text-xs">{currentIndex + 1} / {totalQuestions}</span>
        <span className="text-gray-600 text-xs">第 {phase} 阶段</span>
      </div>

      <div className="w-full max-w-md mb-6">
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6 shadow-xl mb-4">
        <p className="text-white text-lg font-medium leading-relaxed text-center mb-4">{currentQuestion.text}</p>
        <p className="text-gray-500 text-xs leading-relaxed text-center border-t border-gray-800 pt-4">
          💭 {currentQuestion.hint}
        </p>
      </div>

      <div className="w-full max-w-md flex justify-between items-center mb-3 px-1">
        <span className="text-sm text-gray-300 font-medium">{currentQuestion.aLabel}</span>
        <span className="text-sm text-gray-300 font-medium">{currentQuestion.bLabel}</span>
      </div>

      <div className="w-full max-w-md flex justify-between items-center px-2 mb-2">
        {circles.map(({ val, label }) => {
          const isSelected = selected === val || (answers[currentQuestion.id] === val && selected === null);
          const borderColor =
            val <= 2
              ? isSelected ? 'border-green-400 bg-green-400' : 'border-green-700'
              : val >= 4
              ? isSelected ? 'border-violet-400 bg-violet-400' : 'border-violet-700'
              : isSelected ? 'border-gray-400 bg-gray-400' : 'border-gray-600';

          return (
            <button
              key={val}
              onClick={() => handleSelect(val)}
              className={`w-14 h-14 rounded-full border-2 transition-all duration-200 flex flex-col items-center justify-center
                ${borderColor} ${isSelected ? 'scale-110' : 'hover:scale-105 hover:opacity-80'}`}
            >
              {isSelected ? (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : label ? (
                <span className="text-gray-400 text-xs font-medium">{label}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="w-full max-w-md flex justify-between px-3">
        <span className="text-gray-600 text-xs">← 更像 A</span>
        <span className="text-gray-600 text-xs">更像 B →</span>
      </div>
    </div>
  );
}