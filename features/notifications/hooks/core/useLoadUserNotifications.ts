/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Order } from "../../types";

import { useSelectionModeContext } from "@/shared/hooks/context";
import { useLoading } from "@/shared/hooks/core";
import { useUserNotificationsStore } from "../store";

const useLoadUserNotifications = () => {
  const [filter, setFilter] = useState<Order>("desc");
  const { isLoading, message, toggleLoading } = useLoading();

  const {
    allSelected,
    selectionMode,
    enableAllSelection,
    disableAllSelection,
  } = useSelectionModeContext();

  const {
    notifications,
    getAllNotifications,
    removeOneNotification,
    markAllNotificationsAsRead,
    clearSelectionList,
    selectAllNotifications,
  } = useUserNotificationsStore();

  const updateFilter = (updatedFilter: Order): void => {
    setFilter(updatedFilter);
  };

  useEffect(() => {
    const loadNotifications = () => {
      toggleLoading(true, "Cargando notificaciones de usuario...");
      getAllNotifications(filter);
      toggleLoading(false, null);
    };
    loadNotifications();
  }, [filter]);

  useEffect(() => {
    if (notifications.length > 0) markAllNotificationsAsRead();
  }, [notifications.length]);

  useEffect(() => {
    if (!selectionMode) clearSelectionList();
  }, [selectionMode]);

  useEffect(() => {
    if (allSelected) selectAllNotifications();
    else if (!allSelected && notifications.every((n) => n.isSelected))
      clearSelectionList();
  }, [allSelected]);

  useEffect(() => {
    if (notifications.every((n) => n.isSelected)) enableAllSelection();
    else disableAllSelection();
  }, [notifications]);

  return {
    isLoading,
    loadingMessage: message,
    notifications,
    filter,
    updateFilter,
    removeOneNotification,
  };
};

export default useLoadUserNotifications;
