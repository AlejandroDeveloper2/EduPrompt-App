import { z } from "zod";

import { i18n } from "@/core/store";

export const requestPassResetSchema = z.object({
  email: z
    .string()
    .email({
      message: i18n.t(
        "auth-translations.request-pass-reset-template.form-error-messages.invalid-email-msg"
      ),
    }),
});

export type RequestPassResetData = z.infer<typeof requestPassResetSchema>;
