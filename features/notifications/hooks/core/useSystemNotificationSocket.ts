import { useQueryClient } from "@tanstack/react-query";
import { scheduleNotificationAsync } from "expo-notifications";
import { useEffect } from "react";

import { getSocketClient } from "@/core/config/socketClient";

import { useEventbusValue } from "@/shared/hooks/events";

import { Order, SystemNotification } from "../../types";

const useSystemNotificationSocket = (filters: Order) => {
  const queryClient = useQueryClient();
  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const notificationsPushAvailable = userProfile
    ? userProfile.userPreferences.pushNotifications
    : false;

  const sendPushNotification = async (title: string, message: string) => {
    await scheduleNotificationAsync({
      content: {
        title,
        body: message,
      },
      trigger: null,
    });
  };

  useEffect(() => {
    const socket = getSocketClient();

    /** Nueva notificación */
    socket.on("notifications:new", (newNotification: SystemNotification) => {
      queryClient.invalidateQueries({
        queryKey: ["system_notifications"],
        exact: false,
      });
      if (!notificationsPushAvailable) return;
      sendPushNotification(newNotification.title, newNotification.message);
    });

    /** Notificación modificada */
    socket.on(
      "notifications:update",
      (updatedNotification: SystemNotification) => {
        queryClient.invalidateQueries({
          queryKey: ["system_notifications"],
          exact: false,
        });
        if (!notificationsPushAvailable) return;
        sendPushNotification(
          updatedNotification.title,
          updatedNotification.message
        );
      }
    );

    /** Notificaciones eliminadas */
    socket.on(
      "notifications:deleteMany",
      (_deletedNotificationIds: string[]) => {
        queryClient.invalidateQueries({
          queryKey: ["system_notifications"],
          exact: false,
        });
      }
    );

    return () => {
      socket.off("notifications:new");
      socket.off("notifications:update");
      socket.off("notifications:deleteMany");
    };
  }, [queryClient, notificationsPushAvailable, filters]);
};

export default useSystemNotificationSocket;
