import { FlatList, View } from "react-native";

import { getIsSelectedOption } from "../../../helpers";
import { useSearchInput } from "../../../hooks/core";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { DropdownOption, Empty, Input } from "../../molecules";

import { DropdownOptionListStyle } from "./DropdownOptionList.style";

interface DropdownOptionListProps<T> {
  optionList: T[];
  optionIdkey: keyof T;
  optionLabelKey: keyof T;
  searchInputPlaceholder: string;
  selectedOption: T | null;
  onSelectOption: (option: T) => void;
}

interface SearchPanelProps {
  searchValue: string;
  searchInputPlaceholder: string;
  handleSearchChange: (value: string) => void;
  onClearSearchInput: () => void;
}

const SearchPanel = ({
  searchValue,
  searchInputPlaceholder,
  handleSearchChange,
  onClearSearchInput,
}: SearchPanelProps) => {
  const size = useScreenDimensionsStore();

  return (
    <View style={DropdownOptionListStyle(size).PanelContainer}>
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        placeholder={searchInputPlaceholder}
        onChange={(name, value) => handleSearchChange(value)}
        onClearInput={onClearSearchInput}
        icon="search-outline"
      />
    </View>
  );
};

function DropdownOptionList<T>({
  optionList,
  optionIdkey,
  optionLabelKey,
  searchInputPlaceholder,
  selectedOption,
  onSelectOption,
}: DropdownOptionListProps<T>) {
  const size = useScreenDimensionsStore();
  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput<T>(optionList, optionLabelKey);

  const dropdownOptionListStyle = DropdownOptionListStyle(size);

  return (
    <FlatList
      style={dropdownOptionListStyle.ListContainer}
      contentContainerStyle={dropdownOptionListStyle.ListContent}
      data={filteredElements}
      renderItem={({ item }) => (
        <DropdownOption
          option={item}
          optionLabelKey={optionLabelKey}
          isSelected={getIsSelectedOption(item, selectedOption, optionIdkey)}
          onSelectOption={onSelectOption}
        />
      )}
      keyExtractor={(item) => item[optionIdkey] as string}
      ListHeaderComponent={
        <SearchPanel
          searchValue={searchValue}
          searchInputPlaceholder={searchInputPlaceholder}
          handleSearchChange={handleSearchChange}
          onClearSearchInput={onClearSearchInput}
        />
      }
      ListEmptyComponent={
        <Empty message="No hay resultados" icon="close-circle-outline" />
      }
    />
  );
}

export default DropdownOptionList;
