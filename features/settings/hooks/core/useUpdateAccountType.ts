import { useCallback } from "react";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdateAccountTypeMutation } from "../mutations";
import { useUserOfflineStore } from "../store";

const useUpdateAccountType = () => {
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { updateLocalAccountType, markAsSynced } = useUserOfflineStore();

  /** Online */
  const { mutate } = useUpdateAccountTypeMutation();

  const updateAccountType = useCallback(
    (isPremiumUser: boolean) => {
      /** Actualización offline inmediata */
      updateLocalAccountType(isPremiumUser, false);

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        mutate(isPremiumUser);
        markAsSynced();
      }
    },
    [isAuthenticated, isConnected, markAsSynced, mutate, updateLocalAccountType]
  );

  return {
    updateAccountType,
  };
};

export default useUpdateAccountType;
