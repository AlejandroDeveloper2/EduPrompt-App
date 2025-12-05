import { useCallback } from "react";

import { UserPreferences } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdatePreferencesMutation } from "../mutations";
import { useUserOfflineStore } from "../store";

const useUpdatePreferences = () => {
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { updateLocalUserPreferences, markAsSynced } = useUserOfflineStore();

  /** Online */
  const { mutate } = useUpdatePreferencesMutation();

  const updatePreferences = useCallback(
    (userPreferences: Partial<UserPreferences>) => {
      /** Actualización offline inmediata */
      updateLocalUserPreferences(userPreferences, false);

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        mutate(userPreferences);
        markAsSynced();
      }
    },
    [
      isAuthenticated,
      isConnected,
      markAsSynced,
      mutate,
      updateLocalUserPreferences,
    ]
  );

  return {
    updatePreferences,
  };
};

export default useUpdatePreferences;
