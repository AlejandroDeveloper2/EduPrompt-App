import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { UserStats } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUserOfflineStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { syncData } from "@/shared/utils";
import { putUserStats } from "../../services";

const useUserSyncMutation = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { userStats, markAsSynced } = useUserOfflineStore();

  const mutation = useMutation({
    mutationFn: putUserStats,
    onMutate: async (updatedUserStats) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUserStats = queryClient.getQueryData<UserStats>([
        "user_profile",
      ]);

      // Actualizar cache de manera optimista
      if (previousUserStats) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUserStats,
          ...updatedUserStats,
        });
      }

      // Retornar el contexto para rollback en caso de error
      return { previousUserStats };
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Datos de perfil sincronizados con éxito",
      });
    },
    onError: (error, _newUserStats, context) => {
      if (context?.previousUserStats) {
        queryClient.setQueryData(["user_profile"], context.previousUserStats);
      }
    },
    onSettled: () => {
      markAsSynced();
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });

  useEffect(() => {
    if (userStats.userPreferences.autoSync) {
      syncData(isConnected, isAuthenticated, userStats.sync, () => {
        mutation.mutate(userStats);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isAuthenticated, userStats]);

  const syncUserProfile = useCallback(() => {
    syncData(isConnected, isAuthenticated, userStats.sync, () => {
      mutation.mutate(userStats);
    });
  }, [isAuthenticated, isConnected, mutation, userStats]);

  return {
    ...mutation,
    syncUserProfile,
  };
};

export default useUserSyncMutation;
