import { z } from "zod";

import { i18n } from "@/core/store";

export const createResourceSchema = z.object({
  title: z
    .string()
    .min(
      1,
      i18n.t(
        "generations-translations.save-resource-form.form-error-messages.required-title-msg",
      ),
    ),
  groupTag: z
    .string()
    .min(
      1,
      i18n.t(
        "generations-translations.save-resource-form.form-error-messages.required-group-tag-msg",
      ),
    ),
});

export type CreateResourceFormData = z.infer<typeof createResourceSchema>;
