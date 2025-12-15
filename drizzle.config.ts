import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./core/config/db/schema.ts",
  out: "./core/config/db/migrations",
  dialect: "sqlite",
  driver: "expo",
});
