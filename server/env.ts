import dotenv from "dotenv";

dotenv.config();

export const PORT = requireEnv("PORT");
export const SESSION_SECRET = requireEnv("SESSION_SECRET");
export const DATABASE_URL = requireEnv("DATABASE_URL");

function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined)
    throw new Error(`Missing environment variable ${name}`);

  return value;
}
