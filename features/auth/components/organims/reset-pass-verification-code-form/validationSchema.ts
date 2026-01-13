import { z } from "zod";

import { i18n } from "@/core/store";

export const resetPassVerificationCodeSchema = z.object({
  code: z
    .string()
    .min(4, {
      message: i18n.t(
        "auth-translations.reset-pass-verification-code-template.form-error-messages.invalid-code-min-length-msg"
      ),
    })
    .max(4, {
      message: i18n.t(
        "auth-translations.reset-pass-verification-code-template.form-error-messages.invalid-code-max-length-msg"
      ),
    }),
});

export type ResetPassVerificationCodeData = z.infer<
  typeof resetPassVerificationCodeSchema
>;
