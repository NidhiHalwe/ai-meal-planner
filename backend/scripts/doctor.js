#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function checkFile(filePath) {
  return fs.existsSync(filePath);
}

const checks = [
  { label: 'Node.js', ok: process.versions.node ? true : false },
  { label: 'npm', ok: !!process.env.npm_config_user_agent },
  { label: 'Backend deps', ok: checkFile(path.join(rootDir, 'node_modules')) },
  { label: 'MongoDB config', ok: Boolean(process.env.MONGO_URI) },
  { label: 'JWT config', ok: Boolean(process.env.JWT_SECRET) },
  { label: 'Gemini config', ok: Boolean(process.env.GEMINI_API_KEY) },
  { label: 'Backend package config', ok: checkFile(path.join(rootDir, 'package.json')) },
];

console.log('NutriHub Environment Check\n');
checks.forEach((check) => {
  console.log(`${check.ok ? '✓' : '✗'} ${check.label}`);
});

if (checks.some((check) => !check.ok)) {
  process.exitCode = 1;
}
