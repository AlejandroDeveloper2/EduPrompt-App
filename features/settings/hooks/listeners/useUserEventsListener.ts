import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { UserPreferences } from "../../types";
import {
  useUpdateAccountType,
  useUpdatePreferences,
  useUpdateTokenCoins,
} from "../core";

const useUserEventListener = () => {
  const { updatePreferences } = useUpdatePreferences();
  const { updateTokenCoins } = useUpdateTokenCoins();
  const { updateAccountType } = useUpdateAccountType();

  useEffect(() => {
    const handleUpdatePreferencesRequest = (
      userPreferences: Partial<UserPreferences>
    ) => {
      updatePreferences(userPreferences);
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
  }, [updatePreferences]);

  useEffect(() => {
    const handleUpdateTokenCoinsRequest = (payload: {
      amount: number;
      mode: "add" | "substract";
    }) => {
      updateTokenCoins(payload);
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
  }, [updateTokenCoins]);

  useEffect(() => {
    const handleUpdateAccountTypeRequest = (isPremiumUser: boolean) => {
      updateAccountType(isPremiumUser);
    };

    eventBus.on(
      "userProfile.updateAcoountType.requested",
      handleUpdateAccountTypeRequest
    );
    return () => {
      eventBus.off(
        "userProfile.updateAcoountType.requested",
        handleUpdateAccountTypeRequest
      );
    };
  }, [updateAccountType]);
};
export default useUserEventListener;
