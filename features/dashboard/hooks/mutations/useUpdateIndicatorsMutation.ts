import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Indicator } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useIndicatorPanelStore } from "../store";

import { patchIndicators } from "../../services";

const useUpdateIndicatorsMutation = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { setIndicators } = useIndicatorPanelStore();

  return useMutation({
    mutationFn: async (indicators) => {
      /** Actualización inmediata offline */
      setIndicators({ ...indicators, sync: false });

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        await patchIndicators(indicators);
        setIndicators({ ...indicators, sync: true });
      }
    },
    onMutate: async (updatedIndicators: Partial<Indicator>) => {
      await queryClient.cancelQueries({ queryKey: ["app_indicators"] });

      // Obtener el estado actual
      const previousIndicators = queryClient.getQueryData(["app_indicators"]);

      // Actualizar cache de manera optimista
      if (previousIndicators) {
        queryClient.setQueryData(["app_indicators"], {
          ...previousIndicators,
          ...updatedIndicators,
        });
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["app_indicators"] });
    },
  });
};

export default useUpdateIndicatorsMutation;
