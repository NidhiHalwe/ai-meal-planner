import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_MODEL = "gemini-2.5-flash";
function getAiClient() {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'REPLACE_WITH_YOUR_GEMINI_API_KEY') return null;
    return new GoogleGenAI({ apiKey: key });
}

async function run() {
    try {
        const input = "Generate a 2-day meal plan for Vegetarian diet with a focus on Weight Loss.";
        if (!input) {
            throw new Error('Input missing');
        }
        const prompt = `
            Based on the user's request: "${input}", generate two detailed, distinct recipe objects.
            
            The output MUST be a single JSON object. 
            This object MUST contain one key: 'recipes'. 
            The value of 'recipes' must be an array of exactly two JSON objects (one recipe for each day).

            Each recipe JSON object MUST use the following EXACT keys for the response:
            "Recipe Name"
            "Dish Type" (e.g., Main, Snack, Dessert)
            "Preparation Time" (e.g., 15 minutes)
            "Difficulty" (e.g., Easy, Medium, Hard)
            "Ingredients" (List all ingredients and quantities clearly in a single string)
            "Step-by-step Instructions" (List instructions clearly, numbered 1. 2. 3. etc., in a single string)
            "Chef's Tip"
            "TOTAL CALORIES" (Estimate in kcal, e.g., 450 kcal)
        `;

        const aiClient = getAiClient();
        if (!aiClient) {
            throw new Error('No AI client');
        }

        console.log('Calling AI client...');
        const response = await aiClient.models.generateContent({
            model: GEMINI_MODEL,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
            },
        });
        console.log('AI response', response);
    } catch (e) {
        console.error('Error in simulation', e);
    }
}

run();