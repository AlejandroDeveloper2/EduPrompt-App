/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Order } from "@/core/types";

import { eventBus } from "@/core/events/EventBus";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useLoading, useTranslations } from "@/shared/hooks/core";
import { useSelectionModeStore } from "@/shared/hooks/store";
import {
  useNotificationsSelectionStore,
  useUserNotificationsStore,
} from "../store";

const useLoadUserNotifications = () => {
  const [filter, setFilter] = useState<Order>("desc");
  const { isLoading, message, toggleLoading } = useLoading();

  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore();
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useNotificationsSelectionStore();

  const {
    notifications,
    getAllNotifications,
    markAllNotificationsAsRead,
    deleteSelectedNotifications,
  } = useUserNotificationsStore();

  const confirmDeletePopUp = useAnimatedPopUp();

  const { t } = useTranslations();

  const updateFilter = (updatedFilter: Order): void => {
    setFilter(updatedFilter);
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
        SELECTION_MODE_ACTIONS(confirmDeletePopUp.onOpenPopUp)
      );
    else disableSelectionMode();
  }, [selectionCount]);

  useEffect(() => {
    const loadNotifications = () => {
      toggleLoading(
        true,
        t(
          "notifications-translations.load-notifications-messages.loading-notifications-msg"
        )
      );
      getAllNotifications(filter);
      toggleLoading(false, null);
    };
    loadNotifications();
  }, [filter]);

  useEffect(() => {
    if (notifications.length > 0) markAllNotificationsAsRead();
  }, [notifications.length]);

  useEffect(() => {
    if (!selectionMode) clearSelection();
  }, [selectionMode]);

  useEffect(() => {
    if (allSelected) selectAll(notifications.map((n) => n.notificationId));
    else if (!allSelected && isAllSelected) clearSelection();
  }, [allSelected]);

  return {
    isLoading,
    loadingMessage: message,
    notifications,
    filter,
    updateFilter,
    confirmDeletePopUp,
    deleteSelectedNotifications,
  };
};

export default useLoadUserNotifications;
