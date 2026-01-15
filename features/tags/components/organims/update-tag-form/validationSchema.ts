import { z } from "zod";

import { i18n } from "@/core/store";

export const updateTagSchema = z.object({
  tagId: z.string().uuid({
    message: i18n.t(
      "tags-translations.update-tag-template.form-error-messages.invalid-tag-id-msg"
    ),
  }),
  name: z.string().min(1, {
    message: i18n.t(
      "tags-translations.update-tag-template.form-error-messages.required-name-msg"
    ),
  }),
  type: z.enum(["prompt_tag", "resource_tag"], {
    message: i18n.t(
      "tags-translations.update-tag-template.form-error-messages.invalid-tag-type-msg"
    ),
  }),
});

export type UpdateTagFormData = z.infer<typeof updateTagSchema>;
