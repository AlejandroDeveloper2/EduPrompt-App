/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { Tag, TagType } from "../../types";

import { eventBus } from "@/core/events/EventBus";
import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useSelectionModeStore } from "@/core/store";
import {
  useListFilters,
  usePopUp,
  useResponsive,
  useTranslations,
} from "@/shared/hooks/core";
import { useTagsSelectionStore } from "../../store";
import { useDeleteManyTagsMutation } from "../mutations";
import { useTagsQuery } from "../queries";

const useTagCardListLogic = () => {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

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
    searchValue,
    selectedFilter,
    handleSearchChange,
    onClearSearchInput,
    onFilterChange,
  } = useListFilters<TagType>("resource_tag");

  const updateTagPopUp = usePopUp();
  const confirmTagDeletePopUp = usePopUp();

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

  const { isPending, mutate: removeManyTags } = useDeleteManyTagsMutation();

  const { t } = useTranslations();

  const tags = useMemo(
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
        SELECTION_MODE_ACTIONS(confirmTagDeletePopUp.openPopUp),
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
    selectedTagIds,
    /** Actions */
    isPending,
    removeManyTags,
    /**Translations */
    t,
  };
};

export default useTagCardListLogic;
