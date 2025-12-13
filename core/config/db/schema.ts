import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tagsTable = sqliteTable("tags", {
  tagId: text().primaryKey(),
  name: text().notNull(),
  type: text().notNull(),
  sync: text().default("false").notNull(),
});
