import { z } from "zod";

import { i18n } from "@/core/store";

export const resourceDescriptionFormSchema = z.object({
  descriptionPrompt: z
    .string()
    .min(
      1,
      i18n.t(
        "generations-translations.resource-description-template.form-error-messages.required-description-msg"
      )
    ),
});

export const savePromptFormSchema = z.object({
  promptTitle: z
    .string()
    .min(
      1,
      i18n.t(
        "generations-translations.save-prompt-template.form-error-messages.required-prompt-title"
      )
    ),
  promptText: z
    .string()
    .min(
      1,
      i18n.t(
        "generations-translations.save-prompt-template.form-error-messages.required-prompt-body"
      )
    ),
  tag: z
    .string()
    .min(
      1,
      i18n.t(
        "generations-translations.save-prompt-template.form-error-messages.required-prompt-tag"
      )
    ),
});

export type ResourceDescriptionFormData = z.infer<
  typeof resourceDescriptionFormSchema
>;

export type SavePromptFormData = z.infer<typeof savePromptFormSchema>;
