import { GoogleGenAI } from "@google/genai";
import { CLIMATE_DATA, QUESTIONS } from "../constants";

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
       console.warn("API Key is missing. Gemini features may not work.");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const getExpertAnalysis = async (userAnswers: Record<number, string>, score: number) => {
  try {
    const ai = getClient();
    
    // Construct a prompt suitable for 5th graders
    const prompt = `
      Actúa como el "Capitán Eco", un guía de aventuras divertido y motivador para niños de 10 u 11 años (5º de Primaria) en el mundo de "Bioterra".
      
      Datos analizados:
      ${JSON.stringify(CLIMATE_DATA)}

      El niño/a ha realizado una misión (test).
      Puntuación: ${score} de ${QUESTIONS.length}.
      
      Respuestas del niño (ID Pregunta: Respuesta Elegida):
      ${JSON.stringify(userAnswers)}

      Genera un mensaje corto (máximo 100 palabras) para el "Detective Junior".
      1. Felicítalo con entusiasmo por completar la misión.
      2. Explica de forma muy sencilla (usando analogías como "manta", "aire acondicionado", "escudo") por qué cortar árboles da calor.
      3. Dale un consejo final divertido para cuidar el planeta (ej: plantar una semilla, reciclar).
      
      Usa emojis y un tono muy amigable. ¡Tú puedes!
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching Gemini analysis:", error);
    return "¡Oh no! El comunicador del Capitán Eco tiene interferencias. Pero has hecho un gran trabajo analizando los datos.";
  }
};

export const askExpertHelper = async (query: string) => {
    try {
        const ai = getClient();
        const prompt = `
          Eres un profesor de primaria divertido y paciente enseñando a niños de 10 años.
          Están mirando gráficos de "Bioterra":
          - Gráfico Verde: Árboles (cada vez hay menos).
          - Gráfico Rojo: Calor/Temperatura (cada vez hace más calor).
          
          El niño pregunta: "${query}"
          
          Responde en máximo 40 palabras. Usa lenguaje sencillo. No les des la respuesta del examen (a, b, c), solo dales una pista para que ellos lo adivinen mirando el dibujo.
          Usa analogías simples.
        `;
    
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });
    
        return response.text;
      } catch (error) {
        console.error("Error asking expert:", error);
        return "Bzzzt... interferencia. Intenta mirar si la línea sube o baja.";
      }
}