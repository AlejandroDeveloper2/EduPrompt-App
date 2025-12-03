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

  return {
    updatePreferences: (userPreferences: Partial<UserPreferences>): void => {
      /** Actualización offline inmediata */
      updateLocalUserPreferences(userPreferences, false);

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        mutate(userPreferences);
        markAsSynced();
      }
    },
  };
};
export default useUpdatePreferences;
