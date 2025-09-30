import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().regex(passwordRegex, {
      message:
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "La confirmación de contraseña es requerida" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
