/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { eventBus } from "@/core/events/EventBus";

import { useSelectionModeStore } from "@/core/store";
import { useAlert, useResponsive, useTranslations } from "@/shared/hooks/core";
import {
  usePromptFiltersStore,
  usePromptsSelectionStore,
  usePromptViewStore,
} from "../../store";
import { useDeleteManyPromptsMutation } from "../mutations";
import { usePromptsQuery } from "../queries";

const usePromptCardListLogic = () => {
  const router = useRouter();
  const size = useResponsive();

  const { searchPromptValue, tagFilter } = usePromptFiltersStore(
    useShallow((state) => ({
      searchPromptValue: state.searchPromptValue,
      tagFilter: state.tagFilter,
    })),
  );

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

  const confirmPromptDeleteDialog = useAlert();

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

  const promptIdsRef = useRef<string[]>([]);

  useEffect(() => {
    promptIdsRef.current = prompts.map((p) => p.promptId);
  }, [prompts]);

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
        SELECTION_MODE_ACTIONS(confirmPromptDeleteDialog.openAlert),
      );
    else disableSelectionMode();
  }, [selectionCount]);

  /** Validamos si el modo selección esta activo */
  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  /** Validamos si todos los elementos estan seleccionados */
  useEffect(() => {
    if (allSelected) selectAll(promptIdsRef.current);
    else if (!allSelected && isAllSelected) clearSelection();
  }, [allSelected]);

  const handleViewPrompt = useCallback(
    (prompt: (typeof prompts)[number]) => {
      usePromptViewStore.getState().setSelectedPrompt(prompt);
      router.navigate("/(app)/update_prompt_sheet");
    },
    [router],
  );

  return {
    size,
    prompts,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    handleViewPrompt,
    confirmPromptDeleteDialog,
    isPending,
    removeManyPrompts,
    t,
    selectedPromptIds,
  };
};

export default usePromptCardListLogic;
