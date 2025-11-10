export const validateIsLastOptionSelected = <T, I>(
  options: T[],
  selectedOptionId: I,
  optionIdKey: keyof T
): boolean => {
  const optionsSize = options.length;
  const selectedOptionIndex = options.findIndex(
    (option) => option[optionIdKey] === selectedOptionId
  );
  return selectedOptionIndex === optionsSize - 1;
};
