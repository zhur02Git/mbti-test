import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { email, mbti, reportHtml } = await req.json();

    if (!email || !mbti || !reportHtml) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"MBTI人格测试" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `你的 ${mbti} 人格专业报告 ✨`,
      html: reportHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('邮件发送失败:', err);
    return NextResponse.json({ error: '发送失败，请重试' }, { status: 500 });
  }
}