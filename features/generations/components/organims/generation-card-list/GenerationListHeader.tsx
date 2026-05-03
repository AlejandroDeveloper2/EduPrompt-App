import { View } from "react-native";

import { useGenerationListUI } from "@/features/generations/hooks/core";

import { ScreenSection } from "@/shared/components/atoms";
import { Input } from "@/shared/components/molecules";

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
  const { size, t } = useGenerationListUI();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.ListHeaderContainer}>
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
