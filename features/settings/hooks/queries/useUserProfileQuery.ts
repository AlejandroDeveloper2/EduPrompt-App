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
    queryFn: async () => {
      const token = await getSessionToken();

      if (isConnected && token) {
        const userProfile = await getUserProfile();
        eventBus.emit("userProfile.user.updated" as EventKey, userProfile);
        setUserStats({
          ...userProfile,
          sync: true,
        });
        return { ...userProfile, sync: true };
      } else {
        eventBus.emit("userProfile.user.updated" as EventKey, userStats);
        return userStats;
      }
    },
    staleTime: Infinity,
    // staleTime: 1000 * 60, // cache 1min
    // gcTime: 1000 * 60 * 5,
  });
};

export default useUserProfileQuery;
