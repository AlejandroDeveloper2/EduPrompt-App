import { eventBus } from "@/core/events/EventBus";

import { TokenPackage } from "../../types";

import { useLoading } from "@/shared/hooks/core";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

const useMarketplace = () => {
  const { isLoading, message, toggleLoading } = useLoading();

  const createPurchase = (tokenPackage: TokenPackage): void => {
    toggleLoading(true, "Comprando paquete...");
    eventBus.emit("userProfile.updateTokeUserCoins.requested", {
      amount: tokenPackage.tokensAmount,
      mode: "add",
    });
    toggleLoading(false, null);
    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: `Has comprado el ${tokenPackage.packageTitle} de tokens. Ahora tienes ${tokenPackage.tokensAmount} más, disfrutalos.`,
    });
  };

  return {
    loading: {
      isLoading,
      message,
    },
    createPurchase,
  };
};

export default useMarketplace;
