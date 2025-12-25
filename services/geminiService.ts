
import { GoogleGenAI } from "@google/genai";

// Fonction magique pour invoquer l'esprit de Noël visuel via l'IA
export async function generateFestiveBackground(): Promise<string | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    
    // Le "sortilège" (prompt) pour générer une ambiance chaleureuse et technologique
    const prompt = `A high-quality, ultra-detailed 3D digital art of a cozy, magical programmer's desk during Christmas night. A laptop screen glows with golden code syntax highlighting that transforms into floating festive snowflakes and golden sparkles. On the desk, there is a warm mug of cocoa, glowing string lights, and small wrapped gifts. In the background, a beautifully blurred Christmas tree with red and gold ornaments. Cinematic lighting, warm atmosphere, whimsical fairy-tale style, 4k.`;
    
    // Invocation du modèle Gemini Flash Image
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9" // Format cinématographique
        }
      }
    });

    // Extraction de la poussière d'étoiles (données de l'image)
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Le sortilège de génération d'image a échoué:", error);
    return null;
  }
}
