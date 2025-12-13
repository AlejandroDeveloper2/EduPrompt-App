import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Tag } from "../../types";

import { showToast } from "@/shared/context";

import { deleteTag } from "../../services";

import { generateToastKey } from "@/shared/helpers";

const useDeleteTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,
    onMutate: async (tagId: string) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      // Obtener el estado actual
      const previousTags = queryClient.getQueryData<Tag[]>(["tags"]);

      // Actualizar cache de manera optimista
      if (previousTags) {
        const updatedTags = previousTags.filter((tag) => tag.tagId !== tagId);
        queryClient.setQueryData(["tags"], updatedTags);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousTags };
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Etiqueta eliminada con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export default useDeleteTagMutation;
