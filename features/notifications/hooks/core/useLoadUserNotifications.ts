/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { Order } from "@/core/types";

import { eventBus } from "@/core/events/EventBus";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useSelectionModeStore } from "@/core/store";
import { useLoading, usePopUp, useTranslations } from "@/shared/hooks/core";
import {
  useNotificationsSelectionStore,
  useUserNotificationsStore,
} from "../../store";

const useLoadUserNotifications = () => {
  const [filter, setFilter] = useState<Order>("desc");
  const { isLoading, message, toggleLoading } = useLoading();

  const {
    selectionMode,
    allSelected,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeStore(
    useShallow((state) => ({
      selectionMode: state.selectionMode,
      allSelected: state.allSelected,
      enableSelectionMode: state.enableSelectionMode,
      disableSelectionMode: state.disableSelectionMode,
    })),
  );
  const { selectionCount, isAllSelected, clearSelection, selectAll } =
    useNotificationsSelectionStore(
      useShallow((state) => ({
        selectionCount: state.selectionCount,
        isAllSelected: state.isAllSelected,
        clearSelection: state.clearSelection,
        selectAll: state.selectAll,
      })),
    );

  const {
    notifications,
    getAllNotifications,
    markAllNotificationsAsRead,
    deleteSelectedNotifications,
  } = useUserNotificationsStore(
    useShallow((state) => ({
      notifications: state.notifications,
      getAllNotifications: state.getAllNotifications,
      markAllNotificationsAsRead: state.markAllNotificationsAsRead,
      deleteSelectedNotifications: state.deleteSelectedNotifications,
    })),
  );

  const confirmDeletePopUp = usePopUp();

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
      enableSelectionMode(SELECTION_MODE_ACTIONS(confirmDeletePopUp.openPopUp));
    else disableSelectionMode();
  }, [selectionCount]);

  useEffect(() => {
    const loadNotifications = () => {
      toggleLoading(
        true,
        t(
          "notifications_translations.load_notifications_messages.loading_notifications_msg",
        ),
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
