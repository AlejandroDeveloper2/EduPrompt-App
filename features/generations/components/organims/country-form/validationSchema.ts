import { z } from "zod";

import { i18n } from "@/core/store";

export const countryFormSchema = z.object({
  country: z
    .string()
    .min(
      1,
      i18n.t(
        "generations-translations.country-template.form-error-messages.required-country-msg"
      )
    ),
});

export type CountryFormData = z.infer<typeof countryFormSchema>;
