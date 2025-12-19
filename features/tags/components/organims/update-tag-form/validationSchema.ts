import { z } from "zod";

export const updateTagSchema = z.object({
  tagId: z.string().uuid({ message: "UUID invalido" }),
  name: z.string().min(1, { message: "El nombre de la etiqueta es requerido" }),
  type: z.enum(["prompt_tag", "resource_tag"], {
    message: "El tipo de etiqueta es invalido",
  }),
});

export type UpdateTagFormData = z.infer<typeof updateTagSchema>;
