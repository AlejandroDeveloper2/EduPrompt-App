/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { FlatList } from "react-native";

import { eventBus } from "@/core/events/EventBus";
import { SELECTION_MODE_ACTIONS } from "@/features/generations/constants";

import {
  useGenerationsSelectionStore,
  useGenerationsStore,
} from "@/features/generations/hooks/store";
import { useSearchInput } from "@/shared/hooks/core";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";

import { Button } from "@/shared/components/molecules";
import { GenerationCard } from "../../molecules";
import GenerationEmpty from "./GenerationEmpty";
import GenerationListHeader from "./GenerationListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { GenerationCardListStyle } from "./GenerationCardList.style";

const GenerationCardList = () => {
  const size = useScreenDimensionsStore();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useGenerationsSelectionStore();
  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore();
  const {
    iaGenerations,
    createIaGeneration,
    deleteSelectedGenerations,
    reinitSelectedGenerations,
  } = useGenerationsStore();

  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput(iaGenerations, "title");

  /** Emitimos el cambio de elementos seleccionados */
  useEffect(() => {
    eventBus.emit("selectionMode.selectedElements.updated", selectionCount);
  }, [selectionCount]);

  /** Emitimos el flag para validar si se ha seleccionado todo */
  useEffect(() => {
    eventBus.emit("selectionMode.isAllSelected.updated", isAllSelected);
  }, [isAllSelected]);

  /** Validamos si hay elementos seleccionados */
  useEffect(() => {
    if (selectionCount > 0)
      enableSelectionMode(
        SELECTION_MODE_ACTIONS(
          deleteSelectedGenerations,
          reinitSelectedGenerations
        )
      );
    else disableSelectionMode();
  }, [selectionCount]);

  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  useEffect(() => {
    if (allSelected) selectAll(iaGenerations.map((g) => g.generationId));
    else if (!allSelected && isAllSelected) clearSelection();
  }, [allSelected]);

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
