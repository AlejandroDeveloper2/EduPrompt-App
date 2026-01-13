import { z } from "zod";

import { i18n } from "@/core/store";

export const accountActivationSchema = z.object({
  code: z
    .string()
    .min(4, {
      message: i18n.t(
        "auth-translations.account-activation-template.form-error-messages.invalid-code-min-length-msg"
      ),
    })
    .max(4, {
      message: i18n.t(
        "auth-translations.account-activation-template.form-error-messages.invalid-code-max-length-msg"
      ),
    }),
});

export type AccountActivationData = z.infer<typeof accountActivationSchema>;
