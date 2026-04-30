/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";
import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useSelectionModeStore } from "@/core/store";
import { useAlert, useResponsive, useTranslations } from "@/shared/hooks/core";
import {
  useTagFiltersStore,
  useTagsSelectionStore,
  useTagViewStore,
} from "../../store";
import { useDeleteManyTagsMutation } from "../mutations";
import { useTagsQuery } from "../queries";

const useTagCardListLogic = () => {
  const router = useRouter();

  const size = useResponsive();
  const {
    selectionCount,
    isAllSelected,
    clearSelection,
    selectAll,
    selectedTagIds,
  } = useTagsSelectionStore(
    useShallow((state) => ({
      selectionCount: state.selectionCount,
      isAllSelected: state.isAllSelected,
      clearSelection: state.clearSelection,
      selectAll: state.selectAll,
      selectedTagIds: state.selectedTagIds,
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
    searchTagValue,
    tagTypeFilter,
    onSearchTagValueChange,
    onTagTypeFilterChange,
  } = useTagFiltersStore();

  const confirmTagDeleteDialog = useAlert();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useTagsQuery(
    { name: searchTagValue, type: tagTypeFilter },
    { limit: 10 },
  );

  const { isPending, mutate: removeManyTags } = useDeleteManyTagsMutation();

  const { t } = useTranslations();

  const tags = useMemo(
    () => data?.pages.flatMap((p) => p.records) ?? [],
    [data],
  );

  const tagIdsRef = useRef<string[]>([]);

  useEffect(() => {
    tagIdsRef.current = tags.map((t) => t.tagId);
  }, [tags]);

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
        SELECTION_MODE_ACTIONS(confirmTagDeleteDialog.openAlert),
      );
    else disableSelectionMode();
  }, [selectionCount]);

  /** Validamos si el modo selección esta activo */
  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  /** Validamos si todos los elementos estan seleccionados */
  useEffect(() => {
    if (allSelected) selectAll(tagIdsRef.current);
    else if (!allSelected && isAllSelected) clearSelection();
  }, [allSelected]);

  const handleViewTag = useCallback(
    (tag: (typeof tags)[number]) => {
      useTagViewStore.getState().setSelectedResource(tag);
      router.navigate("/(app)/update_tag_sheet");
    },
    [router],
  );

  return {
    /** Size */
    size,
    /** Search filters */
    searchTagValue,
    tagTypeFilter,
    onSearchTagValueChange,
    onTagTypeFilterChange,
    /** Query */
    tags,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    /** PopUp Controls */
    handleViewTag,
    confirmTagDeleteDialog,
    /** Tag Id  */
    selectedTagIds,
    /** Actions */
    isPending,
    removeManyTags,
    /**Translations */
    t,
  };
};

export default useTagCardListLogic;
