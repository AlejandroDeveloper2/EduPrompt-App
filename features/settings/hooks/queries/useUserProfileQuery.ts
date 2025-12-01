import { useQuery } from "@tanstack/react-query";

import { eventBus } from "@/core/events/EventBus";
import { EventKey } from "@/core/events/types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUserOfflineStore } from "../store";

import { getUserProfile } from "../../services";

const useUserProfileQuery = () => {
  const { isConnected } = useCheckNetwork();
  const { userStats, setUserStats } = useUserOfflineStore();

  const { token } = useEventbusValue("auth.tokens.getted", {
    token: null,
    refreshToken: null,
  });

  const query = useQuery({
    queryKey: ["user_profile"],
    enabled: isConnected !== null && isConnected !== undefined,
    queryFn: async () => {
      if (isConnected && token) {
        const userProfile = await getUserProfile();
        setUserStats({
          ...userProfile,
          sync: true,
        });
        eventBus.emit("userProfile.user.updated" as EventKey, userProfile);
        return { ...userProfile, sync: true };
      } else {
        eventBus.emit("userProfile.user.updated" as EventKey, userStats);
        return userStats;
      }
    },
    staleTime: Infinity,
    // gcTime: 1000 * 60 * 5,
  });

  return query;
};

export default useUserProfileQuery;
