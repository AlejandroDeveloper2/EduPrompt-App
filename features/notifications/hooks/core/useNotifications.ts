/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { Order } from "@/core/types";

import { useUserNotificationsStore } from "../../store";

const useNotifications = () => {
  const [filter, setFilter] = useState<Order>("desc");

  const { notifications, getAllNotifications, markAllNotificationsAsRead } =
    useUserNotificationsStore(
      useShallow((state) => ({
        notifications: state.notifications,
        getAllNotifications: state.getAllNotifications,
        markAllNotificationsAsRead: state.markAllNotificationsAsRead,
      })),
    );

  useEffect(() => {
    getAllNotifications(filter);
  }, [filter]);

  useEffect(() => {
    if (notifications.length > 0) markAllNotificationsAsRead();
  }, [notifications]);

  const updateFilter = useCallback((updatedFilter: Order): void => {
    setFilter(updatedFilter);
  }, []);

  return {
    notifications,
    filter,
    updateFilter,
  };
};

export default useNotifications;
