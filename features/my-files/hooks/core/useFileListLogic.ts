/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons } from "@expo/vector-icons";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";

import { Process } from "@/core/types";
import { DownloadedFile, ResourceFormatKey } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import {
  BACKGROUND_PROCESS_NAMES,
  FILE_SELECTION_MODE_ACTIONS,
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
import { useFilesSelectionStore, useFilesStore } from "../store";

import { calcAvarageProcessDuration } from "@/shared/utils";

const useFileListLogic = () => {
  const [selectedFileInfo, setSelectedFileInfo] = useState<Pick<
    DownloadedFile,
    "fileId" | "name"
  > | null>(null);
  const [format, setFormat] = useState<ResourceFormatKey | null>(null);

  const params = useSearchParams();

  const folderId = params.get("folderName") as string;

  const { isLoading, message, toggleLoading } = useLoading();

  const editFileNamePopUp = useAnimatedPopUp();
  const moveFilesPopUp = useAnimatedPopUp();
  const confirmFileDeletePopUp = useAnimatedPopUp();

  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useFilesSelectionStore();
  const size = useScreenDimensionsStore();
  const { folder, loadFilesByFormat, deleteManyFiles, shareManyFiles } =
    useFilesStore();

  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput(folder?.files ?? ([] as DownloadedFile[]), "name");

  const { runBackgroundTask } = useBackgroundTaskRunner();

  const onChangeFormat = (selectedFormat: ResourceFormatKey | null): void => {
    setFormat(selectedFormat);
  };

  const runShareFilesTask = async (): Promise<void> => {
    const processName = BACKGROUND_PROCESS_NAMES.sharingFilesProcess;
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

    await runBackgroundTask(task, async () => await shareManyFiles(folderId), {
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

  const fileIcon = (format: ResourceFormatKey) => {
    const icons: Record<ResourceFormatKey, keyof typeof Ionicons.glyphMap> = {
      chart: "bar-chart-outline",
      image: "image-outline",
      text: "text-outline",
      table: "grid-outline",
    };
    return icons[format];
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
        FILE_SELECTION_MODE_ACTIONS(
          confirmFileDeletePopUp.onOpenPopUp,
          runShareFilesTask,
          moveFilesPopUp.onOpenPopUp
        )
      );
    else disableSelectionMode();
  }, [selectionCount]);

  useEffect(() => {
    toggleLoading(true, "Cargando archivos...");
    loadFilesByFormat(folderId, format ?? undefined);
    toggleLoading(false, null);
  }, [format, folderId]);

  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  useEffect(() => {
    if (allSelected) selectAll(filteredElements.map((f) => f.fileId));
    else if (!allSelected && isAllSelected) clearSelection();
  }, [allSelected]);

  return {
    /** Size */
    size,
    /** Filters */
    format,
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
    onChangeFormat,
    /** Loading */
    isLoading,
    loadingMessage: message,
    /** File Info*/
    folder,
    folderId,
    selectedFileInfo,
    setSelectedFileInfo,
    /** Pop ups */
    editFileNamePopUp,
    moveFilesPopUp,
    confirmFileDeletePopUp,
    /** Get File Icon */
    fileIcon,
    /** Delete Files */
    deleteManyFiles,
  };
};

export default useFileListLogic;
