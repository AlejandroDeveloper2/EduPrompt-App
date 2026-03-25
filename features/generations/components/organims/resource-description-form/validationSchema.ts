import { z } from "zod";

import { i18n } from "@/core/store";

export const resourceDescriptionFormSchema = z.object({
  descriptionPrompt: z
    .string()
    .min(
      1,
      i18n.t(
        "generations_translations.resource_description_template.form_error_messages.required_description_msg"
      )
    ),
});

export const savePromptFormSchema = z.object({
  promptTitle: z
    .string()
    .min(
      1,
      i18n.t(
        "generations_translations.save_prompt_template.form_error_messages.required_prompt_title"
      )
    ),
  promptText: z
    .string()
    .min(
      1,
      i18n.t(
        "generations_translations.save_prompt_template.form_error_messages.required_prompt_body"
      )
    ),
  tag: z
    .string()
    .min(
      1,
      i18n.t(
        "generations_translations.save_prompt_template.form_error_messages.required_prompt_tag"
      )
    ),
});

export type ResourceDescriptionFormData = z.infer<
  typeof resourceDescriptionFormSchema
>;

export type SavePromptFormData = z.infer<typeof savePromptFormSchema>;
