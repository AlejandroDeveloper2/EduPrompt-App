import {
  PRESCHOOL_GRADE_LEVELS,
  PRIMARY_GRADE_LEVELS,
  SECONDARY_GRADE_LEVELS,
} from "@/features/resource-generation/constants";

export const getGrades = (educationalLevelId: string) => {
  if (educationalLevelId === "educational_level_preschool")
    return PRESCHOOL_GRADE_LEVELS;
  if (educationalLevelId === "educational_level_primary")
    return PRIMARY_GRADE_LEVELS;
  if (educationalLevelId === "educational_level_secondary")
    return SECONDARY_GRADE_LEVELS;
  return [];
};
