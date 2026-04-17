import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserPreferences } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUserOfflineStore } from "../store";

import { patchUserPreferences } from "../../services";

const useUpdatePreferencesMutation = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { updateLocalUserPreferences, markAsSynced } = useUserOfflineStore();

  return useMutation({
    mutationFn: async (payload) => {
      /** Actualización offline inmediata */
      updateLocalUserPreferences(payload, false);

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        await patchUserPreferences(payload);
        markAsSynced();
      }
    },
    onMutate: async (newPreferences: Partial<UserPreferences>) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUser = queryClient.getQueryData<{
        userPreferences: UserPreferences;
      }>(["user_profile"]);

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
      // Retornar el contexto para rollback en caso de error
      return { previousUser };
    },
    onError: (_error, _newPreferences, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(["user_profile"], context.previousUser);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });
};

export default useUpdatePreferencesMutation;
