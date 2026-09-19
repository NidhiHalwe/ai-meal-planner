#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const backendDir = path.join(rootDir, 'backend');

const packageJsonExists = fs.existsSync(path.join(rootDir, 'package.json'));
const backendPackageExists = fs.existsSync(path.join(backendDir, 'package.json'));
const frontendPackageExists = fs.existsSync(path.join(rootDir, 'frontend', 'frontend', 'package.json'));
const nodeModulesExist = fs.existsSync(path.join(rootDir, 'node_modules')) || fs.existsSync(path.join(backendDir, 'node_modules'));

const checks = [
  { label: 'Node.js', ok: !!process.versions.node },
  { label: 'npm', ok: !!process.env.npm_config_user_agent },
  { label: 'Project root package', ok: packageJsonExists },
  { label: 'Backend package', ok: backendPackageExists },
  { label: 'Frontend package', ok: frontendPackageExists },
  { label: 'Dependencies installed', ok: nodeModulesExist },
  { label: 'MongoDB configuration', ok: Boolean(process.env.MONGO_URI) },
  { label: 'JWT configuration', ok: Boolean(process.env.JWT_SECRET) },
  { label: 'Gemini configuration', ok: Boolean(process.env.GEMINI_API_KEY) },
];

console.log('NutriHub Environment Check\n');
checks.forEach((check) => {
  console.log(`${check.ok ? '✓' : '✗'} ${check.label}`);
});

if (checks.some((check) => !check.ok)) {
  process.exitCode = 1;
}
