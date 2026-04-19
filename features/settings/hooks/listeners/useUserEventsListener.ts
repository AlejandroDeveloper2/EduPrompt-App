import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { UserPreferences } from "../../types";

import {
  useUpdatePreferencesMutation,
  useUpdateTokenCoinsMutation,
  useUserSyncMutation,
} from "../mutations";

const useUserEventListener = () => {
  const updateTokenCoinsMutation = useUpdateTokenCoinsMutation();
  const updateMutation = useUpdatePreferencesMutation();
  const syncMutation = useUserSyncMutation();

  useEffect(() => {
    const handleUpdateTokenCoinsRequest = (payload: {
      amount: number;
      mode: "add" | "substract";
    }) => {
      eventBus.emit("userProfile.updateTokeUserCoins.started", undefined);
      updateTokenCoinsMutation.mutate(payload, {
        onSuccess: () => {
          eventBus.emit("userProfile.updateTokeUserCoins.completed", undefined);
        },
        onError: (error) => {
          eventBus.emit("userProfile.updateTokeUserCoins.failed", {
            error: String(error),
          });
        },
      });
    };

    eventBus.on(
      "userProfile.updateTokeUserCoins.requested",
      handleUpdateTokenCoinsRequest,
    );
    return () => {
      eventBus.off(
        "userProfile.updateTokeUserCoins.requested",
        handleUpdateTokenCoinsRequest,
      );
    };
  }, [updateTokenCoinsMutation]);

  useEffect(() => {
    const handleUpdatePreferencesRequest = (
      userPreferences: Partial<UserPreferences>,
    ) => {
      updateMutation.mutate(userPreferences);
    };

    eventBus.on(
      "userProfile.updateUserPreferences.requested",
      handleUpdatePreferencesRequest,
    );
    return () => {
      eventBus.off(
        "userProfile.updateUserPreferences.requested",
        handleUpdatePreferencesRequest,
      );
    };
  }, [updateMutation]);

  useEffect(() => {
    const handler = () => {
      syncMutation.syncUserProfile();
    };
    eventBus.on("userProfile.syncData.requested", handler);
    return () => {
      eventBus.off("userProfile.syncData.requested", handler);
    };
  }, [syncMutation]);
};
export default useUserEventListener;
