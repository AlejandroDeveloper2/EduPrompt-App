export const getIsSelectedOption = <T>(
  option: T,
  selectedOption: T | null,
  optionIdkey: keyof T
) => {
  const isSelected: boolean = selectedOption
    ? option[optionIdkey] === selectedOption[optionIdkey]
    : false;

  return isSelected;
};
