import { eventBus } from "@/core/events/EventBus";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdateTokenCoinsMutation } from "../mutations";
import { useUserProfileQuery } from "../queries";
import { useUserOfflineStore } from "../store";

const useUpdateTokenCoins = () => {
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { data } = useUserProfileQuery();

  /** Offline */
  const {
    addLocalTokenCoins,
    subtractLocalTokenCoins,
    markAsSynced,
    userStats,
  } = useUserOfflineStore();

  /** Online */
  const { mutate } = useUpdateTokenCoinsMutation();

  return {
    updateTokenCoins: (config: {
      amount: number;
      mode: "add" | "substract";
    }): void => {
      /** Actualización offline inmediata */
      let updatedTokenAmount: number;

      if (config.mode === "add")
        updatedTokenAmount = addLocalTokenCoins(config.amount, false);
      else updatedTokenAmount = subtractLocalTokenCoins(config.amount, false);

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        eventBus.emit("userProfile.updateTokeUserCoins.started", undefined);
        const totalUpdateAmount: number = data
          ? userStats.tokenCoins === 0
            ? data.tokenCoins + updatedTokenAmount
            : updatedTokenAmount
          : updatedTokenAmount;

        mutate(totalUpdateAmount, {
          onSuccess: () => {
            eventBus.emit(
              "userProfile.updateTokeUserCoins.completed",
              undefined
            );
          },
          onError: (error) => {
            eventBus.emit("userProfile.updateTokeUserCoins.failed", {
              error: String(error),
            });
          },
        });
        markAsSynced();
      }
    },
  };
};

export default useUpdateTokenCoins;
