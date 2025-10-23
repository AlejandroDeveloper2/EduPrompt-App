import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SystemNotification } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";

import { getSessionToken } from "@/shared/utils";
import { patchNotificationsReadStatus } from "../../services";

const useMarkAsReadNotifications = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  return useMutation({
    mutationFn: async (notificationsIds: string[]) => {
      const token = getSessionToken();
      if (isConnected && token) {
        await patchNotificationsReadStatus(notificationsIds);
      }
    },
    onMutate: async (notificationsIds: string[]) => {
      await queryClient.cancelQueries({
        queryKey: ["system_notifications"],
        exact: false,
      });

      // Obtener el estado actual
      const previousNotifications = queryClient.getQueryData<
        SystemNotification[]
      >(["system_notifications"]);

      // Actualizar cache de manera optimista
      if (previousNotifications) {
        const updatedNotifications = notificationsIds.map(
          (notificationId, i) => {
            if (notificationId === previousNotifications[i].notificationId)
              return { ...previousNotifications[i], read: true };
            return previousNotifications[i];
          }
        );
        queryClient.setQueryData<SystemNotification[]>(
          ["system_notifications"],
          updatedNotifications
        );
      }

      // Retornar el contexto para rollback en caso de error
      return { previousNotifications };
    },
    onError: (error, _updatedNotifications, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["system_notifications"],
          context.previousNotifications
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["system_notifications"],
        exact: false,
      });
    },
  });
};

export default useMarkAsReadNotifications;
