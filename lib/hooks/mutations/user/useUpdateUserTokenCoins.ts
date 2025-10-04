import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/lib/context";

import { useCheckNetwork } from "../../core";
import { useUserOfflineStore } from "../../store";

import { generateToastKey, getSessionToken } from "@/lib/helpers";
import { patchUserTokenCoins } from "@/services/users";

const useUpdateUserTokenCoins = (mode: "add" | "substract") => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const {
    userStats,
    addLocalTokenCoins,
    subtractLocalTokenCoins,
    markAsSynced,
  } = useUserOfflineStore();

  return useMutation({
    mutationFn: async (amount: number) => {
      const token = await getSessionToken();
      if (mode === "add") addLocalTokenCoins(amount, false);
      else subtractLocalTokenCoins(amount, false);

      if (isConnected && token) {
        await patchUserTokenCoins(userStats.tokenCoins);
        markAsSynced();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_profile"] });
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Monto de tokens actualizado con éxito",
      });
    },
  });
};

export default useUpdateUserTokenCoins;
