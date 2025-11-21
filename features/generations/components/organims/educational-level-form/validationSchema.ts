import { z } from "zod";

import { TARGET_EDUCATIONAL_LEVELS } from "@/features/generations/constants";

export const educationalLevelFormSchema = z
  .object({
    educationalLevelId: z.string().min(1, "El nivel educativo es obligatorio"),
    gradeLevelId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const requiredGradeLevels = [
      "educational_level_preschool",
      "educational_level_primary",
      "educational_level_secondary",
    ];

    const isGradeRequired: boolean = TARGET_EDUCATIONAL_LEVELS.some((level) =>
      requiredGradeLevels.includes(level.educationalLevelId)
    );

    if (isGradeRequired && !data.gradeLevelId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "El grado es obligatorio para el nivel preescolar, primaria y bachillerato",
        path: ["gradeLevelId"],
      });
    }
  });

export type EducationalLevelFormData = z.infer<
  typeof educationalLevelFormSchema
>;
