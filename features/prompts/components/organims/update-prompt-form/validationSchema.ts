import { z } from "zod";

import { i18n } from "@/core/store";

export const updatePromptSchema = z.object({
  promptId: z
    .string()
    .uuid(
      i18n.t(
        "prompts-translations.update-prompt-template.form-error-messages.invalid-prompt-id-msg"
      )
    ),
  promptTitle: z
    .string()
    .min(
      1,
      i18n.t(
        "prompts-translations.update-prompt-template.form-error-messages.required-title-msg"
      )
    ),
  promptText: z
    .string()
    .min(
      1,
      i18n.t(
        "prompts-translations.update-prompt-template.form-error-messages.required-prompt-text-msg"
      )
    ),
  tag: z
    .string()
    .uuid(
      i18n.t(
        "prompts-translations.update-prompt-template.form-error-messages.invalid-selected-tag-msg"
      )
    ),
});

export type UpdatePromptFormData = z.infer<typeof updatePromptSchema>;
