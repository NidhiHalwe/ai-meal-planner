import express from 'express';
import { GoogleGenAI } from '@google/genai';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

import authRoutes from './routes/auth.js';
import mealRoutes from './routes/meal.js';
import foodRoutes from './routes/food.js';
import aiRoutes from './routes/ai.js';
import recipesRoutes from './routes/recipes.js';
import { sendErrorResponse } from './utils/errorHandler.js';

const logFile = 'debug.log';
function log(...args) {
  const line = `[${new Date().toISOString()}] ${args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ')}\n`;
  try {
    fs.appendFileSync(logFile, line);
  } catch {
    // ignore file logging issues
  }
  console.log(...args);
}

process.on('unhandledRejection', (reason) => log('UNHANDLED_REJECTION:', reason));
process.on('uncaughtException', (error) => log('UNCAUGHT_EXCEPTION:', error));

dotenv.config();

function validateRuntimeEnvironment() {
  const missing = [];
  if (!process.env.JWT_SECRET || !String(process.env.JWT_SECRET).trim()) missing.push('JWT_SECRET');
  if (!process.env.MONGO_URI || !String(process.env.MONGO_URI).trim()) {
    console.warn('MongoDB configuration missing. The server will run in degraded mode until a valid MONGO_URI is set.');
  }
  if (!process.env.GEMINI_API_KEY || !String(process.env.GEMINI_API_KEY).trim()) {
    console.warn('GEMINI_API_KEY is missing. AI features will fall back gracefully.');
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variable${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`);
  }
}

const GEMINI_MODEL = 'gemini-2.5-flash';

function getAiClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'REPLACE_WITH_YOUR_GEMINI_API_KEY') return null;
  return new GoogleGenAI({ apiKey: key });
}

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  log('REQUEST', req.method, req.url, JSON.stringify(req.body || {}));
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/recipes', recipesRoutes);

app.post('/generate-meal', async (req, res) => {
  try {
    const { input } = req.body || {};
    if (!input || !String(input).trim()) {
      return sendErrorResponse(res, 400, 'VALIDATION_ERROR', 'Input is required for the meal planner.');
    }

    const prompt = `Based on the user's request: "${String(input).trim()}", generate two detailed, distinct recipe objects. The output MUST be a single JSON object with a top-level 'recipes' array containing exactly two recipe objects, each with the exact keys: "Recipe Name", "Dish Type", "Preparation Time", "Difficulty", "Ingredients", "Step-by-step Instructions", "Chef's Tip", and "TOTAL CALORIES".`;

    const aiClient = getAiClient();
    if (!aiClient) {
      return sendErrorResponse(res, 500, 'GEMINI_CONFIGURATION_ERROR', 'Server misconfiguration: GEMINI_API_KEY not set.');
    }

    const response = await aiClient.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    return res.json({ success: true, mealPlan: response.text });
  } catch (error) {
    log('Gemini API Error:', error?.message || error);
    const statusCode = error?.status || error?.code || 500;
    const message = statusCode === 403 ? 'AI API key invalid or blocked. Update GEMINI_API_KEY.' : 'Failed to generate structured meal plan.';
    return sendErrorResponse(res, 500, 'AI_REQUEST_FAILED', message, error?.message || 'Unknown error');
  }
});

app.use((req, res) => {
  sendErrorResponse(res, 404, 'NOT_FOUND', 'Route not found.');
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const statusCode = error?.status || error?.code || 500;
  const code = error?.code || 'INTERNAL_SERVER_ERROR';
  const message = error?.message || 'Unexpected server error';
  return sendErrorResponse(res, statusCode, code, message, process.env.NODE_ENV === 'production' ? undefined : error?.stack);
});

const PORT = Number(process.env.PORT || 5000);

function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the existing process or start the backend with another port, for example PORT=5001 npm run dev.`);
    } else {
      console.error(`Unable to start server on port ${PORT}: ${error.message}`);
    }

    mongoose.disconnect()
      .catch(() => undefined)
      .finally(() => process.exit(1));
  });

  return server;
}

try {
  validateRuntimeEnvironment();
  console.log('Environment validation passed.');
} catch (error) {
  console.error(error.message);
}

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      startServer();
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      console.warn('Starting server without MongoDB connection. Some features may be disabled.');
      startServer();
    });
} else {
  console.warn('MONGO_URI not set — starting server without MongoDB.');
  startServer();
}
