import { z } from "zod";

export const accountActivationSchema = z.object({
  code: z
    .string()
    .min(4, {
      message: "El código de verificación debe tener al menos 4 caracteres",
    })
    .max(4, {
      message: "El código de verificación debe tener como máximo 4 caracteres",
    }),
});

export type AccountActivationData = z.infer<typeof accountActivationSchema>;
