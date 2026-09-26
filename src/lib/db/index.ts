import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  __db?: NeonHttpDatabase<typeof schema>;
};

/**
 * Cliente Neon (HTTP) + Drizzle.
 * Edge-friendly, ideal para Vercel Functions.
 * Retorna `null` se DATABASE_URL não estiver configurada (ex.: build sem env).
 */
export function getDb(): NeonHttpDatabase<typeof schema> | null {
  if (globalForDb.__db) return globalForDb.__db;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const sql = neon(url);
  const db = drizzle(sql, { schema });
  if (process.env.NODE_ENV !== "production") globalForDb.__db = db;
  return db;
}

export { schema };
