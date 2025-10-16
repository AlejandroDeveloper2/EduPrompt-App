import { z } from "zod";

export const accountActivationRequestSchema = z.object({
  email: z.string().email({ message: "Correo electrónico invalido" }),
});

export type AccountActivationRequestData = z.infer<
  typeof accountActivationRequestSchema
>;
