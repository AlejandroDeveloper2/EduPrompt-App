import { z } from "zod";

import { i18n } from "@/core/store";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().regex(passwordRegex, {
      message: i18n.t(
        "auth_translations.reset_password_template.form_error_messages.invalid_password_msg"
      ),
    }),
    confirmPassword: z.string().min(1, {
      message: i18n.t(
        "auth_translations.reset_password_template.form_error_messages.required_password_confirm_msg"
      ),
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: i18n.t(
      "auth_translations.reset_password_template.form_error_messages.passwords_dismatch_msg"
    ),
    path: ["confirmPassword"],
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
