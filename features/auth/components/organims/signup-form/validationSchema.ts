import { z } from "zod";

import { i18n } from "@/core/store";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const signupSchema = z
  .object({
    userName: z.string().min(3, {
      message: i18n.t(
        "auth-translations.sign-up-template.form-error-messages.invalid-username-msg"
      ),
    }),
    email: z.string().email({
      message: i18n.t(
        "auth-translations.sign-up-template.form-error-messages.invalid-email-msg"
      ),
    }),
    password: z.string().regex(passwordRegex, {
      message: i18n.t(
        "auth-translations.sign-up-template.form-error-messages.invalid-password-msg"
      ),
    }),
    confirmPassword: z.string().min(1, {
      message: i18n.t(
        "auth-translations.sign-up-template.form-error-messages.required-password-confirm-msg"
      ),
    }),
    termsAndPolicies: z.boolean().refine((val) => val === true, {
      message: i18n.t(
        "auth-translations.sign-up-template.form-error-messages.required-terms-msg"
      ),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t(
      "auth-translations.sign-up-template.form-error-messages.passwords-dismatch-msg"
    ),
    path: ["confirmPassword"],
  });

export type SignupData = z.infer<typeof signupSchema>;
