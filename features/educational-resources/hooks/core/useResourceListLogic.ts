/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { eventBus } from "@/core/events/EventBus";
import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useSelectionModeStore } from "@/core/store";
import { usePopUp, useTranslations } from "@/shared/hooks/core";
import {
  useResourceFiltersStore,
  useResourcePreviewStore,
  useResourcesSelectionStore,
} from "../../store";
import { useDeleteManyResourcesMutation } from "../mutations";
import { useResourcesQuery } from "../queries";

const useResourceListLogic = () => {
  const router = useRouter();
  const { t } = useTranslations();

  const { searchResourceValue, formatFilter, tagFilter } =
    useResourceFiltersStore(
      useShallow((state) => ({
        searchResourceValue: state.searchResourceValue,
        formatFilter: state.formatFilter,
        tagFilter: state.tagFilter,
      })),
    );

  const {
    selectionCount,
    isAllSelected,
    clearSelection,
    selectAll,
    selectedResourceIds,
  } = useResourcesSelectionStore(
    useShallow(
      ({
        selectionCount,
        isAllSelected,
        clearSelection,
        selectAll,
        selectedResourceIds,
      }) => ({
        selectionCount,
        isAllSelected,
        clearSelection,
        selectAll,
        selectedResourceIds,
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

  const confirmDeletePopUp = usePopUp();

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

  const { isPending, mutate: removeManyResources } =
    useDeleteManyResourcesMutation();

  const resources = useMemo(
    () => data?.pages.flatMap((r) => r.records) ?? [],
    [data],
  );

  const resourceIdsRef = useRef<string[]>([]);

  useEffect(() => {
    resourceIdsRef.current = resources.map((r) => r.resourceId);
  }, [resources]);

  useEffect(() => {
    eventBus.emit("selectionMode.selectedElements.updated", selectionCount);
  }, [selectionCount]);

  useEffect(() => {
    eventBus.emit("selectionMode.isAllSelected.updated", isAllSelected);
  }, [isAllSelected]);

  useEffect(() => {
    if (selectionCount > 0) {
      enableSelectionMode(
        SELECTION_MODE_ACTIONS(confirmDeletePopUp.openPopUp, () =>
          router.navigate("/(app)/resources_sharing_sheet"),
        ),
      );
    } else {
      disableSelectionMode();
    }
  }, [selectionCount]);

  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  useEffect(() => {
    if (allSelected) {
      selectAll(resourceIdsRef.current);
    } else if (!allSelected && isAllSelected) {
      clearSelection();
    }
  }, [allSelected]);

  const handleViewResource = useCallback(
    (resource: (typeof resources)[number]) => {
      useResourcePreviewStore.getState().setSelectedResource(resource);
      router.navigate("/(app)/update_resource_sheet");
    },
    [router],
  );

  return {
    resources,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    confirmDeletePopUp,
    isPending,
    removeManyResources,
    selectedResourceIds,
    handleViewResource,
    t,
  };
};

export default useResourceListLogic;
