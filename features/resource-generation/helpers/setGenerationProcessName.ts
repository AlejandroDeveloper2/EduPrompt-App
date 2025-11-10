export const setGenerationProcessName = (
  resourceType: string,
  generationId: string
): string => {
  return `Generando_${resourceType}_${generationId}`;
};
