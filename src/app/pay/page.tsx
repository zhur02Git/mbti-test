'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PayPage() {
  const [step, setStep] = useState<'pay' | 'verify'>('pay');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleVerify() {
    if (!code.trim()) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      const trimmedCode = code.trim().toUpperCase();

      const { data, error } = await supabase
        .from('payment_codes')
        .select('*')
        .eq('code', trimmedCode)
        .single();

      if (error || !data) {
        setStatus('error');
        setErrorMsg('验证码无效，请检查后重试');
        return;
      }

       if (data.used && data.code !== 'MBTITEST') {
        setStatus('error');
        setErrorMsg('该验证码已被使用');
        return;
      }

      // 非永久码才标记为已使用
      if (data.code !== 'MBTITEST') {
        await supabase
          .from('payment_codes')
          .update({ used: true, used_at: new Date().toISOString() })
          .eq('code', trimmedCode);
      }

      localStorage.setItem('mbti_pro_unlocked', 'true');
      setStatus('success');

    } catch {
      setStatus('error');
      setErrorMsg('网络错误，请重试');
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-black text-white mb-2">专业版已解锁！</h1>
          <p className="text-gray-400 text-sm mb-8">返回重新测试即可查看完整报告</p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-base"
          >
            返回开始测试 →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">

        {/* 顶部标题 */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">✨</div>
          <h1 className="text-2xl font-black text-white mb-2">解锁专业版报告</h1>
          <p className="text-gray-400 text-sm">一次付费，永久查看完整人格分析</p>
        </div>

        {/* 步骤指示器 */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
            ${step === 'pay' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
            <span>1</span><span>扫码付款</span>
          </div>
          <div className="w-6 h-px bg-gray-700" />
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
            ${step === 'verify' ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
            <span>2</span><span>输入验证码</span>
          </div>
        </div>

        {step === 'pay' ? (
          <>
            {/* 内容列表 */}
            <div className="bg-gray-900 rounded-2xl p-5 mb-5">
              <p className="text-violet-300 text-xs font-semibold mb-3 tracking-wide">专业版包含</p>
              {[
                '🧠 性格特点详细分析（5大维度）',
                '⭐ 相似性格名人（古代/近代/现代）',
                '💼 职业推荐 + 职场性格分析',
                '💕 爱情择偶建议 + 感情分析',
                '🌍 最适合居住的城市推荐',
                '🔮 2026年专属运势预测',
                '📥 可下载完整HTML报告',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5 border-b border-gray-800 last:border-0">
                  <span className="text-violet-400 text-sm flex-shrink-0">✓</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* 价格 */}
            <div className="text-center mb-5">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-gray-500 text-sm">仅需</span>
                <span className="text-4xl font-black text-white">¥9.9</span>
              </div>
              <p className="text-gray-600 text-xs mt-1">一杯奶茶的价格，了解真实的自己</p>
            </div>

            {/* 收款码 */}
            <div className="bg-gray-900 rounded-2xl p-5 mb-4 flex flex-col items-center">
              <p className="text-white font-semibold text-sm mb-1">扫码付款 ¥9.9</p>
              <p className="text-gray-500 text-xs mb-4">微信扫码</p>
              <div className="w-48 h-48 bg-white rounded-2xl overflow-hidden flex items-center justify-center mb-4">
                <img src="/qrcode.png" alt="收款码" className="w-full h-full object-contain" />
              </div>
              {/* 重要提示 */}
              <div className="w-full bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3">
                <p className="text-yellow-400 text-xs font-semibold mb-1">⚠️ 付款时必须备注</p>
                <p className="text-gray-300 text-xs leading-relaxed">
                  付款备注填写你的<span className="text-white font-bold">手机号后4位数字</span><br />
                  例如手机号 138xxxx<span className="text-yellow-300 font-bold">5678</span>，备注填 <span className="text-yellow-300 font-bold">5678</span>
                </p>
              </div>
            </div>

            {/* 关注公众号 */}
            <div className="bg-gray-900 rounded-2xl p-5 mb-5">
              <p className="text-white font-semibold text-sm mb-1">📱 关注公众号获取验证码</p>
              <p className="text-gray-500 text-xs mb-4">付款后关注公众号，发送手机后4位即可获得验证码</p>
              <div className="w-36 h-36 bg-white rounded-xl overflow-hidden mx-auto flex items-center justify-center mb-3">
                <img src="/wechat_qr.png" alt="公众号二维码" className="w-full h-full object-contain" />
              </div>
              <p className="text-gray-600 text-xs text-center">长按识别 / 微信扫码关注</p>
            </div>

            {/* 步骤说明 */}
            <div className="bg-gray-900/60 rounded-2xl p-4 mb-5">
              <p className="text-gray-300 text-xs font-semibold mb-3">📋 完整操作步骤</p>
              {[
                { step: '①', text: '扫上方收款码，付款 ¥9.9', highlight: '备注填写手机号后4位数字' },
                { step: '②', text: '扫下方二维码，关注公众号', highlight: null },
                { step: '③', text: '在公众号发送你的', highlight: '手机号后4位数字' },
                { step: '④', text: '收到验证码后，点击下方按钮输入解锁', highlight: null },
              ].map((s, i) => (
                <div key={i} className="flex gap-2 mb-2 last:mb-0">
                  <span className="text-violet-400 text-xs font-bold flex-shrink-0 mt-0.5">{s.step}</span>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {s.text}
                    {s.highlight && (
                      <span className="text-yellow-400 font-semibold"> {s.highlight}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('verify')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold text-base transition-all mb-3"
            >
              我已付款，输入验证码 →
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium text-sm transition-all"
            >
              ← 返回
            </button>
          </>
        ) : (
          <>
            {/* 验证码输入提示 */}
            <div className="bg-gray-900/60 rounded-2xl p-4 mb-4">
              <p className="text-gray-400 text-xs leading-relaxed text-center">
                在公众号发送<span className="text-yellow-400 font-bold">手机号后4位</span>后<br />
                即可收到专属验证码，填入下方解锁
              </p>
            </div>

            {/* 验证码输入 */}
            <div className="bg-gray-900 rounded-2xl p-5 mb-4">
              <p className="text-white font-semibold text-sm mb-1">输入验证码</p>
              <p className="text-gray-500 text-xs mb-4">在公众号发送手机后4位后收到的验证码</p>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="例如：MBTI5678"
                maxLength={10}
                className="w-full bg-gray-800 text-white text-center text-xl font-bold tracking-widest rounded-xl px-4 py-4 mb-3 outline-none border border-gray-700 focus:border-violet-500 transition-all"
              />
              {status === 'error' && (
                <p className="text-red-400 text-xs text-center mb-3">{errorMsg}</p>
              )}
              <button
                onClick={handleVerify}
                disabled={status === 'loading' || !code.trim()}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold text-sm transition-all"
              >
                {status === 'loading' ? '验证中...' : '验证并解锁 →'}
              </button>
            </div>

            <button
              onClick={() => setStep('pay')}
              className="w-full py-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-400 font-medium text-sm transition-all"
            >
              ← 返回付款页
            </button>
          </>
        )}
      </div>
    </div>
  );
}