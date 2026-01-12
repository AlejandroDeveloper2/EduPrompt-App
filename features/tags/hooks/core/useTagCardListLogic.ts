/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";

import { Tag, TagType } from "../../types";

import { eventBus } from "@/core/events/EventBus";
import { SELECTION_MODE_ACTIONS } from "../../constants";

import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";
import { useTagsSelectionStore } from "../store";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useListFilters } from "@/shared/hooks/core";
import { useTagsQuery } from "../queries";
import useDeleteManyTags from "./useDeleteManyTags";

const useTagCardListLogic = () => {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const size = useScreenDimensionsStore();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useTagsSelectionStore();
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
  } = useListFilters<TagType>("resource_tag");

  const updateTagPopUp = useAnimatedPopUp();
  const confirmTagDeletePopUp = useAnimatedPopUp();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useTagsQuery({ name: searchValue, type: selectedFilter }, { limit: 10 });

  const { isPending, removeManyTags } = useDeleteManyTags();

  const tags = useMemo(
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
      enableSelectionMode(
        SELECTION_MODE_ACTIONS(confirmTagDeletePopUp.onOpenPopUp)
      );
    else disableSelectionMode();
  }, [selectionCount]);

  /** Validamos si el modo selección esta activo */
  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  /** Validamos si todos los elementos estan seleccionados */
  useEffect(() => {
    if (allSelected) selectAll(tags.map((tag) => tag.tagId));
    else if (!allSelected && isAllSelected) clearSelection();
  }, [allSelected]);

  return {
    /** Size */
    size,
    /** Search filters */
    searchValue,
    selectedFilter,
    handleSearchChange,
    onClearSearchInput,
    onFilterChange,
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
    updateTagPopUp,
    confirmTagDeletePopUp,
    /** Tag Id  */
    selectedTag,
    setSelectedTag,
    /** Actions */
    isPending,
    removeManyTags,
  };
};

export default useTagCardListLogic;
