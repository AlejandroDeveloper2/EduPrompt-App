import { useEffect } from "react";

import { useMarkAsReadNotificationsMutation } from "../mutations";
import { useSystemNotificationsQuery } from "../queries";
import useNotificationListUI from "./useNotificationListUI";

const useSystemNotificationsLogic = () => {
  /** UI */
  const { size, t, lang } = useNotificationListUI();

  /** List System Notifications */
  const {
    data: notifications,
    isLoading,
    filter,
    updateFilter,
  } = useSystemNotificationsQuery();

  /** Mutation */
  const { mutate } = useMarkAsReadNotificationsMutation();

  useEffect(() => {
    if (!notifications) return;
    const notificationsIds = notifications.map((n) => n.notificationId);
    if (notificationsIds.length > 0) mutate(notificationsIds);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  return {
    size,
    t,
    lang,
    notifications,
    isLoading,
    filter,
    updateFilter,
  };
};

export default useSystemNotificationsLogic;
