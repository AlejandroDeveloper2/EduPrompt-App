import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

import { Indicator } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import { useIndicatorPanelStore } from "../../store";

import { putIndicators } from "../../services";

const useSyncIndicatorsMutation = () => {
  const queryClient = useQueryClient();

  const { setIndicators, indicators } = useIndicatorPanelStore(
    useShallow((state) => ({
      setIndicators: state.setIndicators,
      indicators: state.indicators,
    })),
  );

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
    eventBus.emit("dashboard.syncData.started", undefined);
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
    mutation.mutate(syncedIndicators, {
      onSuccess: () => eventBus.emit("dashboard.syncData.completed", undefined),
      onError: (error) =>
        eventBus.emit("dashboard.syncData.failed", {
          error: error.message,
        }),
    });
  }, [indicators, mutation, queryClient]);

  return {
    ...mutation,
    syncIndicators,
  };
};

export default useSyncIndicatorsMutation;
