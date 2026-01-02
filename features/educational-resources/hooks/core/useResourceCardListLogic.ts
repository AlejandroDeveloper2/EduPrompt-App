/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";

import { Tag } from "@/features/tags/types";
import { EducationalResource, ResourceFormatKey } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useListFilters } from "@/shared/hooks/core";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";
import { useResourcesQuery } from "../queries";
import { useResourcesSelectionStore } from "../store";
import useDeleteManyResources from "./useDeleteManyResources";

const useResourceCardListLogic = () => {
  const [isTagSelection, setIsTagSelection] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] =
    useState<EducationalResource | null>(null);

  const size = useScreenDimensionsStore();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useResourcesSelectionStore();
  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore();

  const {
    searchValue,
    selectedFilter: selectedTagFilter,
    handleSearchChange,
    onClearSearchInput,
    onFilterChange: onTagFilterChange,
  } = useListFilters<Tag | null>(null);

  const {
    selectedFilter: selectedFormatFilter,
    onFilterChange: onFormatFilterChange,
  } = useListFilters<ResourceFormatKey | null>(null);

  const updateResourcePopUp = useAnimatedPopUp();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useResourcesQuery(
    {
      title: searchValue,
      tag: selectedTagFilter?.tagId,
      formatKey: selectedFormatFilter ?? undefined,
    },
    { limit: 10 }
  );

  const { removeManyResources } = useDeleteManyResources();

  const resources = useMemo(
    () => data?.pages.flatMap((r) => r.records) ?? [],
    [data]
  );

  useEffect(() => {
    console.log(error);
  }, [error]);

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
        SELECTION_MODE_ACTIONS(removeManyResources, () => {})
      );
    else disableSelectionMode();
  }, [selectionCount]);

  /** Validamos si el modo selección esta activo */
  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  /** Validamos si todos los elementos estan seleccionados */
  useEffect(() => {
    if (allSelected)
      selectAll(resources.map((resource) => resource.resourceId));
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
    selectedTagFilter,
    selectedFormatFilter,
    handleSearchChange,
    onClearSearchInput,
    onTagFilterChange,
    onFormatFilterChange,
    /** Query */
    resources,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    /** PopUp Controls */
    updateResourcePopUp,
    /** Resource Id  */
    selectedResource,
    setSelectedResource,
  };
};

export default useResourceCardListLogic;
