import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const comparisons = pgTable("comparisons", {
  id: serial("id").primaryKey(),
  deviceA: text("device_a").notNull(),
  deviceB: text("device_b").notNull(),
  imageA: text("image_a").notNull(),
  imageB: text("image_b").notNull(),
  votesA: integer("votes_a").notNull().default(0),
  votesB: integer("votes_b").notNull().default(0),
  active: boolean("active").notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertComparisonSchema = createInsertSchema(comparisons).pick({
  deviceA: true,
  deviceB: true,
  imageA: true,
  imageB: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Comparison = typeof comparisons.$inferSelect;
export type InsertComparison = z.infer<typeof insertComparisonSchema>;
