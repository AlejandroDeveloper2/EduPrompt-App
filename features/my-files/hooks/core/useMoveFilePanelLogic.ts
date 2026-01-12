/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Order } from "@/core/types";
import { Folder } from "../../types";

import { useLoading, useSearchInput } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";
import { useFilesStore, useFoldersStore, useSharedStore } from "../store";

const useMoveFilePanel = () => {
  const [selectedFolderInfo, setSelectedFolderInfo] = useState<Pick<
    Folder,
    "folderId" | "folderName"
  > | null>(null);
  const [order, setOrder] = useState<Order>("asc");

  const { isLoading, message, toggleLoading } = useLoading();

  const size = useScreenDimensionsStore();
  const { loadFolders } = useFoldersStore();
  const { folders } = useSharedStore();
  const { moveFiles } = useFilesStore();

  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput(folders, "folderName");

  const onChangeOrder = (selectedOrder: Order): void => {
    setOrder(selectedOrder);
  };

  useEffect(() => {
    toggleLoading(true, "Cargando carpetas...");
    loadFolders(order);
    toggleLoading(false, null);
  }, [order]);

  return {
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
    /** Move Files */
    moveFiles,
  };
};

export default useMoveFilePanel;
