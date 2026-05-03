import { z } from "zod";

import { i18n } from "@/core/store";

export const createResourceSchema = z.object({
  title: z
    .string()
    .min(
      1,
      i18n.t(
        "generations_translations.save_resource_form.form_error_messages.required_title_msg",
      ),
    ),
  groupTag: z
    .string()
    .min(
      1,
      i18n.t(
        "generations_translations.save_resource_form.form_error_messages.required_group_tag_msg",
      ),
    ),
});

export type CreateResourceFormData = z.infer<typeof createResourceSchema>;
