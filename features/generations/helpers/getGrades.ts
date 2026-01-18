import { LangTag } from "@/core/types";

import {
  PRESCHOOL_GRADE_LEVELS,
  PRIMARY_GRADE_LEVELS,
  SECONDARY_GRADE_LEVELS,
} from "@/features/generations/constants";

export const getGrades = (educationalLevelId: string, language: LangTag) => {
  if (educationalLevelId === "educational_level_preschool")
    return PRESCHOOL_GRADE_LEVELS[language];
  if (educationalLevelId === "educational_level_primary")
    return PRIMARY_GRADE_LEVELS[language];
  if (educationalLevelId === "educational_level_secondary")
    return SECONDARY_GRADE_LEVELS[language];
  return [];
};
