import { z } from "zod";

import { i18n } from "@/core/store";

export const editFileSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: i18n.t(
        "my-files-translations.edit-file-name-template.form-error-messages.required-file-name-msg"
      ),
    }),
});

export type FileNameFormData = z.infer<typeof editFileSchema>;
