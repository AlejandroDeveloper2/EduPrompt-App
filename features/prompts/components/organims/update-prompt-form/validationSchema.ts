import { z } from "zod";

import { i18n } from "@/core/store";

export const updatePromptSchema = z.object({
  promptId: z
    .string()
    .uuid(
      i18n.t(
        "prompts_translations.update_prompt_template.form_error_messages.invalid_prompt_id_msg"
      )
    ),
  promptTitle: z
    .string()
    .min(
      1,
      i18n.t(
        "prompts_translations.update_prompt_template.form_error_messages.required_title_msg"
      )
    ),
  promptText: z
    .string()
    .min(
      1,
      i18n.t(
        "prompts_translations.update_prompt_template.form_error_messages.required_prompt_text_msg"
      )
    ),
  tag: z
    .string()
    .uuid(
      i18n.t(
        "prompts_translations.update_prompt_template.form_error_messages.invalid_selected_tag_msg"
      )
    ),
});

export type UpdatePromptFormData = z.infer<typeof updatePromptSchema>;
