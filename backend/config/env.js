import fs from 'fs';
import path from 'path';

const requiredRuntimeVariables = ['JWT_SECRET', 'MONGO_URI'];
const optionalVariables = ['GEMINI_API_KEY'];

export function loadEnvironmentConfig() {
  const missing = [];
  const warnings = [];

  for (const key of requiredRuntimeVariables) {
    if (!process.env[key] || process.env[key].trim() === '') {
      missing.push(key);
    }
  }

  for (const key of optionalVariables) {
    if (!process.env[key] || process.env[key].trim() === '') {
      warnings.push(`${key} is not configured; AI endpoints will continue without Gemini.`);
    }
  }

  const config = {
    port: Number(process.env.PORT || 5000),
    mongoUri: process.env.MONGO_URI || '',
    jwtSecret: process.env.JWT_SECRET || '',
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    missing,
    warnings,
  };

  return config;
}

export function assertRequiredEnvironment() {
  const { missing, warnings } = loadEnvironmentConfig();

  if (missing.length > 0) {
    const message = `Missing required environment variable${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`;
    throw new Error(message);
  }

  return { warnings };
}

export function getEnvironmentSummary() {
  const config = loadEnvironmentConfig();
  return {
    ...config,
    isGeminiConfigured: Boolean(config.geminiApiKey),
    hasMongoConfig: Boolean(config.mongoUri),
    hasJwtConfig: Boolean(config.jwtSecret),
  };
}
