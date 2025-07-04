import dotenv from "dotenv";
import path from "node:path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

type EnvironmentConfig = {
  // Server Configuration
  NODE_ENV: "development" | "production" | "test";
  PORT: number;

  // Database Configuration
  DATABASE_URL: string;

  // JWT Configuration
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;

  // CORS Configuration
  CORS_ORIGIN: string;

  // Logging
  LOG_LEVEL: "error" | "warn" | "info" | "debug";

  // API Configuration
  API_PREFIX: string;

  // Security
  BCRYPT_ROUNDS: number;
};

/**
 * Get an environment variable
 *
 * @param key - The key of the environment variable
 * @param defaultValue - The default value if the environment variable is not set
 * @returns The value of the environment variable
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value || defaultValue!;
}

/**
 * Get an environment variable as a number
 *
 * @param key - The key of the environment variable
 * @param defaultValue - The default value if the environment variable is not set
 * @returns The value of the environment variable
 */
function getEnvVarAsNumber(key: string, defaultValue?: number): number {
  const value = getEnvVar(key, defaultValue?.toString());
  const num = Number.parseInt(value, 10);
  if (Number.isNaN(num)) {
    throw new TypeError(`Environment variable ${key} must be a valid number`);
  }
  return num;
}

/**
 * Get an environment variable as an enum
 *
 * @param key - The key of the environment variable
 * @param allowedValues - The allowed values for the environment variable
 * @param defaultValue - The default value if the environment variable is not set
 * @returns The value of the environment variable
 */
function getEnvVarAsEnum<T extends string>(
  key: string,
  allowedValues: readonly T[],
  defaultValue?: T,
): T {
  const value = getEnvVar(key, defaultValue);
  if (!allowedValues.includes(value as T)) {
    throw new Error(
      `Environment variable ${key} must be one of: ${allowedValues.join(", ")}`,
    );
  }
  return value as T;
}

export const env: EnvironmentConfig = {
  // Server Configuration
  NODE_ENV: getEnvVarAsEnum("NODE_ENV", ["development", "production", "test"], "development"),
  PORT: getEnvVarAsNumber("PORT", 3000),

  // Database Configuration
  DATABASE_URL: getEnvVar("DATABASE_URL", "postgresql://username:password@localhost:5432/database_name"),

  // JWT Configuration
  JWT_SECRET: getEnvVar("JWT_SECRET", "your-super-secret-jwt-key-change-this-in-production"),
  JWT_EXPIRES_IN: getEnvVar("JWT_EXPIRES_IN", "7d"),
  JWT_REFRESH_SECRET: getEnvVar("JWT_REFRESH_SECRET", "your-super-secret-refresh-key-change-this-in-production"),
  JWT_REFRESH_EXPIRES_IN: getEnvVar("JWT_REFRESH_EXPIRES_IN", "30d"),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: getEnvVarAsNumber("RATE_LIMIT_WINDOW_MS", 900000),
  RATE_LIMIT_MAX_REQUESTS: getEnvVarAsNumber("RATE_LIMIT_MAX_REQUESTS", 100),

  // CORS Configuration
  CORS_ORIGIN: getEnvVar("CORS_ORIGIN", "http://localhost:3000"),

  // Logging
  LOG_LEVEL: getEnvVarAsEnum("LOG_LEVEL", ["error", "warn", "info", "debug"], "info"),

  // API Configuration
  API_PREFIX: getEnvVar("API_PREFIX", "/api/v1"),

  // Security
  BCRYPT_ROUNDS: getEnvVarAsNumber("BCRYPT_ROUNDS", 12),
};

export function validateEnv(): void {
  const requiredVars = [
    "DATABASE_URL",
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      console.warn(`Warning: ${varName} is not set, using default value`);
    }
  }
}

export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";
