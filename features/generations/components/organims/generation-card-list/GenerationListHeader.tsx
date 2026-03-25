import { View } from "react-native";

import { useTranslations } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection } from "@/shared/components/atoms";
import { Input } from "@/shared/components/molecules";

import { GenerationCardListStyle } from "./GenerationCardList.style";

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
  const size = useScreenDimensionsStore();

  const { t } = useTranslations();

  const generationCardListStyle = GenerationCardListStyle(size);

  return (
    <View style={generationCardListStyle.ListHeaderContainer}>
      <ScreenSection
        description={t(
          "generations_translations.generation_list_labels.description"
        )}
        title={t("generations_translations.generation_list_labels.title")}
        icon="bulb-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder={t(
          "generations_translations.generation_list_labels.search_input_placeholder"
        )}
        onChange={(_, value) => handleSearchChange(value)}
        onClearInput={onClearSearchInput}
      />
    </View>
  );
};

export default GenerationListHeader;
