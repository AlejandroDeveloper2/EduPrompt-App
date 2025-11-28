import { useQuery } from "@tanstack/react-query";

import { eventBus } from "@/core/events/EventBus";
import { EventKey } from "@/core/events/types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useUserOfflineStore } from "../store";

import { getSessionToken } from "@/shared/utils";
import { getUserProfile } from "../../services";

const useUserProfileQuery = () => {
  const { isConnected } = useCheckNetwork();
  const { userStats, setUserStats } = useUserOfflineStore();

  const query = useQuery({
    queryKey: ["user_profile"],
    enabled: isConnected !== null && isConnected !== undefined,
    queryFn: async () => {
      const token = await getSessionToken();
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

  // useEffect(() => {
  //   const handler = () => {
  //     query.refetch();
  //   };

  //   eventBus.on("userProfile.fetch" as EventKey, handler);
  //   return () => {
  //     eventBus.off("userProfile.fetch" as EventKey, handler);
  //   };
  // }, [query]);

  return query;
};

export default useUserProfileQuery;
