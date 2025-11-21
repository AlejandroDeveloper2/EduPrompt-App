import { z } from "zod";

import { EDUCATIONAL_RESOURCE_TYPES } from "@/features/generations/constants";

import { validateIsLastOptionSelected } from "@/features/generations/helpers";

export const resourceTypeFormSchema = z
  .object({
    resourceTypeId: z.string().min(1, "El tipo de recurso es obligatorio"),
    otherResourceType: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isLastOptionSelected = validateIsLastOptionSelected(
      EDUCATIONAL_RESOURCE_TYPES,
      data.resourceTypeId,
      "resourceTypeId"
    );
    if (isLastOptionSelected) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El tipo de recurso alternativo es obligatorio",
        path: ["otherResourceType"],
      });
    }
  });

export type ResourceTypeFormData = z.infer<typeof resourceTypeFormSchema>;
