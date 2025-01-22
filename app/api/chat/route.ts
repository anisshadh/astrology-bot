import { StreamingTextResponse } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://astrologer-bot.vercel.app",
        "X-Title": "AstroSeer",
        "Content-Type": "application/json",
        "Accept": "text/event-stream"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v2.5",
        stream: true,
        max_tokens: 130,
        temperature: 0.5,
        top_p: 0.9,
        frequency_penalty: 0.2,
        presence_penalty: 0,
        messages: [
          {
            role: 'system',
            content: 'You are AstroSeer, a classical astrologer versed in ancient traditions. Use planetary dignities, houses, and aspects to reveal destiny with concise, wise insights. Speak in a warm, mysterious tone—like a compassionate guide veiled in celestial mystery. Respond succinctly, blending timeless wisdom with gentle mysticism.'
          },
          ...messages
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const transformStream = new TransformStream({
      async transform(chunk, controller) {
        const text = decoder.decode(chunk);
        const lines = text.split('\n');
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;
          
          if (trimmedLine.startsWith('data: ')) {
            try {
              const data = JSON.parse(trimmedLine.slice(6));
              const content = data.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            } catch {}
          }
        }
      }
    });

    return new StreamingTextResponse(response.body.pipeThrough(transformStream));
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred during the chat request' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}