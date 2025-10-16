import { useQuery } from "@tanstack/react-query";

import { eventBus } from "@/core/events/EventBus";

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
        setUserStats({
          ...userProfile,
          sync: true,
        });
        eventBus.emit("userProfile:updated", userProfile);
        return { ...userProfile, sync: true };
      } else {
        eventBus.emit("userProfile:updated", userStats);
        return userStats;
      }
    },
    staleTime: 1000 * 60, // cache 1min
    // gcTime: 1000 * 60 * 5,
  });
};

export default useUserProfileQuery;
