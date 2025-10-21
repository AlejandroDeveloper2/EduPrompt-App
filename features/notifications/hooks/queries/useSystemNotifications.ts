import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Order, SystemNotification } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useSystemNotificationSocket } from "../core";

import { eventBus } from "@/core/events/EventBus";

import { getNotifications } from "../../services";

const useSystemNotifications = () => {
  const [filter, setFilter] = useState<Order>("desc");

  const { isConnected } = useCheckNetwork();

  const updateFilter = (updatedFilter: Order): void => {
    setFilter(updatedFilter);
  };

  const query = useQuery<SystemNotification[]>({
    queryKey: ["system_notifications", filter],

    enabled: isConnected !== null && isConnected !== undefined,
    queryFn: async () => {
      if (isConnected) {
        const systemNotifications = await getNotifications(filter);
        eventBus.emit(
          "notifications.systemNotifications.updated",
          systemNotifications
        );
        return systemNotifications;
      }
      eventBus.emit("notifications.systemNotifications.updated", []);
      return [];
    },

    staleTime: Infinity,
  });

  /** Notificaciones del sistema en tiempo real */
  useSystemNotificationSocket(filter);

  return { ...query, filter, updateFilter };
};

export default useSystemNotifications;
