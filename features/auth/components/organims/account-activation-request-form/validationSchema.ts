import { z } from "zod";

import { i18n } from "@/core/store";

export const accountActivationRequestSchema = z.object({
  email: z
    .string()
    .email({
      message: i18n.t(
        "auth_translations.account_activation_request_template.form_error_messages.invalid_email_msg"
      ),
    }),
});

export type AccountActivationRequestData = z.infer<
  typeof accountActivationRequestSchema
>;
