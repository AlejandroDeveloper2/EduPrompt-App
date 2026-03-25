import { z } from "zod";

import { i18n } from "@/core/store";

export const requestPassResetSchema = z.object({
  email: z
    .string()
    .email({
      message: i18n.t(
        "auth_translations.request_pass_reset_template.form_error_messages.invalid_email_msg"
      ),
    }),
});

export type RequestPassResetData = z.infer<typeof requestPassResetSchema>;
