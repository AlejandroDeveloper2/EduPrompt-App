import { z } from "zod";

import { i18n } from "@/core/store";

export const editFolderSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: i18n.t(
        "my_files_translations.edit_folder_name_template.form_error_messages.required_folder_name_msg"
      ),
    }),
});

export type FolderNameFormData = z.infer<typeof editFolderSchema>;
