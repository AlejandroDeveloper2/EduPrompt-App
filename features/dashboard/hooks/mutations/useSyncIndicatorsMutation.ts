import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { Indicator } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useIndicatorPanelStore } from "../store";

import { syncData } from "@/shared/utils";
import { putIndicators } from "../../services";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

const useSyncIndicatorsMutation = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);
  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const { setIndicators, indicators } = useIndicatorPanelStore();

  const mutation = useMutation({
    mutationFn: putIndicators,

    onMutate: async (updatedIndicators: Indicator) => {
      await queryClient.cancelQueries({ queryKey: ["app_indicators"] });

      // Obtener el estado actual
      const previousIndicators = queryClient.getQueryData(["app_indicators"]);

      // Actualizar cache de manera optimista
      if (previousIndicators) {
        queryClient.setQueryData(["app_indicators"], updatedIndicators);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousIndicators };
    },
    onError: (_error, _newIndicators, context) => {
      if (context?.previousIndicators) {
        queryClient.setQueryData(
          ["app_indicators"],
          context.previousIndicators,
        );
      }
    },
    onSuccess: () => {
      setIndicators({ sync: true });
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t("common_translations.sync_data_messages.all_synced_msg"),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["app_indicators"] });
    },
  });

  const syncIndicators = useCallback(() => {
    const onlineIndicators = queryClient.getQueryData<Indicator>([
      "app_indicators",
    ]);
    if (!onlineIndicators) return;
    const syncedIndicators: Indicator = {
      generatedResources:
        indicators.generatedResources + onlineIndicators.generatedResources,
      usedTokens: indicators.usedTokens + onlineIndicators.usedTokens,
      lastGeneratedResource:
        indicators.lastGeneratedResource ??
        onlineIndicators.lastGeneratedResource,
      dowloadedResources:
        indicators.dowloadedResources + onlineIndicators.dowloadedResources,
      savedResources:
        indicators.savedResources + onlineIndicators.savedResources,
    };
    syncData(isConnected, isAuthenticated, indicators.sync, () => {
      mutation.mutate(syncedIndicators);
    });
  }, [indicators, isAuthenticated, isConnected, mutation, queryClient]);

  useEffect(() => {
    if (userProfile && userProfile.userPreferences.autoSync) {
      syncIndicators();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, indicators, isConnected, isAuthenticated]);

  return {
    ...mutation,
    syncIndicators,
  };
};

export default useSyncIndicatorsMutation;
