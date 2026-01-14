import { z } from "zod";

import { i18n } from "@/core/store";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const updateUsernameSchema = z.object({
  userName: z.string().min(3, {
    message: i18n.t(
      "settings-translations.update-username-template.form-error-messages.invalid-username-msg"
    ),
  }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: i18n.t(
        "settings-translations.change-password-template.form-error-messages.required-current-password-msg"
      ),
    }),
    newPassword: z.string().regex(passwordRegex, {
      message: i18n.t(
        "settings-translations.change-password-template.form-error-messages.invalid-password-msg"
      ),
    }),
    confirmPassword: z.string().min(1, {
      message: i18n.t(
        "settings-translations.change-password-template.form-error-messages.required-password-confirm-msg"
      ),
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: i18n.t(
      "settings-translations.change-password-template.form-error-messages.passwords-dismatch-msg"
    ),
    path: ["confirmPassword"],
  });

export const updateEmailRequestSchema = z.object({
  currentEmail: z.string().email({
    message: i18n.t(
      "settings-translations.update-email-template.form-error-messages.invalid-email-msg"
    ),
  }),
  updatedEmail: z.string().email({
    message: i18n.t(
      "settings-translations.update-email-template.form-error-messages.invalid-email-msg"
    ),
  }),
});

export const updateEmailVerificationCodeSchema = z.object({
  code: z
    .string()
    .min(4, {
      message: i18n.t(
        "settings-translations.update-email-template.form-error-messages.invalid-code-min-length-msg"
      ),
    })
    .max(4, {
      message: i18n.t(
        "settings-translations.update-email-template.form-error-messages.invalid-code-max-length-msg"
      ),
    }),
});

export type UpdateUsernameData = z.infer<typeof updateUsernameSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type UpdateEmailRequestData = z.infer<typeof updateEmailRequestSchema>;
export type UpdateEmailVerificationCodeData = z.infer<
  typeof updateEmailVerificationCodeSchema
>;
