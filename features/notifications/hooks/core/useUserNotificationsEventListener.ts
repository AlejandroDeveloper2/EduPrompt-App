import { useEffect, useMemo } from "react";

import { eventBus } from "@/core/events/EventBus";

import { Notification } from "../../types";

import { useEventbusValue } from "@/shared/hooks/events";
import { useUserNotificationsStore } from "../store";

const useUserNotificationsEventListener = () => {
  const { createNotification } = useUserNotificationsStore();

  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const notificationsPushAvailable = useMemo(() => {
    if (!userProfile) return false;
    if (!userProfile.userPreferences) return false;
    if (!userProfile.userPreferences.pushNotifications) return false;
    return true;
  }, [userProfile]);

  useEffect(() => {
    const handleCreateNotificationRequest = (
      newNotification: Omit<Notification, "read">
    ) => {
      eventBus.emit("notifications.createNotification.started", undefined);

      createNotification(newNotification, notificationsPushAvailable)
        .then(() =>
          eventBus.emit("notifications.createNotification.completed", undefined)
        )
        .catch(() =>
          eventBus.emit("notifications.createNotification.failed", {
            error: "Error al crear la notificación",
          })
        );
    };

    eventBus.on(
      "notifications.createNotification.requested",
      handleCreateNotificationRequest
    );
    return () => {
      eventBus.off(
        "notifications.createNotification.requested",
        handleCreateNotificationRequest
      );
    };
  }, [createNotification, notificationsPushAvailable]);
};

export default useUserNotificationsEventListener;
