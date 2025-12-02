/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { Indicator, LocalIndicator } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useIndicatorPanelStore } from "../store";

import { syncData } from "@/shared/utils";
import { putIndicators } from "../../services";

const useSyncIndicators = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const { token } = useEventbusValue("auth.tokens.getted", {
    token: null,
    refreshToken: null,
  });

  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const { loadIndicators, setIndicators, indicators } =
    useIndicatorPanelStore();

  const mutation = useMutation({
    mutationFn: async (updatedIndicators: Indicator) => {
      setIndicators({ ...updatedIndicators, sync: false });

      if (token && isConnected) {
        await putIndicators(updatedIndicators);
      }
    },
    onMutate: async (updatedIndicators: Indicator) => {
      await queryClient.cancelQueries({ queryKey: ["app_indicators"] });

      // Obtener el estado actual
      const previousIndicators = queryClient.getQueryData(["app_indicators"]);

      const previousLocalIndicators: LocalIndicator = loadIndicators();

      // Actualizar cache de manera optimista
      if (previousIndicators) {
        queryClient.setQueryData(["app_indicators"], updatedIndicators);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousIndicators, previousLocalIndicators };
    },
    onError: (error, _newIndicators, context) => {
      if (context?.previousIndicators) {
        queryClient.setQueryData(
          ["app_indicators"],
          context.previousIndicators
        );
      }

      if (context?.previousLocalIndicators) {
        // Revertir el valor de los indicadores en el store local
        setIndicators(context.previousLocalIndicators);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["app_indicators"] });
    },
  });

  useEffect(() => {
    if (userProfile && userProfile.userPreferences.autoSync) {
      syncData(isConnected, token, indicators.sync, () => {
        mutation.mutate(indicators);
      });
    }
  }, [userProfile, indicators, isConnected, token]);

  return {
    ...mutation,
    syncIndicators: () => {
      syncData(isConnected, token, indicators.sync, () => {
        mutation.mutate(indicators);
      });
    },
  };
};

export default useSyncIndicators;
