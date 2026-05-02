/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { Order } from "@/core/types";

import { useUserNotificationsStore } from "../../store";

const useNotifications = () => {
  const [filter, setFilter] = useState<Order>("desc");
  const hasInitialized = useRef(false);

  const {
    notifications,
    hasMarkedNotificationsAsRead,
    getAllNotifications,
    markAllNotificationsAsRead,
  } = useUserNotificationsStore(
    useShallow((state) => ({
      notifications: state.notifications,
      hasMarkedNotificationsAsRead: state.hasMarkedNotificationsAsRead,
      getAllNotifications: state.getAllNotifications,
      markAllNotificationsAsRead: state.markAllNotificationsAsRead,
    })),
  );

  useEffect(() => {
    getAllNotifications(filter);
  }, [filter, getAllNotifications]);

  useEffect(() => {
    if (
      !hasInitialized.current &&
      notifications.length > 0 &&
      !hasMarkedNotificationsAsRead
    ) {
      hasInitialized.current = true;
      markAllNotificationsAsRead();
    }
  }, []);

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
