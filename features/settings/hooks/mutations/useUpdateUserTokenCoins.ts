import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUserOfflineStore } from "../store";

import { patchUserTokenCoins } from "../../services";

const useUpdateUserTokenCoins = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();
  const { token } = useEventbusValue("auth.tokens.getted", {
    token: null,
    refreshToken: null,
  });

  const {
    addLocalTokenCoins,
    subtractLocalTokenCoins,
    setUserStats,
    loadLocalUserStats,
    markAsSynced,
  } = useUserOfflineStore();

  return useMutation({
    mutationFn: async (config: {
      amount: number;
      mode: "add" | "substract";
    }) => {
      let updatedTokenAmount: number;

      if (config.mode === "add")
        updatedTokenAmount = addLocalTokenCoins(config.amount, false);
      else updatedTokenAmount = subtractLocalTokenCoins(config.amount, false);

      if (isConnected && token) {
        await patchUserTokenCoins(updatedTokenAmount);
        markAsSynced();
      }
    },
    onMutate: async (config: { amount: number; mode: "add" | "substract" }) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUser = queryClient.getQueryData<{
        tokenCoins: number;
      }>(["user_profile"]);

      // Guardamos el estado previo del store offline
      const previousLocalUser = loadLocalUserStats();

      // Actualizar cache de manera optimista
      if (previousUser) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUser,
          tokenCoins:
            config.mode === "add"
              ? previousUser.tokenCoins + config.amount
              : previousUser.tokenCoins - config.amount,
        });
      }

      // Retornar el contexto para rollback en caso de error
      return { previousUser, previousLocalUser };
    },
    onError: (error, _newConfig, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user_profile"], context.previousUser);
      }

      if (context?.previousLocalUser) {
        // Revertir el monto de tokens en el store local
        setUserStats(context.previousLocalUser);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdateUserTokenCoins;
