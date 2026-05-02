import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import {
  useNotificationsSelectionStore,
  useUserNotificationsStore,
} from "../../store";

const useNotificationSelection = () => {
  const notificationIdsRef = useRef<string[]>([]);

  const selectionStore = useNotificationsSelectionStore(
    useShallow((state) => ({
      selectedNotificationIds: state.selectedNotificationIds,
      selectionMode: state.selectionMode,
      isAllSelected: state.isAllSelected,
      selectionCount: state.selectionCount,
      toggleSelectionMode: state.toggleSelectionMode,
      toggleSelectAll: state.toggleSelectAll,
    })),
  );

  const notifications = useUserNotificationsStore(
    useShallow((state) => state.notifications),
  );

  useEffect(() => {
    notificationIdsRef.current = notifications.map((n) => n.notificationId);
  }, [notifications]);

  return {
    ...selectionStore,
    toggleSelectAll: () => {
      if (selectionStore.isAllSelected) selectionStore.toggleSelectAll([]);
      else selectionStore.toggleSelectAll(notificationIdsRef.current);
    },
  };
};
export default useNotificationSelection;
