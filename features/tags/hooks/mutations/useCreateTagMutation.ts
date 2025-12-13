import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateTagPayload, Tag } from "../../types";

import { showToast } from "@/shared/context";

import { postTag } from "../../services";

import { generateToastKey } from "@/shared/helpers";

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
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Etiqueta creada con éxito",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export default useCreateTagMutation;
