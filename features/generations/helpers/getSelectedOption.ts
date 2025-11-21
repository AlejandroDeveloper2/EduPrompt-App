export const getSelectedOption = <T, I>(
  options: T[],
  selectedOptionId: I,
  optionIdKey: keyof T
): T | null => {
  const selectedOption = options.find(
    (option) => option[optionIdKey] === selectedOptionId
  );
  if (!selectedOption) return null;
  return selectedOption;
};
