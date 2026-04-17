import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { UserPreferences } from "../../types";

import {
  useUpdatePreferencesMutation,
  useUpdateTokenCoinsMutation,
} from "../mutations";

const useUserEventListener = () => {
  const { mutate: mutateTokenCoins } = useUpdateTokenCoinsMutation();
  const { mutate } = useUpdatePreferencesMutation();

  useEffect(() => {
    const handleUpdateTokenCoinsRequest = (payload: {
      amount: number;
      mode: "add" | "substract";
    }) => {
      eventBus.emit("userProfile.updateTokeUserCoins.started", undefined);
      mutateTokenCoins(payload, {
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
  }, [mutateTokenCoins]);

  useEffect(() => {
    const handleUpdatePreferencesRequest = (
      userPreferences: Partial<UserPreferences>,
    ) => {
      mutate(userPreferences);
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
  }, [mutate]);
};
export default useUserEventListener;
