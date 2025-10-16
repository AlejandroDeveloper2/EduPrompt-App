import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useUserOfflineStore } from "../store";

import { generateToastKey, getSessionToken } from "@/shared/helpers";
import { patchUserTokenCoins } from "../../services";

const useUpdateUserTokenCoins = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const {
    userStats,
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
      const token = await getSessionToken();
      if (config.mode === "add") addLocalTokenCoins(config.amount, false);
      else subtractLocalTokenCoins(config.amount, false);

      if (isConnected && token) {
        await patchUserTokenCoins(userStats.tokenCoins);
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

      // También actualizamos el store offline instantáneamente
      if (config.mode === "add") addLocalTokenCoins(config.amount, false);
      else subtractLocalTokenCoins(config.amount, false);

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
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Monto de tokens actualizado con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdateUserTokenCoins;
