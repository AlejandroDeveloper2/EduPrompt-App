import { z } from "zod";

export const resourceFormatFormSchema = z.object({
  formatKey: z.enum(["text", "image", "chart", "table"], {
    message: "El formato seleccionado es invalido",
  }),
});

export type ResourceFormatFormData = z.infer<typeof resourceFormatFormSchema>;
