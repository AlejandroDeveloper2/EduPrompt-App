import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";
import { EventKey } from "@/core/events/types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUserOfflineStore } from "../store";

import { getUserProfile } from "../../services";

const useUserProfileQuery = () => {
  const { isConnected } = useCheckNetwork();
  const { setUserStats, loadLocalUserStats } = useUserOfflineStore();

  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const query = useQuery({
    queryKey: ["user_profile"],
    enabled:
      isConnected !== null && isConnected !== undefined && isAuthenticated,
    queryFn: async () => {
      const userProfile = await getUserProfile();
      setUserStats({
        ...userProfile,
        sync: true,
      });
      return { ...userProfile, sync: true };
    },
    staleTime: Infinity,
    // gcTime: 1000 * 60 * 5,
  });

  const localProfile = loadLocalUserStats();

  useEffect(() => {
    if (query.data) {
      eventBus.emit("userProfile.user.updated" as EventKey, query.data);
    }
  }, [query.data]);

  useEffect(() => {
    if (!query.data && localProfile) {
      eventBus.emit("userProfile.user.updated" as EventKey, localProfile);
    }
  }, [query.data, localProfile]);

  return {
    userProfile: query.data ?? localProfile,
    isLoading: query.isLoading,
  };
};

export default useUserProfileQuery;
