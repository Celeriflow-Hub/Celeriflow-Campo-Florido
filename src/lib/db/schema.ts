import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Tabela de exemplo — apague/substitua quando colar sua base pronta.
 * Migration: `npm run db:generate && npm run db:migrate`
 */
export const healthChecks = pgTable("health_checks", {
  id: serial("id").primaryKey(),
  message: text("message").notNull().default("ok"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type HealthCheck = typeof healthChecks.$inferSelect;
export type NewHealthCheck = typeof healthChecks.$inferInsert;
