/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";

import { Tag } from "@/features/tags/types";
import { Prompt } from "../../types";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { eventBus } from "@/core/events/EventBus";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useListFilters } from "@/shared/hooks/core";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";
import { usePromptsQuery } from "../queries";
import { usePromptsSelectionStore } from "../store";
import useDeleteManyPrompts from "./useDeleteManyPrompts";

const usePromptCardListLogic = () => {
  const [isTagSelection, setIsTagSelection] = useState<boolean>(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const size = useScreenDimensionsStore();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    usePromptsSelectionStore();
  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore();

  const {
    searchValue,
    selectedFilter,
    handleSearchChange,
    onClearSearchInput,
    onFilterChange,
  } = useListFilters<Tag | null>(null);

  const updatePromptPopUp = useAnimatedPopUp();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = usePromptsQuery(
    { title: searchValue, tag: selectedFilter?.tagId },
    { limit: 10 }
  );

  const { removeManyPrompts } = useDeleteManyPrompts();

  const prompts = useMemo(
    () => data?.pages.flatMap((p) => p.records) ?? [],
    [data]
  );

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
      enableSelectionMode(SELECTION_MODE_ACTIONS(removeManyPrompts));
    else disableSelectionMode();
  }, [selectionCount]);

  /** Validamos si el modo selección esta activo */
  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  /** Validamos si todos los elementos estan seleccionados */
  useEffect(() => {
    if (allSelected) selectAll(prompts.map((prompt) => prompt.promptId));
    else if (!allSelected && isAllSelected) clearSelection();
  }, [allSelected]);

  return {
    /** Size */
    size,
    /**Tag selection */
    isTagSelection,
    setIsTagSelection,
    /** Search filters */
    searchValue,
    selectedFilter,
    handleSearchChange,
    onClearSearchInput,
    onFilterChange,
    /** Query */
    prompts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    /** PopUp Controls */
    updatePromptPopUp,
    /** Prompt Id  */
    selectedPrompt,
    setSelectedPrompt,
  };
};

export default usePromptCardListLogic;
