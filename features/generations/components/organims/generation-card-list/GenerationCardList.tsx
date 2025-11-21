import { FlatList } from "react-native";

import { useGenerationsStore } from "@/features/generations/hooks/store";
import { useSearchInput } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Button } from "@/shared/components/molecules";
import { GenerationCard } from "../../molecules";
import GenerationEmpty from "./GenerationEmpty";
import GenerationListHeader from "./GenerationListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { GenerationCardListStyle } from "./GenerationCardList.style";

const GenerationCardList = () => {
  const size = useScreenDimensionsStore();
  const { iaGenerations, createIaGeneration } = useGenerationsStore();
  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput(iaGenerations, "title");

  const generationListStyle = GenerationCardListStyle(size);

  return (
    <FlatList
      style={[generationListStyle.ListContainer, GlobalStyles.PageDimensions]}
      contentContainerStyle={[
        generationListStyle.ListContent,
        GlobalStyles.PageContent,
      ]}
      numColumns={size === "laptop" ? 2 : 1}
      data={filteredElements}
      renderItem={({ item }) => <GenerationCard data={item} />}
      showsVerticalScrollIndicator={false}
      windowSize={5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      keyExtractor={(item) => item.generationId}
      ListHeaderComponent={
        <GenerationListHeader
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
          onClearSearchInput={onClearSearchInput}
        />
      }
      ListEmptyComponent={<GenerationEmpty />}
      ListFooterComponent={
        <Button
          icon="bulb-outline"
          variant="primary"
          label={
            iaGenerations.length > 0
              ? "Generar otro recurso"
              : "Empezar a generar"
          }
          width="100%"
          onPress={createIaGeneration}
        />
      }
    />
  );
};

export default GenerationCardList;
