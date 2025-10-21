import { useEffect, useState } from "react";

import { Order } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import { useLoading } from "@/shared/hooks/core";
import { useUserNotificationsStore } from "../store";

const useLoadUserNotifications = () => {
  const [filter, setFilter] = useState<Order>("desc");
  const { isLoading, message, toggleLoading } = useLoading();

  const { notifications, getAllNotifications, removeOneNotification } =
    useUserNotificationsStore();

  const updateFilter = (updatedFilter: Order): void => {
    setFilter(updatedFilter);
  };

  useEffect(() => {
    const loadNotifications = async () => {
      toggleLoading(true, "Cargando notificaciones de usuario...");
      await getAllNotifications(filter);
      eventBus.emit("notifications.userNotifications.updated", notifications);
      toggleLoading(false, null);
    };
    loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

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
