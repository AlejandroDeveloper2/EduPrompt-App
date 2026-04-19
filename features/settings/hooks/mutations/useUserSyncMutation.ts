import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { User, UserStats } from "../../types";

import { useUserOfflineStore } from "../store";

import { eventBus } from "@/core/events/EventBus";
import { putUserStats } from "../../services";

const useUserSyncMutation = () => {
  const queryClient = useQueryClient();

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
      markAsSynced();
    },
    onError: (error, _newUserStats, context) => {
      if (context?.previousUserStats) {
        queryClient.setQueryData(["user_profile"], context.previousUserStats);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });

  const syncUserProfile = useCallback(() => {
    const onlineUserStats = queryClient.getQueryData<User>(["user_profile"]);

    if (!onlineUserStats) return;

    eventBus.emit("userProfile.syncData.started", undefined);

    const syncedUserStats: User = {
      ...onlineUserStats,
      tokenCoins: userStats.tokenCoins + onlineUserStats.tokenCoins,
    };

    mutation.mutate(syncedUserStats, {
      onSuccess: () =>
        eventBus.emit("userProfile.syncData.completed", undefined),
      onError: (error) =>
        eventBus.emit("userProfile.syncData.failed", { error: error.message }),
    });
  }, [mutation, userStats, queryClient]);

  return {
    ...mutation,
    syncUserProfile,
  };
};

export default useUserSyncMutation;
