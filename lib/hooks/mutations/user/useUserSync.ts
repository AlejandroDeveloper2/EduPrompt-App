/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { UserStats } from "@/lib/types/data-types";

import { showToast } from "@/lib/context";

import { useCheckNetwork } from "../../core";
import { useUserOfflineStore } from "../../store";

import { generateToastKey, getSessionToken } from "@/lib/helpers";
import { putUserStats } from "@/services/users";

const useUserSync = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

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

  const syncUserProfile = async () => {
    const token = await getSessionToken();
    if (!isConnected) {
      showToast({
        key: generateToastKey(),
        variant: "danger",
        message: "Conectate a internet para sincronizar tus datos.",
      });
      return;
    }
    if (!token) {
      showToast({
        key: generateToastKey(),
        variant: "danger",
        message:
          "Inicia sesión o crea una cuenta para poder sincronizar tus datos.",
      });
      return;
    }
    if (!userStats.sync) {
      mutation.mutate(userStats);
      return;
    }

    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: "Todo esta sincronizado",
    });
  };

  useEffect(() => {
    if (userStats.userPreferences.autoSync) {
      syncUserProfile();
    }
  }, [isConnected, userStats.userPreferences.autoSync]);

  return { ...mutation, syncUserProfile };
};

export default useUserSync;
