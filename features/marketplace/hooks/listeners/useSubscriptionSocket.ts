import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { getSocketClient } from "@/core/config/socketClient";

import { Subscription } from "../../types";

const useSubscriptionSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocketClient();

    const subscription = queryClient.getQueryData<Subscription>([
      "subscription",
    ]);

    /** Subscripciones actualizadas */
    socket.on("subscriptions:updated", (subscriptionIds: string[]) => {
      if (!subscription) return;
      const hasSubscriptionChanged: boolean = subscriptionIds.includes(
        subscription.subscriptionId,
      );
      if (hasSubscriptionChanged)
        queryClient.invalidateQueries({
          queryKey: ["subscription"],
          exact: false,
        });
    });

    return () => {
      socket.off("subscriptions:updated");
    };
  }, [queryClient]);
};

export default useSubscriptionSocket;
