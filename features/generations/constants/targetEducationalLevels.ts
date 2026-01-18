import { Lang } from "@/core/types";
import { EducationalLevel } from "../types";

export const TARGET_EDUCATIONAL_LEVELS: Lang<EducationalLevel> = {
  es: [
    {
      educationalLevelId: "educational_level_preschool",
      educationalLevelLabel: "Preescolar",
    },
    {
      educationalLevelId: "educational_level_primary",
      educationalLevelLabel: "Primaria",
    },
    {
      educationalLevelId: "educational_level_secondary",
      educationalLevelLabel: "Secundaria / Bachillerato",
    },
    {
      educationalLevelId: "educational_level_higher_education",
      educationalLevelLabel: "Educación Superior / Universitaria",
    },
  ],
  en: [
    {
      educationalLevelId: "educational_level_preschool",
      educationalLevelLabel: "Preschool",
    },
    {
      educationalLevelId: "educational_level_primary",
      educationalLevelLabel: "Primary / Elementary",
    },
    {
      educationalLevelId: "educational_level_secondary",
      educationalLevelLabel: "Secondary / High School",
    },
    {
      educationalLevelId: "educational_level_higher_education",
      educationalLevelLabel: "Higher Education / University",
    },
  ],
  pt: [
    {
      educationalLevelId: "educational_level_preschool",
      educationalLevelLabel: "Educação Infantil",
    },
    {
      educationalLevelId: "educational_level_primary",
      educationalLevelLabel: "Ensino Fundamental",
    },
    {
      educationalLevelId: "educational_level_secondary",
      educationalLevelLabel: "Ensino Médio",
    },
    {
      educationalLevelId: "educational_level_higher_education",
      educationalLevelLabel: "Ensino Superior / Universitário",
    },
  ],
};
