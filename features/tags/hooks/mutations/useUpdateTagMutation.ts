import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Tag, UpdateTagPayload } from "../../types";

import { showToast } from "@/shared/context";

import { patchTag } from "../../services";

import { generateToastKey } from "@/shared/helpers";

const useUpdateTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTag,
    onMutate: async (updateTagPayload: UpdateTagPayload) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      // Obtener el estado actual
      const previousTags = queryClient.getQueryData<Tag[]>(["tags"]);

      // Actualizar cache de manera optimista
      if (previousTags) {
        const { name, type } = updateTagPayload;
        const updatedTags = previousTags.map((tag) => {
          if (tag.tagId === updateTagPayload.tagId)
            return { ...tag, name, type };
          return tag;
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
        message: "Etiqueta actualizada con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export default useUpdateTagMutation;
