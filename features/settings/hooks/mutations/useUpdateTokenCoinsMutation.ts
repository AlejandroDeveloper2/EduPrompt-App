import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchUserTokenCoins } from "../../services";

const useUpdateTokenCoinsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUserTokenCoins,

    onMutate: async (amount: number) => {
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
    onError: (error, _newConfig, context) => {
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
