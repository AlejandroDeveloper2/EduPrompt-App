import { FlatList } from "react-native";

import { useGenerationListLogic } from "@/features/generations/hooks/core";

import { Button } from "@/shared/components/molecules";
import { GenerationCard } from "../../molecules";
import GenerationEmpty from "./GenerationEmpty";
import GenerationListHeader from "./GenerationListHeader";

import { Spacing } from "@/shared/styles";
import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { dynamicStyles } from "./GenerationCardList.style";

const GenerationCardList = () => {
  const {
    size,
    t,
    selectionMode,
    createIaGeneration,
    searchValue,
    filteredElements: iaGenerations,
    handleSearchChange,
    onClearSearchInput,
  } = useGenerationListLogic();

  const styles = dynamicStyles(size);

  return (
    <FlatList
      style={[styles.ListContainer, GlobalStyles.PageDimensions]}
      contentContainerStyle={[
        styles.ListContent,
        GlobalStyles.PageContent,
        selectionMode && {
          paddingTop: Spacing.spacing_4xl + Spacing.spacing_xl,
        },
      ]}
      numColumns={size === "laptop" ? 2 : 1}
      data={iaGenerations}
      renderItem={({ item }) => (
        <GenerationCard data={item} totalRecords={iaGenerations.length} />
      )}
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
              ? t(
                  "generations_translations.generation_list_labels.btn_generate.label_1",
                )
              : t(
                  "generations_translations.generation_list_labels.btn_generate.label_2",
                )
          }
          width="100%"
          onPress={createIaGeneration}
        />
      }
    />
  );
};

export default GenerationCardList;
