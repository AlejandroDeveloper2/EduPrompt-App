import { z } from "zod";

import { i18n } from "@/core/store";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const updateUsernameSchema = z.object({
  userName: z.string().min(3, {
    message: i18n.t(
      "settings_translations.update_username_template.form_error_messages.invalid_username_msg"
    ),
  }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: i18n.t(
        "settings_translations.change_password_template.form_error_messages.required_current_password_msg"
      ),
    }),
    newPassword: z.string().regex(passwordRegex, {
      message: i18n.t(
        "settings_translations.change_password_template.form_error_messages.invalid_password_msg"
      ),
    }),
    confirmPassword: z.string().min(1, {
      message: i18n.t(
        "settings_translations.change_password_template.form_error_messages.required_password_confirm_msg"
      ),
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: i18n.t(
      "settings_translations.change_password_template.form_error_messages.passwords_dismatch_msg"
    ),
    path: ["confirmPassword"],
  });

export const updateEmailRequestSchema = z.object({
  currentEmail: z.string().email({
    message: i18n.t(
      "settings_translations.update_email_template.form_error_messages.invalid_email_msg"
    ),
  }),
  updatedEmail: z.string().email({
    message: i18n.t(
      "settings_translations.update_email_template.form_error_messages.invalid_email_msg"
    ),
  }),
});

export const updateEmailVerificationCodeSchema = z.object({
  code: z
    .string()
    .min(4, {
      message: i18n.t(
        "settings_translations.update_email_template.form_error_messages.invalid_code_min_length_msg"
      ),
    })
    .max(4, {
      message: i18n.t(
        "settings_translations.update_email_template.form_error_messages.invalid_code_max_length_msg"
      ),
    }),
});

export type UpdateUsernameData = z.infer<typeof updateUsernameSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type UpdateEmailRequestData = z.infer<typeof updateEmailRequestSchema>;
export type UpdateEmailVerificationCodeData = z.infer<
  typeof updateEmailVerificationCodeSchema
>;
