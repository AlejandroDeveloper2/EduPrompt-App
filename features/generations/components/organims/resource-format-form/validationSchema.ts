import { z } from "zod";

import { i18n } from "@/core/store";

export const resourceFormatFormSchema = z.object({
  formatKey: z.enum(["text", "image", "chart", "table"], {
    message: i18n.t(
      "generations-translations.resource-format-template.form-error-messages.invalid-format-msg"
    ),
  }),
});

export type ResourceFormatFormData = z.infer<typeof resourceFormatFormSchema>;
