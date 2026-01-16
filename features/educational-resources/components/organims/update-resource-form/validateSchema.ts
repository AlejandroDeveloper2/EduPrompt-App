import { z } from "zod";

import { i18n } from "@/core/store";

export const updateResourceSchema = z.object({
  resourceId: z
    .string()
    .uuid(
      i18n.t(
        "resources-translations.update-resource-template.form-error-messages.invalid-resource-id-msg"
      )
    ),
  title: z
    .string()
    .min(
      1,
      i18n.t(
        "resources-translations.update-resource-template.form-error-messages.required-title-msg"
      )
    ),
  groupTag: z
    .string()
    .min(
      1,
      i18n.t(
        "resources-translations.update-resource-template.form-error-messages.required-tag-msg"
      )
    ),
});

export type UpdateResourceFormData = z.infer<typeof updateResourceSchema>;
