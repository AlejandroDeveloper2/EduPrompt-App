import { z } from "zod";

export const createResourceSchema = z.object({
  title: z.string().min(1, "El titulo del recurso es obligatorio"),
  groupTag: z.string().min(1, "La etiqueta del recurso es obligatoria"),
});

export type CreateResourceFormData = z.infer<typeof createResourceSchema>;
