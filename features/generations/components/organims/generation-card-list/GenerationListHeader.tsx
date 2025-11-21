import { View } from "react-native";

import { ScreenSection } from "@/shared/components/atoms";
import { Input } from "@/shared/components/molecules";
import { useScreenDimensionsStore } from "@/shared/hooks/store";
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
  const generationCardListStyle = GenerationCardListStyle(size);

  return (
    <View style={generationCardListStyle.ListHeaderContainer}>
      <ScreenSection
        description="Genera tus recursos educativos aquí. Puedes generar varios recursos simultáneamente ahora mismo!. Toca el botón de abajo y comienza ahora."
        title="Generar recurso"
        icon="bulb-outline"
      />
      <Input<{ searchValue: string }>
        name="searchValue"
        value={searchValue}
        icon="search-outline"
        placeholder="Buscar generaciones por titulo"
        onChange={(_, value) => handleSearchChange(value)}
        onClearInput={onClearSearchInput}
      />
    </View>
  );
};

export default GenerationListHeader;
