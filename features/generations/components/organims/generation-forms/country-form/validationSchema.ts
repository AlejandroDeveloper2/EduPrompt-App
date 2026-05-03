import { z } from "zod";

import { i18n } from "@/core/store";

export const countryFormSchema = z.object({
  country: z
    .string()
    .min(
      1,
      i18n.t(
        "generations_translations.country_template.form_error_messages.required_country_msg"
      )
    ),
});

export type CountryFormData = z.infer<typeof countryFormSchema>;
