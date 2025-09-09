#!/usr/bin/env node
/* eslint-disable no-console */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const envPath = resolve(process.cwd(), '.env');

try {
  const content = readFileSync(envPath, 'utf-8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) return;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    // Remove surrounding quotes while preserving escaped characters
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Escape single quotes for shell
    const escapedValue = value.replace(/'/g, "'\\''");

    if (key) console.log(`export ${key}='${escapedValue}'`);
  });
} catch {
  // Exit silently if .env doesn't exist
  process.exit(0);
}
