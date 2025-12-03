/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { Indicator } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useIndicatorPanelStore } from "../store";

import { syncData } from "@/shared/utils";
import { putIndicators } from "../../services";

const useSyncIndicatorsMutation = () => {
  const queryClient = useQueryClient();

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
    onError: (error, _newIndicators, context) => {
      if (context?.previousIndicators) {
        queryClient.setQueryData(
          ["app_indicators"],
          context.previousIndicators
        );
      }
    },
    onSettled: () => {
      setIndicators({ sync: true });
      queryClient.invalidateQueries({ queryKey: ["app_indicators"] });
    },
  });

  useEffect(() => {
    if (userProfile && userProfile.userPreferences.autoSync) {
      syncData(isConnected, isAuthenticated, indicators.sync, () => {
        mutation.mutate(indicators);
      });
    }
  }, [userProfile, indicators, isConnected, isAuthenticated]);

  return {
    ...mutation,
    syncIndicators: () => {
      syncData(isConnected, isAuthenticated, indicators.sync, () => {
        mutation.mutate(indicators);
      });
    },
  };
};

export default useSyncIndicatorsMutation;
