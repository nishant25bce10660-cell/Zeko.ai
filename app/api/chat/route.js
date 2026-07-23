import { NextResponse } from 'next/server';

/**
 * Next.js App Router API Route for AI Chat Integration
 * Supports both OpenRouter API and OpenAI API seamlessly.
 * POST /api/chat
 */
export async function POST(req) {
  try {
    const { messages, userMessage, files } = await req.json();

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;
    const apiKey = openRouterKey || openAiKey;

    const isOpenRouter = Boolean(
      openRouterKey || (apiKey && apiKey.startsWith('sk-or-'))
    );

    if (!apiKey) {
      return NextResponse.json({
        role: 'assistant',
        content: `I am connected to the Zeko.ai AI interface! 🤖\n\nTo activate real-time AI responses, please add your API Key to \`.env.local\` in your project root:\n\n\`\`\`env\nOPENROUTER_API_KEY=your_key_here\n\`\`\`\n\nOnce added, restart the server and I'll generate live AI completions for you!`,
        isFallback: true,
      });
    }

    const systemPrompt = {
      role: 'system',
      content:
        'You are Zeko.ai, a cutting-edge, human-centered AI assistant designed to feel natural, intelligent, and deeply empathetic. You can analyze images, text documents, code files, and user requests to provide detailed, accurate, and insightful answers.',
    };

    const formattedMessages = [
      systemPrompt,
      ...(messages || []).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text || '',
      })),
    ];

    if (userMessage || (files && files.length > 0)) {
      let mainText = userMessage || 'Please analyze the attached files/images.';
      const hasMedia = files && files.some((f) => f.type === 'image' || f.type === 'video');

      if (files && files.length > 0) {
        files.forEach((f) => {
          if (f.type === 'text' && f.textContent) {
            mainText += `\n\n📄 **Attached File: ${f.name}**\n\`\`\`\n${f.textContent}\n\`\`\``;
          } else if (f.type === 'other') {
            mainText += `\n\n📎 [Attached file: ${f.name} (${f.size})]`;
          }
        });
      }

      if (hasMedia) {
        const contentBlocks = [{ type: 'text', text: mainText }];

        files.forEach((f) => {
          if ((f.type === 'image' || f.type === 'video') && f.dataUrl) {
            contentBlocks.push({
              type: 'image_url',
              image_url: {
                url: f.dataUrl,
              },
            });
          }
        });

        formattedMessages.push({
          role: 'user',
          content: contentBlocks,
        });
      } else {
        formattedMessages.push({
          role: 'user',
          content: mainText,
        });
      }
    }

    let endpoint = 'https://api.openai.com/v1/chat/completions';
    let defaultModel = 'gpt-4o-mini';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    if (isOpenRouter) {
      endpoint = 'https://openrouter.ai/api/v1/chat/completions';
      defaultModel = 'openai/gpt-4o-mini';
      headers['HTTP-Referer'] = 'https://zeko-ai-eight.vercel.app/';
      headers['X-Title'] = 'Zeko.ai';
    }

    const selectedModel =
      process.env.OPENROUTER_MODEL || process.env.OPENAI_MODEL || defaultModel;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: selectedModel,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('AI API Error:', errorData);
      return NextResponse.json(
        {
          role: 'assistant',
          content: `⚠️ API Error (${response.status}): ${errorData?.error?.message || response.statusText}.`,
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantReply =
      data.choices?.[0]?.message?.content ||
      'I processed your request, but received an empty response.';

    return NextResponse.json({
      role: 'assistant',
      content: assistantReply,
    });
  } catch (error) {
    console.error('Chat API Route Error:', error);
    return NextResponse.json(
      {
        role: 'assistant',
        content: `⚠️ An error occurred while processing the request: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
