import { z } from "zod";

export const updateResourceSchema = z.object({
  resourceId: z.string().uuid("El ID del recurso no es valido"),
  title: z.string().min(1, "El titulo del recurso es obligatorio"),
  groupTag: z.string().min(1, "La etiqueta del recurso es obligatoria"),
});

export type UpdateResourceFormData = z.infer<typeof updateResourceSchema>;
