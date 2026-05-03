import { z } from "zod";

import { i18n } from "@/core/store";

export const subjectFormSchema = z.object({
  subjectName: z
    .string()
    .min(
      1,
      i18n.t(
        "generations_translations.subject_template.form_error_messages.required_subject_name_msg"
      )
    ),
});

export type SubjectFormData = z.infer<typeof subjectFormSchema>;
