import { View } from "react-native";

import {
  useGenerationListUI,
  useGenerationSelection,
} from "@/features/generations/hooks/core";

import { ScreenSection } from "@/shared/components/atoms";
import { Input } from "@/shared/components/molecules";
import { SelectionOptionsBar } from "@/shared/components/organims";

import { dynamicStyles } from "./GenerationCardList.style";

interface GenerationListHeaderProps {
  searchValue: string;
  handleSearchChange: (text: string) => void;
  onClearSearchInput: () => void;
}

const GenerationListHeader = ({
  searchValue,
  handleSearchChange,
  onClearSearchInput,
}: GenerationListHeaderProps) => {
  const { size, t, actions } = useGenerationListUI();

  const selectionLogic = useGenerationSelection();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.ListHeaderContainer}>
      {selectionLogic.selectionMode && (
        <SelectionOptionsBar
          isAllSelected={selectionLogic.isAllSelected}
          selectionMode={selectionLogic.selectionMode}
          actionsDisabled={false}
          actions={actions}
          selectionCount={selectionLogic.selectionCount}
          toggleSelectAll={selectionLogic.toggleSelectAll}
          disableSelectionMode={() => selectionLogic.toggleSelectionMode(false)}
        />
      )}
      <ScreenSection
        description={t(
          "generations_translations.generation_list_labels.description",
        )}
        title={t("generations_translations.generation_list_labels.title")}
        icon="bulb-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder={t(
          "generations_translations.generation_list_labels.search_input_placeholder",
        )}
        onChange={(_, value) => handleSearchChange(value)}
        onClearInput={onClearSearchInput}
      />
    </View>
  );
};

export default GenerationListHeader;
