import { z } from "zod";

import { i18n } from "@/core/store";

export const languageFormSchema = z.object({
  language: z.enum(["es", "en", "pt"], {
    message: i18n.t(
      "generations_translations.language_template.form_error_messages.invalid_language_msg",
    ),
  }),
});

export type LanguageFormData = z.infer<typeof languageFormSchema>;
