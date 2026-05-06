import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

import { UserStats } from "../../types";

import { useUserOfflineStore } from "../../store";
import { useUserProfileQuery } from "../queries";

import { eventBus } from "@/core/events/EventBus";
import { putUserStats } from "../../services";

const useUserSyncMutation = () => {
  const queryClient = useQueryClient();
  const { userProfile: onlineUserStats } = useUserProfileQuery();

  const { userStats, markAsSynced, setUserStats } = useUserOfflineStore(
    useShallow((state) => ({
      userStats: state.userStats,
      markAsSynced: state.markAsSynced,
      setUserStats: state.setUserStats,
    })),
  );

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
    eventBus.emit("userProfile.syncData.started", undefined);

    const syncedUserStats: UserStats = {
      ...onlineUserStats,
      tokenCoins: userStats.tokenCoins + onlineUserStats.tokenCoins,
    };

    /** Actualización offline solo de los campos aplicables*/
    setUserStats({
      sync: false,
      tokenCoins: syncedUserStats.tokenCoins,
      isPremiumUser: false, //En offline no se usa esta propiedad, para usar suscripción premium debe estar autenticado y con conexión a internet
      hasSubscription: false, //En offline no se usa esta propiedad, solo cuando el usuario está autenticado y con conexión a internet
      userPreferences: syncedUserStats.userPreferences,
    });

    mutation.mutate(syncedUserStats, {
      onSuccess: () =>
        eventBus.emit("userProfile.syncData.completed", undefined),
      onError: (error) =>
        eventBus.emit("userProfile.syncData.failed", { error: error.message }),
    });
  }, [onlineUserStats, userStats.tokenCoins, setUserStats, mutation]);

  return {
    ...mutation,
    syncUserProfile,
  };
};

export default useUserSyncMutation;
