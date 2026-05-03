import { z } from "zod";

import { EDUCATIONAL_RESOURCE_TYPES } from "@/features/generations/constants";

import { i18n, useLanguageStore } from "@/core/store";

import { validateIsLastOptionSelected } from "@/features/generations/helpers";

export const resourceTypeFormSchema = z
  .object({
    resourceTypeId: z
      .string()
      .min(
        1,
        i18n.t(
          "generations_translations.resource_type_template.form_error_messages.required_resource_type_msg",
        ),
      ),
    otherResourceType: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { lang } = useLanguageStore.getState();

    const isLastOptionSelected = validateIsLastOptionSelected(
      EDUCATIONAL_RESOURCE_TYPES[lang],
      data.resourceTypeId,
      "resourceTypeId",
    );
    if (isLastOptionSelected) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: i18n.t(
          "generations_translations.resource_type_template.form_error_messages.required_alternative_resource_msg",
        ),
        path: ["otherResourceType"],
      });
    }
  });

export type ResourceTypeFormData = z.infer<typeof resourceTypeFormSchema>;
