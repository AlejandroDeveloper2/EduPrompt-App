import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUserOfflineStore } from "../../store";

import { patchUserTokenCoins } from "../../services";

const useUpdateTokenCoinsMutation = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { addLocalTokenCoins, subtractLocalTokenCoins, markAsSynced } =
    useUserOfflineStore(
      useShallow((state) => ({
        addLocalTokenCoins: state.addLocalTokenCoins,
        subtractLocalTokenCoins: state.subtractLocalTokenCoins,
        markAsSynced: state.markAsSynced,
      })),
    );

  return useMutation({
    mutationFn: async (config: {
      amount: number;
      mode: "add" | "substract";
    }) => {
      let updatedTokenAmount: number;

      if (config.mode === "add")
        updatedTokenAmount = addLocalTokenCoins(config.amount, false);
      else updatedTokenAmount = subtractLocalTokenCoins(config.amount, false);

      if (isConnected && isAuthenticated) {
        await patchUserTokenCoins(updatedTokenAmount);
        markAsSynced();
      }
    },

    onMutate: async ({ amount }) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUser = queryClient.getQueryData<{
        tokenCoins: number;
      }>(["user_profile"]);

      // Actualizar cache de manera optimista
      if (previousUser) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUser,
          tokenCoins: amount,
        });
      }

      // Retornar el contexto para rollback en caso de error
      return { previousUser };
    },
    onError: (_error, _newConfig, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user_profile"], context.previousUser);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdateTokenCoinsMutation;
