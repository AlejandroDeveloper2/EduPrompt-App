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

  return {
    updateAccountType: (isPremiumUser: boolean): void => {
      /** Actualización offline inmediata */
      updateLocalAccountType(isPremiumUser, false);

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        mutate(isPremiumUser);
        markAsSynced();
      }
    },
  };
};

export default useUpdateAccountType;
