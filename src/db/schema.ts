import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const requests = pgTable("requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  nickname: varchar("nickname", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  contact: varchar("contact", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
