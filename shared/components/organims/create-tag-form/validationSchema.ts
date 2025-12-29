import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().min(1, "El nombre de la etiqueta es obligatorio"),
});

export type CreateTagData = z.infer<typeof createTagSchema>;
