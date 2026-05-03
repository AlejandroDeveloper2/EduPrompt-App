import { useShallow } from "zustand/react/shallow";

import { useUserNotificationsStore } from "../../store";
import useNotificationListUI from "./useNotificationListUI";
import useNotifications from "./useNotifications";
import useNotificationSelection from "./useNotificationSelection";

const useNotificationListLogic = () => {
  /** Get notifications logic */
  const notificationsLogic = useNotifications();

  /** UI Logic */
  const { t, size, confirmDeleteDialog } = useNotificationListUI();

  /** Selection Logic */
  const { selectedNotificationIds, selectionMode } = useNotificationSelection();

  /** Delete Action */
  const deleteSelectedNotifications = useUserNotificationsStore(
    useShallow((state) => state.deleteSelectedNotifications),
  );

  return {
    t,
    size,
    selectionMode,
    ...notificationsLogic,
    selectedNotificationIds,
    confirmDeleteDialog,
    deleteSelectedNotifications,
  };
};

export default useNotificationListLogic;
