import { z } from "zod";

export const editFolderSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre de la carpeta es obligatorio" }),
});

export type FolderNameFormData = z.infer<typeof editFolderSchema>;
