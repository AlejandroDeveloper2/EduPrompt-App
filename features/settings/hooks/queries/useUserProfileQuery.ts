import { useQuery } from "@tanstack/react-query";

import { eventBus } from "@/core/events/EventBus";
import { EventKey } from "@/core/events/types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useUserOfflineStore } from "../store";

import { getSessionToken } from "@/shared/helpers";
import { getUserProfile } from "../../services";

const useUserProfileQuery = () => {
  const { isConnected } = useCheckNetwork();
  const { userStats, setUserStats } = useUserOfflineStore();

  return useQuery({
    queryKey: ["user_profile"],
    enabled: isConnected !== null && isConnected !== undefined,
    queryFn: async () => {
      const token = await getSessionToken();

      if (isConnected && token) {
        console.log("isConnected");
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
};

export default useUserProfileQuery;
