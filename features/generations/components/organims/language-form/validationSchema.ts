import { z } from "zod";

import { i18n } from "@/core/store";

export const languageFormSchema = z.object({
  language: z.enum(["es", "en", "pt"], {
    message: i18n.t(
      "generations-translations.language-template.form-error-messages.invalid-language-msg",
    ),
  }),
});

export type LanguageFormData = z.infer<typeof languageFormSchema>;
