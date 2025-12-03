import { useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "expo-sqlite/kv-store";

import { EmailUpdatePayload, UserStats } from "../../types";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useAuthStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

import { patchUserEmail } from "../../services";

const useUpdateEmailMutation = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: async (emailUpdatePayload: EmailUpdatePayload) => {
      if (isConnected && token) {
        await patchUserEmail(emailUpdatePayload);
      }
    },
    onMutate: async (emailUpdatePayload: EmailUpdatePayload) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUserStats = queryClient.getQueryData<UserStats>([
        "user_profile",
      ]);

      // Actualizar cache de manera optimista
      if (previousUserStats) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUserStats,
          email: emailUpdatePayload.updatedEmail,
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
    onSuccess: async () => {
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.userUpdatedEmail);

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Correo electrónico actualizado con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdateEmailMutation;
