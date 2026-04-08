/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";

import { Tab, ViewerType } from "@/core/types";
import { EducationalResource } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import { RESOURCE_PREVIEW_TABS } from "../../components/organims/preview-resource-list/constants";
import { SELECTION_MODE_ACTIONS } from "../../constants";

import { usePopUp, useTranslations } from "@/shared/hooks/core";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";
import { useResourcesFiltersContext } from "../context";
import { useResourcesQuery } from "../queries";
import { useResourcesSelectionStore } from "../store";
import useDeleteManyResources from "./useDeleteManyResources";

const useResourceCardListLogic = () => {
  const { t } = useTranslations();
  const resourcePreviewTabs = useMemo(() => RESOURCE_PREVIEW_TABS(t), [t]);

  const [isTagSelection, setIsTagSelection] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] =
    useState<EducationalResource | null>(null);
  const [activePreviewTab, setActivePreviewTab] = useState<Tab>(
    resourcePreviewTabs[0],
  );

  const [sharingSteps] = useState<{ stepId: string }[]>([
    { stepId: "step1" },
    { stepId: "step2" },
  ]);

  const [currentSharingStep, setCurrentSharingStep] = useState<{
    stepId: string;
  }>({ stepId: "step1" });

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
    searchResourceValue,
    searchTagValue,
    formatFilter,
    tagFilter,
    paginatedTags,
    onSearchTagValueChange,
  } = useResourcesFiltersContext();

  const updateResourcePopUp = usePopUp();
  const confirmDeletePopUp = usePopUp();
  const shareResourcePopUp = usePopUp();

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
      title: searchResourceValue,
      tag: tagFilter?.tagId,
      formatKey: formatFilter ?? undefined,
    },
    { limit: 10 },
  );

  const { isPending, removeManyResources } = useDeleteManyResources();

  const resources = useMemo(
    () => data?.pages.flatMap((r) => r.records) ?? [],
    [data],
  );

  const viewerType: ViewerType = useMemo(
    () =>
      selectedResource?.formatKey === "text"
        ? "text"
        : selectedResource?.formatKey === "image"
          ? "image"
          : "table/chart",
    [selectedResource?.formatKey],
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
        SELECTION_MODE_ACTIONS(
          confirmDeletePopUp.openPopUp,
          shareResourcePopUp.openPopUp,
        ),
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
    searchTagValue,
    paginatedTags,
    onSearchTagValueChange,
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
    confirmDeletePopUp,
    shareResourcePopUp,
    /** Resource Id  */
    selectedResource,
    setSelectedResource,
    /** Resources preview popup tabs */
    activePreviewTab,
    setActivePreviewTab,
    /** Preview viewer */
    viewerType,
    /**Actions */
    isPending,
    removeManyResources,
    t,
    resourcePreviewTabs,
    /** Sharing  */
    sharingSteps,
    currentSharingStep,
    setCurrentSharingStep,
  };
};

export default useResourceCardListLogic;
