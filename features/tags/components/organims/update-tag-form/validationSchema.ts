import { z } from "zod";

import { i18n } from "@/core/store";

export const updateTagSchema = z.object({
  tagId: z.string().uuid({
    message: i18n.t(
      "tags_translations.update_tag_template.form_error_messages.invalid_tag_id_msg"
    ),
  }),
  name: z.string().min(1, {
    message: i18n.t(
      "tags_translations.update_tag_template.form_error_messages.required_name_msg"
    ),
  }),
  type: z.enum(["prompt_tag", "resource_tag"], {
    message: i18n.t(
      "tags_translations.update_tag_template.form_error_messages.invalid_tag_type_msg"
    ),
  }),
});

export type UpdateTagFormData = z.infer<typeof updateTagSchema>;
