import { GenerationData } from "../types";

export const setGenerationProcessName = (
  generationData: GenerationData
): string => {
  const { resourceType, subjectName, resourceFormat } = generationData;
  return `${resourceType.resourceTypeLabel}_${subjectName}_${resourceFormat.formatKey}`;
};
