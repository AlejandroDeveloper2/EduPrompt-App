/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";

import { Order, Process } from "@/core/types";
import { Folder } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import {
  BACKGROUND_PROCESS_NAMES,
  SELECTION_MODE_ACTIONS,
} from "../../constants";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import {
  useBackgroundTaskRunner,
  useLoading,
  useSearchInput,
  useTranslations,
} from "@/shared/hooks/core";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";
import {
  useFoldersSelectionStore,
  useFoldersStore,
  useSharedStore,
} from "../store";

import { calcAvarageProcessDuration } from "@/shared/utils";

const useFolderListLogic = () => {
  const [selectedFolderInfo, setSelectedFolderInfo] = useState<Pick<
    Folder,
    "folderId" | "folderName"
  > | null>(null);
  const [order, setOrder] = useState<Order>("asc");
  const router = useRouter();

  const { isLoading, message, toggleLoading } = useLoading();
  const editFolderNamePopUp = useAnimatedPopUp();
  const confirmFolderDeletePopUp = useAnimatedPopUp();

  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useFoldersSelectionStore();
  const size = useScreenDimensionsStore();
  const { loadFolders, deleteManyFolders, shareManyFolders } =
    useFoldersStore();
  const { folders } = useSharedStore();

  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput(folders, "folderName");

  const { runBackgroundTask } = useBackgroundTaskRunner();

  const { t } = useTranslations();

  const onChangeOrder = (selectedOrder: Order): void => {
    setOrder(selectedOrder);
  };

  const runShareFoldersTask = async (): Promise<void> => {
    const processName = BACKGROUND_PROCESS_NAMES.sharingFoldersProcess;
    const task: Process = {
      processId: uuid.v4(),
      type: "sharing",
      processName,
      progressConfig: {
        mode: "duration-timer",
        limit: calcAvarageProcessDuration(processName) ?? 6000,
      },
      progress: 0,
      state: "in-progress",
      startTime: Date.now(),
    };
    await runBackgroundTask(task, shareManyFolders, {
      successNotification: {
        title: t(
          "my-files-translations.shared-folders-notifications-labels.success.title"
        ),
        message: t(
          "my-files-translations.shared-folders-notifications-labels.success.message"
        ),
      },
      errorNotification: {
        title: t(
          "my-files-translations.shared-folders-notifications-labels.error.title"
        ),
        message: t(
          "my-files-translations.shared-folders-notifications-labels.error.message"
        ),
      },
    });
  };

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
          confirmFolderDeletePopUp.onOpenPopUp,
          runShareFoldersTask
        )
      );
    else disableSelectionMode();
  }, [selectionCount]);

  useEffect(() => {
    toggleLoading(
      true,
      t("my-files-translations.folder-list-labels.loading-folders-msg")
    );
    loadFolders(order);
    toggleLoading(false, null);
  }, [order]);

  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  useEffect(() => {
    if (allSelected) selectAll(filteredElements.map((f) => f.folderId));
    else if (!allSelected && isAllSelected) clearSelection();
  }, [allSelected]);

  return {
    /** Router */
    router,
    /** Size */
    size,
    /** Filters */
    order,
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
    onChangeOrder,
    /** Loading */
    isLoading,
    loadingMessage: message,
    /** Folder Info*/
    selectedFolderInfo,
    setSelectedFolderInfo,
    /** Edit Folder name pop up */
    editFolderNamePopUp,
    /**  Actions*/
    confirmFolderDeletePopUp,
    deleteManyFolders,
    t,
  };
};

export default useFolderListLogic;
