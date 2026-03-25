import { z } from "zod";

import { i18n } from "@/core/store";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const signupSchema = z
  .object({
    userName: z.string().min(3, {
      message: i18n.t(
        "auth_translations.sign_up_template.form_error_messages.invalid_username_msg"
      ),
    }),
    email: z.string().email({
      message: i18n.t(
        "auth_translations.sign_up_template.form_error_messages.invalid_email_msg"
      ),
    }),
    password: z.string().regex(passwordRegex, {
      message: i18n.t(
        "auth_translations.sign_up_template.form_error_messages.invalid_password_msg"
      ),
    }),
    confirmPassword: z.string().min(1, {
      message: i18n.t(
        "auth_translations.sign_up_template.form_error_messages.required_password_confirm_msg"
      ),
    }),
    termsAndPolicies: z.boolean().refine((val) => val === true, {
      message: i18n.t(
        "auth_translations.sign_up_template.form_error_messages.required_terms_msg"
      ),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t(
      "auth_translations.sign_up_template.form_error_messages.passwords_dismatch_msg"
    ),
    path: ["confirmPassword"],
  });

export type SignupData = z.infer<typeof signupSchema>;
