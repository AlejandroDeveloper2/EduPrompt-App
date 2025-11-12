export const setGenerationProcessName = (
  name: string,
  prefix: string = "Generando"
): string => {
  return `${prefix}_${name}`;
};
