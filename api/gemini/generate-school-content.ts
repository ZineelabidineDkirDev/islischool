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
    const { type, title, category, level, currentSlogan } = req.body || {};
    const ai = getGeminiClient();

    let prompt = '';
    if (type === 'course') {
      prompt = `En tant qu'expert en pédagogie et rédacteur pour des écoles de langues, rédigez une description captivante et professionnelle pour le cours suivant en français.
Titre du cours : ${title}
Catégorie : ${category}
Niveau ciblé : ${level}

Consignes :
1. Rédigez un paragraphe court (environ 60-80 mots) en français.
2. Expliquez l'intérêt pratique du cours, la méthode interactive et ce que l'élève va accomplir.
3. Le style doit être encourageant, professionnel et chaleureux.
4. Renvoyez UNIQUEMENT la description brute, sans aucun texte d'accompagnement, introduction ou guillemets.`;
    } else {
      prompt = `Générez 3 slogans accrocheurs, modernes et élégants en français pour une école de langues et soutien scolaire appelée "${title || 'École Isli'}".
Slogan actuel pour inspiration : "${currentSlogan || 'Un excellent endroit pour votre éducation'}"

Consignes :
1. Renvoyez uniquement les 3 slogans séparés par une virgule. Exemple : Slogan 1, Slogan 2, Slogan 3.
2. Le ton doit être inspirant, axé sur l'excellence académique, le plaisir d'apprendre et l'avenir.
3. Ne mettez aucun numéro de ligne, pas de tirets ni de guillemets autour du résultat global.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: { temperature: 0.7 },
    });

    return res.json({ content: response.text?.trim() });
  } catch (error: any) {
    console.error('Gemini School API Error:', error);
    return res.status(500).json({ error: error.message || 'Échec de génération' });
  }
}
