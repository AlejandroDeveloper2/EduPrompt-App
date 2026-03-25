import { z } from "zod";

import { i18n } from "@/core/store";

export const updateResourceSchema = z.object({
  resourceId: z
    .string()
    .uuid(
      i18n.t(
        "resources_translations.update_resource_template.form_error_messages.invalid_resource_id_msg"
      )
    ),
  title: z
    .string()
    .min(
      1,
      i18n.t(
        "resources_translations.update_resource_template.form_error_messages.required_title_msg"
      )
    ),
  groupTag: z
    .string()
    .min(
      1,
      i18n.t(
        "resources_translations.update_resource_template.form_error_messages.required_tag_msg"
      )
    ),
});

export type UpdateResourceFormData = z.infer<typeof updateResourceSchema>;
