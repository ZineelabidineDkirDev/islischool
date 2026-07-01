import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini bio generation
  app.post("/api/gemini/generate-bio", async (req, res) => {
    try {
      const { name, role, skills, keywords, tone } = req.body;
      const ai = getGeminiClient();
      
      const prompt = `You are an expert copywriter specializing in developer portfolios and personal branding websites. 
Write a highly compelling, professional, and unique "About Me" bio for a portfolio website.

Details:
- Name: ${name || "A professional"}
- Role: ${role || "Software Engineer / Designer"}
- Top Skills: ${skills ? skills.join(", ") : "Web Development"}
- Custom Keywords/Interests: ${keywords || "None"}
- Desired Tone: ${tone || "professional yet warm"}

Instructions:
1. Keep the length to about 150-200 words.
2. Structure it as 2 concise, highly readable paragraphs.
3. Make it feel authentic, modern, and engaging. Do NOT use generic buzzwords like "passionate synergist". Focus on practical creativity, dedication, and problem-solving.
4. Output ONLY the bio text, with no preamble, markdown formatting or quotes. Use standard paragraphs.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.8,
        }
      });

      res.json({ bio: response.text?.trim() });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate bio" });
    }
  });

  // API Route for generating course descriptions and school slogans in French
  app.post("/api/gemini/generate-school-content", async (req, res) => {
    try {
      const { type, title, category, level, currentSlogan } = req.body;
      const ai = getGeminiClient();

      let prompt = "";
      if (type === "course") {
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
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      res.json({ content: response.text?.trim() });
    } catch (error: any) {
      console.error("Gemini School API Error:", error);
      res.status(500).json({ error: error.message || "Échec de génération" });
    }
  });

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
