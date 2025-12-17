import { useState } from "react";

const useListFilters = <T>(defaultFilter: T) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<T>(defaultFilter);

  const handleSearchChange = (value: string): void => {
    setSearchValue(value);
  };

  const onClearSearchInput = (): void => {
    setSearchValue("");
  };

  const onFilterChange = (filter: T): void => {
    setSelectedFilter(filter);
  };

  return {
    searchValue,
    selectedFilter,
    handleSearchChange,
    onClearSearchInput,
    onFilterChange,
  };
};

export default useListFilters;
