import { AGENT_CONFIG } from '@/lib/agent/config';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      console.error('MISSING GROQ_API_KEY in process.env');
    }
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('MISSING OPENROUTER_API_KEY in process.env');
    }

    // 1. Try Groq first
    try {
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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

      if (groqResponse.ok) {
        const data = await groqResponse.json();
        return NextResponse.json({
          role: 'assistant',
          content: data.choices[0].message.content,
          provider: 'groq'
        });
      }
      
      console.warn('Groq API failed, attempting OpenRouter fallback...');
    } catch (e) {
      console.error('Groq Error:', e);
    }

    // 2. Fallback to OpenRouter
    const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://arnica.agency', // Optional for OpenRouter
        'X-Title': 'Arnica Antigravity', // Optional for OpenRouter
      },
      body: JSON.stringify({
        model: AGENT_CONFIG.fallbackModel,
        messages: [
          { role: 'system', content: AGENT_CONFIG.systemPrompt },
          ...messages,
        ],
        temperature: AGENT_CONFIG.temperature,
        max_tokens: AGENT_CONFIG.max_tokens,
      }),
    });

    const data = await openRouterResponse.json();

    if (!openRouterResponse.ok) {
      throw new Error(data.error?.message || 'Both API providers failed');
    }

    return NextResponse.json({
      role: 'assistant',
      content: data.choices[0].message.content,
      provider: 'openrouter'
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
