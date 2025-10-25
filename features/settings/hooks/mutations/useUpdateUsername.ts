import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserStats } from "../../types";

import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";
import { getSessionToken } from "@/shared/utils";

import { useCheckNetwork } from "@/shared/hooks/core";

import { patchUsername } from "../../services";

const useUpdateUsername = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  return useMutation({
    mutationFn: async (userName: string) => {
      const token = await getSessionToken();
      if (isConnected && token) {
        await patchUsername(userName);
      }
    },
    onMutate: async (newUsername: string) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUserStats = queryClient.getQueryData<UserStats>([
        "user_profile",
      ]);

      // Actualizar cache de manera optimista
      if (previousUserStats) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUserStats,
          userName: newUsername,
        });
      }

      // Retornar el contexto para rollback en caso de error
      return { previousUserStats };
    },
    onError: (error, _newUserStats, context) => {
      if (context?.previousUserStats) {
        queryClient.setQueryData(["user_profile"], context.previousUserStats);
      }
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Nombre de usuario actualizado con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdateUsername;
