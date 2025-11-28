import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Indicator, LocalIndicator } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useIndicatorPanelStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { getSessionToken } from "@/shared/utils";
import { patchIndicators } from "../../services";

const useUpdateIndicators = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const { loadIndicators, setIndicators } = useIndicatorPanelStore();

  return useMutation({
    mutationFn: async (updatedIndicators: Partial<Indicator>) => {
      const token = await getSessionToken();

      setIndicators({ ...updatedIndicators, sync: false });

      if (token && isConnected) {
        await patchIndicators(updatedIndicators);
      }
    },
    onMutate: async (updatedIndicators: Partial<Indicator>) => {
      await queryClient.cancelQueries({ queryKey: ["app_indicators"] });

      // Obtener el estado actual
      const previousIndicators = queryClient.getQueryData(["app_indicators"]);

      const previousLocalIndicators: LocalIndicator = loadIndicators();

      // Actualizar cache de manera optimista
      if (previousIndicators) {
        queryClient.setQueryData(["app_indicators"], {
          ...previousIndicators,
          ...updatedIndicators,
        });
      }

      //Actualizar store offline
      setIndicators({
        ...previousLocalIndicators,
        ...updatedIndicators,
        sync: false,
      });

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
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Indicadores actualizados con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["app_indicators"] });
    },
  });
};

export default useUpdateIndicators;
