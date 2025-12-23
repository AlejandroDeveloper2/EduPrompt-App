import { useCallback } from "react";

import { eventBus } from "@/core/events/EventBus";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdateTokenCoinsMutation } from "../mutations";
import { useUserOfflineStore } from "../store";

const useUpdateTokenCoins = () => {
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { addLocalTokenCoins, subtractLocalTokenCoins, markAsSynced } =
    useUserOfflineStore();

  /** Online */
  const { mutate } = useUpdateTokenCoinsMutation();

  const updateTokenCoins = useCallback(
    (config: { amount: number; mode: "add" | "substract" }) => {
      let updatedTokenAmount: number;

      if (config.mode === "add")
        updatedTokenAmount = addLocalTokenCoins(config.amount, false);
      else updatedTokenAmount = subtractLocalTokenCoins(config.amount, false);

      if (isConnected && isAuthenticated) {
        eventBus.emit("userProfile.updateTokeUserCoins.started", undefined);

        mutate(updatedTokenAmount, {
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
    [
      isConnected,
      isAuthenticated,
      addLocalTokenCoins,
      subtractLocalTokenCoins,
      markAsSynced,
      mutate,
    ]
  );
  return { updateTokenCoins };
};

export default useUpdateTokenCoins;
