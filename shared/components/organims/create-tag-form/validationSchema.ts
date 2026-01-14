import { z } from "zod";

import { i18n } from "@/core/store";

export const createTagSchema = z.object({
  name: z
    .string()
    .min(
      1,
      i18n.t(
        "common-translations.create-tag-form.form-error-messages.invalid-tag-name-msg"
      )
    ),
});

export type CreateTagData = z.infer<typeof createTagSchema>;
