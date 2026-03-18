import { useQuery } from "@tanstack/react-query";

import { eventBus } from "@/core/events/EventBus";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";

import { getSubscriptionByUser } from "../../services";

const useSubscriptionByUserQuery = () => {
  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const isAuthenticated = useEventbusValue("auth.authenticated", false);
  const { isConnected } = useCheckNetwork();

  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const subscription = await getSubscriptionByUser();
      eventBus.emit("marketplace.subscription.updated", subscription);
      return subscription;
    },
    enabled:
      isAuthenticated &&
      isConnected !== null &&
      isConnected !== undefined &&
      userProfile !== null &&
      userProfile.hasSubscription,
    staleTime: Infinity,
  });
};

export default useSubscriptionByUserQuery;
