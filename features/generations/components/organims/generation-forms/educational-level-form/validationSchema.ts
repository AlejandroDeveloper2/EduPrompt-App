import { z } from "zod";

import { TARGET_EDUCATIONAL_LEVELS } from "@/features/generations/constants";

import { i18n, useLanguageStore } from "@/core/store";

export const educationalLevelFormSchema = z
  .object({
    educationalLevelId: z
      .string()
      .min(
        1,
        i18n.t(
          "generations_translations.educational_level_template.form_error_messages.required_educational_level_msg",
        ),
      ),
    gradeLevelId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const requiredGradeLevels = [
      "educational_level_preschool",
      "educational_level_primary",
      "educational_level_secondary",
    ];

    const { lang } = useLanguageStore.getState();

    const isGradeRequired: boolean = TARGET_EDUCATIONAL_LEVELS[lang].some(
      (level) => requiredGradeLevels.includes(level.educationalLevelId),
    );

    if (isGradeRequired && !data.gradeLevelId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: i18n.t(
          "generations_translations.educational_level_template.form_error_messages.required_grade_msg",
        ),
        path: ["gradeLevelId"],
      });
    }
  });

export type EducationalLevelFormData = z.infer<
  typeof educationalLevelFormSchema
>;
