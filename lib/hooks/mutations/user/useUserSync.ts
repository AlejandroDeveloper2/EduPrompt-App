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

  const { userStats, markAsSynced } = useUserOfflineStore();

  const mutation = useMutation({
    mutationFn: async (
      updatedUserStats: Omit<UserStats, "sync" | "userName" | "email">
    ) => {
      await putUserStats(updatedUserStats);
    },
    onSuccess: async () => {
      markAsSynced();
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Datos de perfil sincronizados con éxito",
      });
    },
  });

  const syncUserProfile = (): void => {
    if (userStats.sync === false) {
      const { userPreferences, isPremiumUser, tokenCoins } = userStats;
      mutation.mutate({
        userPreferences,
        isPremiumUser,
        tokenCoins,
      });
      return;
    }
    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: "Todo esta sincronizado",
    });
  };

  useEffect(() => {
    const syncInfo = async () => {
      const token = await getSessionToken();
      if (isConnected && userStats.userPreferences.autoSync && token) {
        syncUserProfile();
      }
    };
    syncInfo();
  }, [isConnected, userStats.userPreferences.autoSync]);

  return { ...mutation, syncUserProfile };
};

export default useUserSync;
