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
} from "@/shared/hooks/core";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";
import {
  useFilesSelectionStore,
  useFilesStore,
  useFoldersStore,
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
    useFilesSelectionStore();
  const size = useScreenDimensionsStore();
  const { folders, loadFolders, deleteManyFolders, shareManyFolders } =
    useFoldersStore();
  const { moveFiles } = useFilesStore();

  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput(folders, "folderName");

  const { runBackgroundTask } = useBackgroundTaskRunner();

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
        title: "¡Carpetas compartidas!",
        message: "Se han comprimido y compartido tus carpetas exitosamente.",
      },
      errorNotification: {
        title: "¡Error al compartir!",
        message: "Hubo un error al intentar compartir las carpetas.",
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
    toggleLoading(true, "Cargando carpetas...");
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
    /** */
    confirmFolderDeletePopUp,
    /** Move Files */
    moveFiles,
    deleteManyFolders,
  };
};

export default useFolderListLogic;
