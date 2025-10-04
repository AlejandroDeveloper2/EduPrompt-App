import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/lib/context";

import { useCheckNetwork } from "../../core";
import { useUserOfflineStore } from "../../store";

import { generateToastKey, getSessionToken } from "@/lib/helpers";
import { patchUserAccountType } from "@/services/users";

const useUpdateUserAccountType = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const { updateLocalAccountType, markAsSynced } = useUserOfflineStore();

  return useMutation({
    mutationFn: async (isPremiumUser: boolean) => {
      const token = await getSessionToken();
      updateLocalAccountType(isPremiumUser, false);

      if (isConnected && token) {
        await patchUserAccountType(isPremiumUser);
        markAsSynced();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Cuenta de usuario actualizada con éxito",
      });
    },
  });
};

export default useUpdateUserAccountType;
