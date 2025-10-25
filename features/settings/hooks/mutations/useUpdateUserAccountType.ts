import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/shared/context";

import { User } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useUserOfflineStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { getSessionToken } from "@/shared/utils";
import { patchUserAccountType } from "../../services";

const useUpdateUserAccountType = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const {
    updateLocalAccountType,
    markAsSynced,
    loadLocalUserStats,
    setUserStats,
  } = useUserOfflineStore();

  return useMutation({
    mutationFn: async (isPremiumUser: boolean) => {
      const token = await getSessionToken();
      updateLocalAccountType(isPremiumUser, false);

      if (isConnected && token) {
        await patchUserAccountType(isPremiumUser);
        markAsSynced();
      }
    },
    onMutate: async (isPremiumUser: boolean) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });
      // Obtener el estado actual
      const previousUser = queryClient.getQueryData<User>(["user_profile"]);

      // Guardamos el estado previo del store offline
      const previousLocalUser = loadLocalUserStats();

      // Actualizar cache de manera optimista
      if (previousUser) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUser,
          isPremiumUser,
        });
      }

      if (previousUser) {
        const { userPreferences, tokenCoins } = previousUser;
        setUserStats({
          userPreferences,
          tokenCoins,
          isPremiumUser,
          sync: false,
        });
      }

      // Retornar el contexto para rollback en caso de error
      return { previousUser, previousLocalUser };
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Cuenta de usuario actualizada con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdateUserAccountType;
