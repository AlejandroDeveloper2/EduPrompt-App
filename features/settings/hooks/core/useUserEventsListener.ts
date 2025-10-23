import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { UserPreferences } from "../../types";

import {
  useUpdateUserPreferences,
  useUpdateUserTokenCoins,
} from "../mutations";

const useUserEventListener = () => {
  const preferencesMutation = useUpdateUserPreferences();
  const tokenAmountMutation = useUpdateUserTokenCoins();

  useEffect(() => {
    const handleUpdatePreferencesRequest = (
      updatedPreferences: Partial<UserPreferences>
    ) => {
      eventBus.emit("userProfile.updateUserPreferences.started", undefined);

      preferencesMutation.mutate(updatedPreferences, {
        onSuccess: () => {
          eventBus.emit(
            "userProfile.updateUserPreferences.completed",
            undefined
          );
        },
        onError: (error) => {
          eventBus.emit("userProfile.updateUserPreferences.failed", {
            error: String(error),
          });
        },
      });
    };

    eventBus.on(
      "userProfile.updateUserPreferences.requested",
      handleUpdatePreferencesRequest
    );
    return () => {
      eventBus.off(
        "userProfile.updateUserPreferences.requested",
        handleUpdatePreferencesRequest
      );
    };
  }, [preferencesMutation]);

  useEffect(() => {
    const handleUpdateTokenCoinsRequest = (payload: {
      amount: number;
      mode: "add" | "substract";
    }) => {
      eventBus.emit("userProfile.updateTokeUserCoins.started", undefined);

      tokenAmountMutation.mutate(payload, {
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
      handleUpdateTokenCoinsRequest
    );
    return () => {
      eventBus.off(
        "userProfile.updateTokeUserCoins.requested",
        handleUpdateTokenCoinsRequest
      );
    };
  }, [tokenAmountMutation]);
};
export default useUserEventListener;
