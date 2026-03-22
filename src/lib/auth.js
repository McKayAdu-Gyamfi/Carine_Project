import { betterAuth } from "better-auth";
import { Pool } from "pg";
import "dotenv/config";

export const dialect = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: dialect,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: { enabled: true },
});
