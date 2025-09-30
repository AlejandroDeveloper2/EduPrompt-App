import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Correo electrónico invalido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
