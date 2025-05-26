import { useMemo, useState } from "react";

const useSearchInput = <T>(elementList: T[], elementSearchKey: keyof T) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredElements: T[] = useMemo(() => {
    if (searchValue.length > 0) {
      return elementList.filter((item) => {
        const itemObject = Object(item);
        const itemField: string = itemObject[elementSearchKey];

        return (
          itemField.substring(0, searchValue.length).toLowerCase() ===
          searchValue.substring(0, itemField.length).toLowerCase()
        );
      });
    }
    return elementList;
  }, [searchValue, elementList, elementSearchKey]);

  const handleSearchChange = (text: string): void => {
    setSearchValue(text);
  };

  const onClearSearchInput = (): void => {
    setSearchValue("");
  };

  return {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  };
};

export default useSearchInput;
