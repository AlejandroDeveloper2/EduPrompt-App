import { z } from "zod";

import { i18n } from "@/core/store";

export const editFileSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: i18n.t(
        "my_files_translations.edit_file_name_template.form_error_messages.required_file_name_msg"
      ),
    }),
});

export type FileNameFormData = z.infer<typeof editFileSchema>;
