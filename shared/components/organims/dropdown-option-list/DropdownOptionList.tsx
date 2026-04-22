import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useAnimatedRef } from "react-native-reanimated";

import { getIsSelectedOption } from "../../../helpers";
import {
  useResponsive,
  useSearchInput,
  useTranslations,
} from "../../../hooks/core";

import { DropdownOption, Empty, Input } from "../../molecules";

import { dynamicStyles } from "./DropdownOptionList.style";

export interface DropdownOptionListProps<T> {
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
  const size = useResponsive();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.PanelContainer}>
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
  const listRef = useAnimatedRef<FlatList<T>>();

  const size = useResponsive();
  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput<T>(optionList, optionLabelKey);
  const { t } = useTranslations();

  const styles = dynamicStyles(size);

  return (
    <FlatList
      ref={listRef}
      scrollEventThrottle={16}
      simultaneousHandlers={listRef}
      style={styles.ListContainer}
      contentContainerStyle={styles.ListContent}
      data={filteredElements}
      renderItem={({ item }) => (
        <DropdownOption
          option={item as T}
          optionLabelKey={optionLabelKey}
          isSelected={getIsSelectedOption(
            item as T,
            selectedOption,
            optionIdkey,
          )}
          onSelectOption={onSelectOption}
        />
      )}
      windowSize={5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      keyExtractor={(item) => {
        const i = item as T;
        return i[optionIdkey] as string;
      }}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <SearchPanel
          searchValue={searchValue}
          searchInputPlaceholder={searchInputPlaceholder}
          handleSearchChange={handleSearchChange}
          onClearSearchInput={onClearSearchInput}
        />
      }
      ListEmptyComponent={
        <Empty
          message={t("common_translations.dropdown_list_labels.empty_list_msg")}
          icon="close-circle-outline"
        />
      }
    />
  );
}

export default DropdownOptionList;
