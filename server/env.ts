import dotenv from "dotenv";

dotenv.config();

export const BACKEND_PORT = process.env.BACKEND_PORT ?? "8000";
export const SESSION_SECRET = requireEnv("SESSION_SECRET");
export const DATABASE_URL = requireEnv("DATABASE_URL");
export const HATCHWAYS_BACKEND_URL =
  "https://feature-hatchy-extensions-dot-hatchways-app-staging.appspot.com"; // TODO: Remove hardcoded value

function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined)
    throw new Error(`Missing environment variable ${name}`);

  return value;
}
