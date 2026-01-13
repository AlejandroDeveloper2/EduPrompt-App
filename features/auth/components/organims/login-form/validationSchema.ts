import { z } from "zod";

import { i18n } from "@/core/store";

export const loginSchema = z.object({
  email: z.string().email({
    message: i18n.t(
      "auth-translations.login-template.form-error-messages.invalid-email-msg"
    ),
  }),
  password: z.string().min(1, {
    message: i18n.t(
      "auth-translations.login-template.form-error-messages.required-password-msg"
    ),
  }),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
