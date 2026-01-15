import { z } from "zod";

import { i18n } from "@/core/store";

export const editFolderSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: i18n.t(
        "my-files-translations.edit-folder-name-template.form-error-messages.required-folder-name-msg"
      ),
    }),
});

export type FolderNameFormData = z.infer<typeof editFolderSchema>;
