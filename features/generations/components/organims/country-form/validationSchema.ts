import { z } from "zod";

export const countryFormSchema = z.object({
  country: z.string().min(1, "EL país es obligatorio"),
});

export type CountryFormData = z.infer<typeof countryFormSchema>;
