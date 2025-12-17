import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateTagPayload, Tag } from "../../types";

import { postTag } from "../../services";

const useCreateTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTag,
    onMutate: async (createTagPayload: CreateTagPayload) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      // Obtener el estado actual
      const previousTags = queryClient.getQueryData<Tag[]>(["tags"]);

      // Actualizar cache de manera optimista
      if (previousTags) {
        queryClient.setQueryData(["tags"], [...previousTags, createTagPayload]);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousTags };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export default useCreateTagMutation;
