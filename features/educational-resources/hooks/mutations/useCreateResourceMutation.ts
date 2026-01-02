import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateResourcePayload, EducationalResource } from "../../types";

import { postEducationalResource } from "../../services";

const useCreateResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postEducationalResource,
    onMutate: async (createResourcePayload: CreateResourcePayload) => {
      await queryClient.cancelQueries({ queryKey: ["resources"] });
      // Obtener el estado actual
      const previousResources = queryClient.getQueryData<EducationalResource[]>(
        ["resources"]
      );

      // Actualizar cache de manera optimista
      if (previousResources) {
        queryClient.setQueryData(
          ["resources"],
          [...previousResources, createResourcePayload]
        );
      }

      // Retornar el contexto para rollback en caso de error
      return { previousResources };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
};

export default useCreateResourceMutation;
