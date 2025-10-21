import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { UserPreferences } from "../../types";

import { useUpdateUserPreferences } from "../mutations";

const useUserEventListener = () => {
  const preferencesMutation = useUpdateUserPreferences();

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
};
export default useUserEventListener;
