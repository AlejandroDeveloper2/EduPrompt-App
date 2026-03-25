import { z } from "zod";

import { i18n } from "@/core/store";

export const loginSchema = z.object({
  email: z.string().email({
    message: i18n.t(
      "auth_translations.login_template.form_error_messages.invalid_email_msg"
    ),
  }),
  password: z.string().min(1, {
    message: i18n.t(
      "auth_translations.login_template.form_error_messages.required_password_msg"
    ),
  }),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
