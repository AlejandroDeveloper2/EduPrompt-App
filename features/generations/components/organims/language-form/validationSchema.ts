import { z } from "zod";

export const languageFormSchema = z.object({
  language: z.enum(["es", "en", "pt"], {
    message: "El idioma seleccionado es invalido",
  }),
});

export type LanguageFormData = z.infer<typeof languageFormSchema>;
