import { z } from "zod";

import { i18n } from "@/core/store";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().regex(passwordRegex, {
      message: i18n.t(
        "auth-translations.reset-password-template.form-error-messages.invalid-password-msg"
      ),
    }),
    confirmPassword: z.string().min(1, {
      message: i18n.t(
        "auth-translations.reset-password-template.form-error-messages.required-password-confirm-msg"
      ),
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: i18n.t(
      "auth-translations.reset-password-template.form-error-messages.passwords-dismatch-msg"
    ),
    path: ["confirmPassword"],
  });

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
