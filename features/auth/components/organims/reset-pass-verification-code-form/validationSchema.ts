import { z } from "zod";

import { i18n } from "@/core/store";

export const resetPassVerificationCodeSchema = z.object({
  code: z
    .string()
    .min(4, {
      message: i18n.t(
        "auth_translations.reset_pass_verification_code_template.form_error_messages.invalid_code_min_length_msg"
      ),
    })
    .max(4, {
      message: i18n.t(
        "auth_translations.reset_pass_verification_code_template.form_error_messages.invalid_code_max_length_msg"
      ),
    }),
});

export type ResetPassVerificationCodeData = z.infer<
  typeof resetPassVerificationCodeSchema
>;
