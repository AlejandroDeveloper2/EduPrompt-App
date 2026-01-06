/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import uuid from "react-native-uuid";

import { Tab, ViewerType } from "@/core/types";
import { Tag } from "@/features/tags/types";
import { EducationalResource, ResourceFormatKey } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import {
  BACKGROUND_PROCESS_NAMES,
  SELECTION_MODE_ACTIONS,
} from "../../constants";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useBackgroundTaskRunner, useListFilters } from "@/shared/hooks/core";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";
import { useResourcesQuery } from "../queries";
import { useOfflineResourcesStore, useResourcesSelectionStore } from "../store";
import useDeleteManyResources from "./useDeleteManyResources";

import { calcAvarageProcessDuration } from "@/shared/utils";

const useResourceCardListLogic = (defaultResourcePreviewTab: Tab) => {
  const [isTagSelection, setIsTagSelection] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] =
    useState<EducationalResource | null>(null);
  const [activePreviewTab, setActivePreviewTab] = useState<Tab>(
    defaultResourcePreviewTab
  );

  const size = useScreenDimensionsStore();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useResourcesSelectionStore();
  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore();
  const { downloadManyResources } = useOfflineResourcesStore();

  const { runBackgroundTask } = useBackgroundTaskRunner();

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

  const viewerType: ViewerType = useMemo(
    () =>
      selectedResource?.formatKey === "text"
        ? "text"
        : selectedResource?.formatKey === "image"
        ? "image"
        : "table/chart",
    [selectedResource?.formatKey]
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
        SELECTION_MODE_ACTIONS(removeManyResources, () => {
          const processName = BACKGROUND_PROCESS_NAMES.downloadProcess;
          runBackgroundTask(
            {
              processId: uuid.v4(),
              type: "downloading",
              processName,
              progressConfig: {
                mode: "duration-timer",
                limit: calcAvarageProcessDuration(processName) ?? 6000,
              },
              progress: 0,
              state: "in-progress",
              startTime: Date.now(),
            },
            downloadManyResources,
            {
              successNotification: {
                title: "¡Recursos descargados!",
                message: "Tus recursos se han descargado correctamente.",
              },
              errorNotification: {
                title: "¡Error al descargar!",
                message:
                  "No se pudo descargar tus recursos, intentalo de nuevo.",
              },
            }
          );
        })
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
    /** Resources preview popup tabs */
    activePreviewTab,
    setActivePreviewTab,
    /** Preview viewer */
    viewerType,
  };
};

export default useResourceCardListLogic;
