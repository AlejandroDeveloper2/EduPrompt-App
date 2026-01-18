import { z } from "zod";

import { TARGET_EDUCATIONAL_LEVELS } from "@/features/generations/constants";

import { i18n, LanguageStore } from "@/core/store";

export const educationalLevelFormSchema = z
  .object({
    educationalLevelId: z
      .string()
      .min(
        1,
        i18n.t(
          "generations-translations.educational-level-template.form-error-messages.required-educational-level-msg"
        )
      ),
    gradeLevelId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const requiredGradeLevels = [
      "educational_level_preschool",
      "educational_level_primary",
      "educational_level_secondary",
    ];

    const { lang } = LanguageStore.getState();

    const isGradeRequired: boolean = TARGET_EDUCATIONAL_LEVELS[lang].some(
      (level) => requiredGradeLevels.includes(level.educationalLevelId)
    );

    if (isGradeRequired && !data.gradeLevelId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: i18n.t(
          "generations-translations.educational-level-template.form-error-messages.required-grade-msg"
        ),
        path: ["gradeLevelId"],
      });
    }
  });

export type EducationalLevelFormData = z.infer<
  typeof educationalLevelFormSchema
>;
