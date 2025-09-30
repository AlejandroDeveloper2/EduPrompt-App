import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const signupSchema = z
  .object({
    username: z.string().min(3, {
      message: "El nombre de usuario debe tener almenos 3 caracteres ",
    }),
    email: z.string().email({ message: "Correo electrónico invalido" }),
    password: z.string().regex(passwordRegex, {
      message:
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "La confirmación de contraseña es requerida" }),
    termsAndPolicies: z
      .boolean()
      .refine((val) => val === true, {
        message: "Debes aceptar los términos y políticas",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type SignupData = z.infer<typeof signupSchema>;
