export const getSelectedOptionLabel = <T, I>(
  options: T[],
  selectedOptionId: I,
  optionIdKey: keyof T,
  optionLabelKey: keyof T
) => {
  const selectedOptionLabel = options.find(
    (option) => option[optionIdKey] === selectedOptionId
  );

  if (!selectedOptionLabel) return null;

  return selectedOptionLabel[optionLabelKey];
};
