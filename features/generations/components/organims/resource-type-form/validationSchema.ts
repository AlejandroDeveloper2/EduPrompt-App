import { z } from "zod";

import { EDUCATIONAL_RESOURCE_TYPES } from "@/features/generations/constants";

import { i18n, LanguageStore } from "@/core/store";

import { validateIsLastOptionSelected } from "@/features/generations/helpers";

export const resourceTypeFormSchema = z
  .object({
    resourceTypeId: z
      .string()
      .min(
        1,
        i18n.t(
          "generations-translations.resource-type-template.form-error-messages.required-resource-type-msg"
        )
      ),
    otherResourceType: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { lang } = LanguageStore.getState();

    const isLastOptionSelected = validateIsLastOptionSelected(
      EDUCATIONAL_RESOURCE_TYPES[lang],
      data.resourceTypeId,
      "resourceTypeId"
    );
    if (isLastOptionSelected) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: i18n.t(
          "generations-translations.resource-type-template.form-error-messages.required-alternative-resource-msg"
        ),
        path: ["otherResourceType"],
      });
    }
  });

export type ResourceTypeFormData = z.infer<typeof resourceTypeFormSchema>;
