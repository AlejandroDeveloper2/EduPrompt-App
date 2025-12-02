/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { UserStats } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUserOfflineStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { syncData } from "@/shared/utils";
import { putUserStats } from "../../services";

const useUserSync = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();
  const { token } = useEventbusValue("auth.tokens.getted", {
    token: null,
    refreshToken: null,
  });

  const { userStats, markAsSynced, loadLocalUserStats, setUserStats } =
    useUserOfflineStore();

  const mutation = useMutation({
    mutationFn: async (updatedUserStats: UserStats) => {
      const { tokenCoins, isPremiumUser, userPreferences } = updatedUserStats;
      await putUserStats({ tokenCoins, isPremiumUser, userPreferences });
    },

    onSuccess: async () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Datos de perfil sincronizados con éxito",
      });
    },
    onMutate: async (updatedUserStats: UserStats) => {
      await queryClient.cancelQueries({ queryKey: ["user_profile"] });

      // Obtener el estado actual
      const previousUserStats = queryClient.getQueryData<UserStats>([
        "user_profile",
      ]);

      // Guardamos el estado previo del store offline
      const previousLocalStats = loadLocalUserStats();

      // Actualizar cache de manera optimista
      if (previousUserStats) {
        queryClient.setQueryData(["user_profile"], {
          ...previousUserStats,
          ...updatedUserStats,
        });
      }

      // También actualizamos el store offline instantáneamente
      setUserStats({ ...updatedUserStats, sync: false });

      // Retornar el contexto para rollback en caso de error
      return { previousUserStats, previousLocalStats };
    },
    onError: (error, _newUserStats, context) => {
      if (context?.previousUserStats) {
        queryClient.setQueryData(["user_profile"], context.previousUserStats);
      }

      if (context?.previousLocalStats) {
        // Revertir las stats en el store local
        setUserStats({ ...context.previousLocalStats, sync: false });
      }
    },
    onSettled: () => {
      markAsSynced();
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
    },
  });

  useEffect(() => {
    if (userStats.userPreferences.autoSync) {
      syncData(isConnected, token, userStats.sync, () => {
        mutation.mutate(userStats);
      });
    }
  }, [isConnected, token, userStats]);

  return {
    ...mutation,
    syncUserProfile: () => {
      syncData(isConnected, token, userStats.sync, () => {
        mutation.mutate(userStats);
      });
    },
  };
};

export default useUserSync;
