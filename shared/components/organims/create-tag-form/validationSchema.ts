import { z } from "zod";

import { i18n } from "@/core/store";

export const createTagSchema = z.object({
  name: z
    .string()
    .min(
      1,
      i18n.t(
        "common_translations.create_tag_form.form_error_messages.invalid_tag_name_msg"
      )
    ),
});

export type CreateTagData = z.infer<typeof createTagSchema>;
