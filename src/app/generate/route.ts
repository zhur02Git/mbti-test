import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { mbti } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite-preview-06-17' });

    const prompt = `你是一个MBTI人格分析专家，请用简短有趣的中文（60字以内）描述${mbti}人格类型的人，
    风格要像朋友之间的吐槽，幽默但温暖，说出这类人最典型的一个特点或者内心独白。
    直接输出描述文字，不要加任何前缀或引号。`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { text: '你是独一无二的存在，无论是哪种类型，都有属于自己的光芒。' },
      { status: 200 }
    );
  }
}