import { GenerationData } from "../types";

export const formatGenerationData = (
  generationData: GenerationData
): string => {
  const {
    subjectName,
    educationalLevel,
    country,
    resourceType,
    resourceFormat,
    resourceDescriptionPrompt,
    language,
  } = generationData;

  return `
    Materia: ${subjectName}  
    Grado: ${
      educationalLevel.grade
        ? ` ${educationalLevel.educationalLevelLabel} ${educationalLevel.grade.gradeLevelLabel}`
        : educationalLevel.educationalLevelLabel
    }  
    País: ${country.countryName}  
    Tipo de recurso: ${resourceType.other ?? resourceType.resourceTypeLabel} 
    Idioma: ${language.label}  
    Descripción del recurso: ${resourceDescriptionPrompt} 
    Formato: ${resourceFormat.formatLabel}
`;
};
