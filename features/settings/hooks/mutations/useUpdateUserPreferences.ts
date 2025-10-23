import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserPreferences } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useUserOfflineStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { getSessionToken } from "@/shared/utils";
import { patchUserPreferences } from "../../services";

const useUpdateUserPreferences = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const { updateLocalUserPreferences, loadLocalUserStats, markAsSynced } =
    useUserOfflineStore();

  return useMutation({
    mutationFn: async (userPreferences: Partial<UserPreferences>) => {
      const token = getSessionToken();
      updateLocalUserPreferences(userPreferences, false);

      if (isConnected && token) {
        await patchUserPreferences(userPreferences);
        markAsSynced();
      }
    },
    onMutate: async (newPreferences: Partial<UserPreferences>) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUser = queryClient.getQueryData<{
        userPreferences: UserPreferences;
      }>(["user_profile"]);

      // Guardamos el estado previo del store offline
      const { userPreferences: previousLocalPreferences } =
        loadLocalUserStats();

      // Actualizar cache de manera optimista
      if (previousUser) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUser,
          userPreferences: {
            ...previousUser.userPreferences,
            ...newPreferences,
          },
        });
      }

      // También actualizamos el store offline instantáneamente
      updateLocalUserPreferences(newPreferences, false);

      // Retornar el contexto para rollback en caso de error
      return { previousUser, previousLocalPreferences };
    },
    onError: (error, _newPreferences, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user_profile"], context.previousUser);
      }

      if (context?.previousLocalPreferences) {
        // Revertir preferencias en el store local
        updateLocalUserPreferences(context.previousLocalPreferences, false);
      }
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Preferencias de usuario actualizadas con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdateUserPreferences;
