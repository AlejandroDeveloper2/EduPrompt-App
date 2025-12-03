import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { Notification } from "../../types";

import { useEventbusValue } from "@/shared/hooks/events";
import { useUserNotificationsStore } from "../store";

const useUserNotificationsEventListener = () => {
  const { createNotification } = useUserNotificationsStore();

  const userProfile = useEventbusValue("userProfile.user.updated", null);

  useEffect(() => {
    const handleCreateNotificationRequest = (
      newNotification: Omit<Notification, "read">
    ) => {
      eventBus.emit("notifications.createNotification.started", undefined);

      const notificationsPushAvailable = userProfile
        ? userProfile.userPreferences.pushNotifications
        : false;

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
  }, [createNotification, userProfile]);
};

export default useUserNotificationsEventListener;
