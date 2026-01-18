import { z } from "zod";

import { i18n } from "@/core/store";

export const subjectFormSchema = z.object({
  subjectName: z
    .string()
    .min(
      1,
      i18n.t(
        "generations-translations.subject-template.form-error-messages.required-subject-name-msg"
      )
    ),
});

export type SubjectFormData = z.infer<typeof subjectFormSchema>;
