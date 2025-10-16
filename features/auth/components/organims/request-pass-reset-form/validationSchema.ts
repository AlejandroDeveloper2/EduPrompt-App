import { z } from "zod";

export const requestPassResetSchema = z.object({
  email: z.string().email({ message: "Correo electrónico invalido" }),
});

export type RequestPassResetData = z.infer<typeof requestPassResetSchema>;
