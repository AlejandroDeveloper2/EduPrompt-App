import { z } from "zod";

import { i18n } from "@/core/store";

export const resourceDescriptionFormSchema = z.object({
  descriptionPrompt: z
    .string()
    .min(
      1,
      i18n.t(
        "generations_translations.resource_description_template.form_error_messages.required_description_msg",
      ),
    ),
});

export type ResourceDescriptionFormData = z.infer<
  typeof resourceDescriptionFormSchema
>;
