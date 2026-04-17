'use client';

import { useState } from 'react';
import { questions, mbtiDescriptions, type Dimension } from '@/data/questions';
import ResultCard from './ResultCard';

type Answer = 'A' | 'B';

function calculateMBTI(answers: Record<number, Answer>): string {
  const scores: Record<Dimension, { a: number; b: number }> = {
    EI: { a: 0, b: 0 },
    SN: { a: 0, b: 0 },
    TF: { a: 0, b: 0 },
    JP: { a: 0, b: 0 },
  };

  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer === 'A') scores[q.dimension].a++;
    else if (answer === 'B') scores[q.dimension].b++;
  });

  const ei = scores.EI.a >= scores.EI.b ? 'E' : 'I';
  const sn = scores.SN.a >= scores.SN.b ? 'S' : 'N';
  const tf = scores.TF.a >= scores.TF.b ? 'T' : 'F';
  const jp = scores.JP.a >= scores.JP.b ? 'J' : 'P';

  return `${ei}${sn}${tf}${jp}`;
}

export default function MbtiTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [result, setResult] = useState<string | null>(null);
  const [selected, setSelected] = useState<Answer | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;

  function handleSelect(choice: Answer) {
    setSelected(choice);
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQuestion.id]: choice };
      setAnswers(newAnswers);
      setSelected(null);
      if (isLast) {
        const mbti = calculateMBTI(newAnswers);
        setResult(mbti);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }, 300);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setSelected(null);
  }

  if (result) {
    const desc = mbtiDescriptions[result];
    return <ResultCard mbti={result} description={desc} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-10">
      {/* 顶部标题 */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white tracking-wide">MBTI 人格测试</h1>
        <p className="text-gray-400 text-sm mt-1">第 {currentIndex + 1} / {questions.length} 题</p>
      </div>

      {/* 进度条 */}
      <div className="w-full max-w-md mb-8">
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 题目卡片 */}
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6 shadow-xl mb-6">
        <p className="text-white text-lg font-medium leading-relaxed text-center">
          {currentQuestion.text}
        </p>
      </div>

      {/* 选项 */}
      <div className="w-full max-w-md flex flex-col gap-3">
        {(['A', 'B'] as Answer[]).map((choice) => {
          const text = choice === 'A' ? currentQuestion.aChoice : currentQuestion.bChoice;
          const isSelected = selected === choice;
          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              className={`w-full rounded-2xl px-5 py-4 text-left text-sm font-medium transition-all duration-200 border
                ${isSelected
                  ? 'bg-violet-600 border-violet-500 text-white scale-[0.98]'
                  : 'bg-gray-900 border-gray-700 text-gray-200 hover:border-violet-500 hover:bg-gray-800'
                }`}
            >
              <span className="text-violet-400 font-bold mr-2">{choice}.</span>
              {text}
            </button>
          );
        })}
      </div>

      {/* 维度提示 */}
      <p className="mt-6 text-gray-600 text-xs">
        当前维度：{currentQuestion.dimension[0]} vs {currentQuestion.dimension[1]}
      </p>
    </div>
  );
}