import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const updateUsernameSchema = z.object({
  userName: z.string().min(3, {
    message: "El nombre de usuario debe tener almenos 3 caracteres",
  }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "La contraseña actual es requerida" }),
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

export const updateEmailRequestSchema = z.object({
  currentEmail: z
    .string()
    .email({ message: "El correo ingresado no es valido" }),
  updatedEmail: z
    .string()
    .email({ message: "El correo ingresado no es valido" }),
});

export const updateEmailVerificationCodeSchema = z.object({
  code: z
    .string()
    .min(4, {
      message: "El código de verificación debe tener al menos 4 caracteres",
    })
    .max(4, {
      message: "El código de verificación debe tener como máximo 4 caracteres",
    }),
});

export type UpdateUsernameData = z.infer<typeof updateUsernameSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type UpdateEmailRequestData = z.infer<typeof updateEmailRequestSchema>;
export type UpdateEmailVerificationCodeData = z.infer<
  typeof updateEmailVerificationCodeSchema
>;
