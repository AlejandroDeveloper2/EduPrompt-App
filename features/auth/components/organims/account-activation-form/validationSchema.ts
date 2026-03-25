import { z } from "zod";

import { i18n } from "@/core/store";

export const accountActivationSchema = z.object({
  code: z
    .string()
    .min(4, {
      message: i18n.t(
        "auth_translations.account_activation_template.form_error_messages.invalid_code_min_length_msg"
      ),
    })
    .max(4, {
      message: i18n.t(
        "auth_translations.account_activation_template.form_error_messages.invalid_code_max_length_msg"
      ),
    }),
});

export type AccountActivationData = z.infer<typeof accountActivationSchema>;
