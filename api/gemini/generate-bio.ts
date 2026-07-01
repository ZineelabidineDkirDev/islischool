import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }

    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  return aiClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, role, skills, keywords, tone } = req.body || {};
    const ai = getGeminiClient();

    const prompt = `You are an expert copywriter specializing in developer portfolios and personal branding websites.
Write a highly compelling, professional, and unique "About Me" bio for a portfolio website.

Details:
- Name: ${name || 'A professional'}
- Role: ${role || 'Software Engineer / Designer'}
- Top Skills: ${skills ? skills.join(', ') : 'Web Development'}
- Custom Keywords/Interests: ${keywords || 'None'}
- Desired Tone: ${tone || 'professional yet warm'}

Instructions:
1. Keep the length to about 150-200 words.
2. Structure it as 2 concise, highly readable paragraphs.
3. Make it feel authentic, modern, and engaging. Do NOT use generic buzzwords like "passionate synergist". Focus on practical creativity, dedication, and problem-solving.
4. Output ONLY the bio text, with no preamble, markdown formatting or quotes. Use standard paragraphs.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: { temperature: 0.8 },
    });

    return res.json({ bio: response.text?.trim() });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate bio' });
  }
}
