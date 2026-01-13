import { z } from "zod";

import { i18n } from "@/core/store";

export const accountActivationRequestSchema = z.object({
  email: z
    .string()
    .email({
      message: i18n.t(
        "auth-translations.account-activation-request-template.form-error-messages.invalid-email-msg"
      ),
    }),
});

export type AccountActivationRequestData = z.infer<
  typeof accountActivationRequestSchema
>;
