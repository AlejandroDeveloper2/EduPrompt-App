import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EducationalResource, UpdateResourcePayload } from "../../types";

import { patchResource } from "../../services";

const useUpdateResourceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchResource,
    onMutate: async (updateResourcePayload: UpdateResourcePayload) => {
      await queryClient.cancelQueries({ queryKey: ["resources"] });
      // Obtener el estado actual
      const previousResources = queryClient.getQueryData<EducationalResource[]>(
        ["resources"]
      );

      // Actualizar cache de manera optimista
      if (previousResources) {
        const { title, groupTag } = updateResourcePayload;
        const updatedResources = previousResources.map((resource) => {
          if (resource.resourceId === updateResourcePayload.resourceId)
            return { ...resource, title, groupTag };
          return resource;
        });
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

export default useUpdateResourceMutation;
