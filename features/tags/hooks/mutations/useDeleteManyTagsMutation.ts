import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Tag } from "../../types";

import { showToast } from "@/shared/context";

import { deleteManyTags } from "../../services";

import { generateToastKey } from "@/shared/helpers";

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
        let updatedTags: Tag[] = [];
        previousTags.forEach((tag) => {
          const tagId = tagIds.find((id) => id === tag.tagId);
          if (!tagId) return;
          updatedTags = previousTags.filter(
            (updateTag) => updateTag.tagId !== tagId
          );
        });
        queryClient.setQueryData(["tags"], updatedTags);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousTags };
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Etiquetas eliminadas con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export default useDeleteManyTagsMutation;
