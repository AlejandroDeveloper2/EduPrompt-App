import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { User, UserStats } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
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

  const { t } = useTranslations();

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
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "settings_translations.module_success_messages.user_profile_synced_msg",
        ),
      });
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

    const syncedUserStats: User = {
      ...onlineUserStats,
      tokenCoins: userStats.tokenCoins + onlineUserStats.tokenCoins,
    };

    syncData(isConnected, isAuthenticated, userStats.sync, () => {
      mutation.mutate(syncedUserStats);
    });
  }, [isAuthenticated, isConnected, mutation, userStats, queryClient]);

  useEffect(() => {
    if (userStats.userPreferences.autoSync) {
      syncUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isAuthenticated, userStats]);

  return {
    ...mutation,
    syncUserProfile,
  };
};

export default useUserSyncMutation;
