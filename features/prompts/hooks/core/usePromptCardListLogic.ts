/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { Prompt } from "../../types";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { eventBus } from "@/core/events/EventBus";

import { useSelectionModeStore } from "@/core/store";
import { usePopUp, useResponsive, useTranslations } from "@/shared/hooks/core";
import { usePromptsSelectionStore } from "../../store";
import { usePromptFiltersContext } from "../context";
import { useDeleteManyPromptsMutation } from "../mutations";
import { usePromptsQuery } from "../queries";

const usePromptCardListLogic = () => {
  const [isTagSelection, setIsTagSelection] = useState<boolean>(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const size = useResponsive();
  const {
    selectionCount,
    isAllSelected,
    clearSelection,
    selectAll,
    selectedPromptIds,
  } = usePromptsSelectionStore(
    useShallow((state) => ({
      selectionCount: state.selectionCount,
      isAllSelected: state.isAllSelected,
      clearSelection: state.clearSelection,
      selectAll: state.selectAll,
      selectedPromptIds: state.selectedPromptIds,
    })),
  );
  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore(
    useShallow((state) => ({
      selectionMode: state.selectionMode,
      allSelected: state.allSelected,
      enableSelectionMode: state.enableSelectionMode,
      disableSelectionMode: state.disableSelectionMode,
    })),
  );

  const {
    searchPromptValue,
    searchTagValue,
    tagFilter,
    paginatedTags,
    onSearchTagValueChange,
  } = usePromptFiltersContext();

  const confirmPromptDeletePopUp = usePopUp();
  const updatePromptPopUp = usePopUp();

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
    { title: searchPromptValue, tag: tagFilter?.tagId },
    { limit: 10 },
  );

  const { isPending, mutate: removeManyPrompts } =
    useDeleteManyPromptsMutation();

  const { t } = useTranslations();

  const prompts = useMemo(
    () => data?.pages.flatMap((p) => p.records) ?? [],
    [data],
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
      enableSelectionMode(
        SELECTION_MODE_ACTIONS(confirmPromptDeletePopUp.openPopUp),
      );
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
    searchTagValue,
    paginatedTags,
    onSearchTagValueChange,
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
    confirmPromptDeletePopUp,
    /** Prompt Id  */
    selectedPrompt,
    setSelectedPrompt,
    /** Actions */
    isPending,
    removeManyPrompts,
    /** Translations */
    t,
    selectedPromptIds,
  };
};

export default usePromptCardListLogic;
