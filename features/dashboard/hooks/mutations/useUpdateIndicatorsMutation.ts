import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Indicator } from "../../types";

import { patchIndicators } from "../../services";

const useUpdateIndicatorsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchIndicators,
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
    onError: (error, _newIndicators, context) => {
      if (context?.previousIndicators) {
        queryClient.setQueryData(
          ["app_indicators"],
          context.previousIndicators
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["app_indicators"] });
    },
  });
};

export default useUpdateIndicatorsMutation;
