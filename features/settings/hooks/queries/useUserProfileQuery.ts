import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";
import { EventKey } from "@/core/events/types";

import { useSyncDataStore } from "@/core/store";
import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUserOfflineStore } from "../../store";

import { getUserProfile } from "../../services";

const useUserProfileQuery = () => {
  const { isConnected } = useCheckNetwork();
  const loadLocalUserStats = useUserOfflineStore(
    (state) => state.loadLocalUserStats,
  );

  const updateModuleSyncMapState = useSyncDataStore(
    (state) => state.updateModuleSyncMapState,
  );

  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const query = useQuery({
    queryKey: ["user_profile", isAuthenticated],
    enabled: isConnected !== null && isConnected !== undefined,
    queryFn: async () => {
      if (isAuthenticated) {
        const userProfile = await getUserProfile();
        const sync = loadLocalUserStats().sync;

        updateModuleSyncMapState("settings", { isDataSynced: sync });

        return { ...userProfile, sync };
      }

      return loadLocalUserStats();
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
    isFetched: query.isFetched,
  };
};

export default useUserProfileQuery;
