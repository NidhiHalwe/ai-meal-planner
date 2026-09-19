import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Missing GEMINI_API_KEY. Add it to backend/.env before running Gemini tests.');
  process.exit(1);
}

const client = new GoogleGenAI({ apiKey });

try {
  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: 'Say hello' }] }],
    generationConfig: { responseMimeType: 'application/json' },
  });

  console.log('Response text:', response.text);
} catch (error) {
  console.error('Gemini request failed:', error.message);
}
