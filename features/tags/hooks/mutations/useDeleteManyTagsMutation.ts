import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Tag } from "../../types";

import { deleteManyTags } from "../../services";

const useDeleteManyTagsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteManyTags,
    onMutate: async (tagIds: string[]) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      // Obtener el estado actual
      const previousTags = queryClient.getQueryData<Tag[]>(["tags"]);

      // Actualizar cache de manera optimista
      if (previousTags) {
        const selectedTagIds = new Set(tagIds);
        const updatedTags = previousTags.filter(
          (tag) => !selectedTagIds.has(tag.tagId)
        );
        queryClient.setQueryData(["tags"], updatedTags);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousTags };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export default useDeleteManyTagsMutation;
