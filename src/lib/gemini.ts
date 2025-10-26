import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI API KEY is not defined in .env');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generatePaletteFromDescription(
  description: string,
  colorCount: number = 5
): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `Eres un experto en teoría del color y diseño. Genera exactamente ${colorCount} colores en formato hexadecimal (#RRGGBB) que representen perfectamente la descripción: "${description}".

Reglas estrictas:
- Devuelve SOLO los códigos hexadecimales separados por comas
- No incluyas explicaciones, solo los colores
- Ejemplo de formato: #FF5733,#33FF57,#5733FF,#F3FF33,#33F3FF
- Los colores deben ser armónicos y profesionales
- Considera contraste, saturación y luminosidad adecuadas`;

  const result = await model.generateContent(prompt);
  const response = result.response.text().trim();
  
  // Extraer solo los códigos hexadecimales
  const hexPattern = /#[0-9A-Fa-f]{6}/g;
  const colors = response.match(hexPattern) || [];
  
  return colors.slice(0, colorCount);
}

export async function evaluatePalette(colors: string[]): Promise<{
  score: number;
  contrast: number;
  harmony: number;
  accessibility: number;
  balance: number;
  feedback: string;
}> {
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `Eres un experto en teoría del color, diseño y accesibilidad web. Evalúa esta paleta de colores: ${colors.join(', ')}.

Proporciona una evaluación en el siguiente formato JSON estricto:
{
  "score": [número del 0 al 100],
  "contrast": [número del 0 al 100],
  "harmony": [número del 0 al 100],
  "accessibility": [número del 0 al 100],
  "balance": [número del 0 al 100],
  "feedback": "[2-3 frases concisas sobre fortalezas y sugerencias de mejora]"
}

Criterios:
- Contrast: Analiza el contraste entre colores (WCAG AA/AAA)
- Harmony: Evalúa las relaciones armónicas (complementarios, análogos, triádicos)
- Accessibility: Verifica legibilidad para personas con daltonismo
- Balance: Analiza distribución de saturación, luminosidad y temperatura
- Feedback: Conciso, profesional y accionable

Devuelve SOLO el objeto JSON, sin markdown ni explicaciones adicionales.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text().trim();
  
  // Limpiar markdown si existe
  const jsonText = response.replace(/``````\n?/g, '').trim();
  
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    return {
      score: 50,
      contrast: 50,
      harmony: 50,
      accessibility: 50,
      balance: 50,
      feedback: 'Error al evaluar la paleta. Intenta de nuevo.',
    };
  }
}

export async function improvePalette(colors: string[]): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `Eres un experto en teoría del color. Mejora sutilmente esta paleta de colores: ${colors.join(', ')}.

Reglas:
- Mantén la esencia de cada color (no cambies radicalmente)
- Ajusta solo tono, saturación y luminosidad para mejorar armonía y contraste
- Devuelve exactamente ${colors.length} colores en formato: #RRGGBB,#RRGGBB,...
- NO incluyas explicaciones, SOLO los códigos hexadecimales separados por comas`;

  const result = await model.generateContent(prompt);
  const response = result.response.text().trim();
  
  const hexPattern = /#[0-9A-Fa-f]{6}/g;
  const improvedColors = response.match(hexPattern) || colors;
  
  return improvedColors.slice(0, colors.length);
}
