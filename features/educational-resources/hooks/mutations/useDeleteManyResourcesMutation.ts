import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteManyResources } from "../../services";
import { EducationalResource } from "../../types";

const useDeleteManyResourcesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteManyResources,
    onMutate: async (resourcesIds: string[]) => {
      await queryClient.cancelQueries({ queryKey: ["resources"] });
      // Obtener el estado actual
      const previousResources = queryClient.getQueryData<EducationalResource[]>(
        ["resources"]
      );

      // Actualizar cache de manera optimista
      if (previousResources) {
        const selectedResourceIds = new Set(resourcesIds);
        const updatedResources = previousResources.filter(
          (resource) => !selectedResourceIds.has(resource.resourceId)
        );
        queryClient.setQueryData(["resources"], updatedResources);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousResources };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
};

export default useDeleteManyResourcesMutation;
