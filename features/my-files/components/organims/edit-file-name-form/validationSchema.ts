import { z } from "zod";

export const editFileSchema = z.object({
  name: z.string().min(1, { message: "El nombre del archivo es obligatorio" }),
});

export type FileNameFormData = z.infer<typeof editFileSchema>;
