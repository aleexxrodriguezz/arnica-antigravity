import { AGENT_CONFIG } from '@/lib/agent/config';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AGENT_CONFIG.model,
        messages: [
          { role: 'system', content: AGENT_CONFIG.systemPrompt },
          ...messages,
        ],
        temperature: AGENT_CONFIG.temperature,
        max_tokens: AGENT_CONFIG.max_tokens,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error from Groq API');
    }

    return NextResponse.json({
      role: 'assistant',
      content: data.choices[0].message.content,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
