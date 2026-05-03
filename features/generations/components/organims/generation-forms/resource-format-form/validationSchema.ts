import { z } from "zod";

import { i18n } from "@/core/store";

export const resourceFormatFormSchema = z.object({
  formatKey: z.enum(["text", "image", "chart", "table"], {
    message: i18n.t(
      "generations_translations.resource_format_template.form_error_messages.invalid_format_msg"
    ),
  }),
});

export type ResourceFormatFormData = z.infer<typeof resourceFormatFormSchema>;
