import { z } from "zod";

export const updatePromptSchema = z.object({
  promptId: z.string().uuid("El ID del prompt no es valido"),
  promptTitle: z.string().min(1, "El titulo del prompt es obligatorio"),
  promptText: z.string().min(1, "El contenido del prompt es obligatorio"),
  tag: z.string().uuid("La etiqueta seleccionada no es valida"),
});

export type UpdatePromptFormData = z.infer<typeof updatePromptSchema>;
