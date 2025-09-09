import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Loads environment variables from a `.env` file into `process.env`.
 * Automatically preserves existing `process.env` values and returns
 * all variables as an object.
 *
 * @param path - The directory where the `.env` file is located. Defaults to the current directory.
 * @returns An object containing all key-value pairs from the `.env` file.
 *
 * @example
 * import { lenv } from 'lenv';
 *
 * // Load .env from current directory
 * const envVars = lenv();
 *
 * // Load .env from a custom path
 * const envVarsCustom = lenv('/custom/path');
 *
 * console.log(process.env.MY_VAR);
 */
export const lenv = (path = '.') => {
  const envPath = resolve(path, '.env');

  try {
    const content = readFileSync(envPath, 'utf-8');
    const envVars: Record<string, string> = {};

    content.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) return;

      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();

      // Remove surrounding quotes while preserving escaped characters
      let processedValue = value;
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        processedValue = value.slice(1, -1);
      }

      if (key) {
        envVars[key] = processedValue;
        process.env[key] ??= processedValue;
      }
    });

    return envVars;
  } catch {
    // Silently ignore if .env doesn't exist
    return {};
  }
};
