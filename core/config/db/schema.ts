import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tagsTable = sqliteTable("tags", {
  tagId: text().primaryKey(),
  name: text().notNull(),
  type: text().notNull(),
  sync: text().default("false").notNull(),
});

export const promptsTable = sqliteTable("prompts", {
  promptId: text().primaryKey(),
  promptTitle: text().notNull(),
  promptText: text().notNull(),
  tag: text().notNull(),
  sync: text().default("false").notNull(),
});

export const resourcesTable = sqliteTable("resources", {
  resourceId: text().primaryKey(),
  title: text().notNull(),
  content: text().notNull(),
  format: text().notNull(),
  formatKey: text().notNull(),
  groupTag: text().notNull(),
  creationDate: text().default(Date.now().toString()).notNull(),
  sync: text().default("false").notNull(),
});
