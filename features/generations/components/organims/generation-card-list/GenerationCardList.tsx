/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { FlatList } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";
import { SELECTION_MODE_ACTIONS } from "@/features/generations/constants";

import { useSelectionModeStore } from "@/core/store";
import {
  useGenerationsSelectionStore,
  useResourceGenerationStore,
} from "@/features/generations/store";
import {
  useResponsive,
  useSearchInput,
  useTranslations,
} from "@/shared/hooks/core";

import { Button } from "@/shared/components/molecules";
import { GenerationCard } from "../../molecules";
import GenerationEmpty from "./GenerationEmpty";
import GenerationListHeader from "./GenerationListHeader";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { dynamicStyles } from "./GenerationCardList.style";

const GenerationCardList = () => {
  const size = useResponsive();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useGenerationsSelectionStore(
      useShallow(
        ({ selectionCount, isAllSelected, clearSelection, selectAll }) => ({
          selectionCount,
          isAllSelected,
          clearSelection,
          selectAll,
        }),
      ),
    );
  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore(
    useShallow(
      ({
        selectionMode,
        allSelected,
        enableSelectionMode,
        disableSelectionMode,
      }) => ({
        selectionMode,
        allSelected,
        enableSelectionMode,
        disableSelectionMode,
      }),
    ),
  );
  const {
    iaGenerations,
    createIaGeneration,
    deleteSelectedGenerations,
    reinitSelectedGenerations,
  } = useResourceGenerationStore(
    useShallow((state) => ({
      iaGenerations: state.iaGenerations,
      createIaGeneration: state.createIaGeneration,
      deleteSelectedGenerations: state.deleteSelectedGenerations,
      reinitSelectedGenerations: state.reinitSelectedGenerations,
    })),
  );

  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput(iaGenerations, "title");

  const { t } = useTranslations();

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
          reinitSelectedGenerations,
        ),
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

  const styles = dynamicStyles(size);

  return (
    <FlatList
      style={[styles.ListContainer, GlobalStyles.PageDimensions]}
      contentContainerStyle={[styles.ListContent, GlobalStyles.PageContent]}
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
