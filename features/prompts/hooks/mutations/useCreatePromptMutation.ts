import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreatePromptPayload, Prompt } from "../../types";

import { postPrompt } from "../../services";

const useCreatePromptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPrompt,
    onMutate: async (createPromptPayload: CreatePromptPayload) => {
      await queryClient.cancelQueries({ queryKey: ["prompts"] });
      // Obtener el estado actual
      const previousPrompts = queryClient.getQueryData<Prompt[]>(["prompts"]);

      // Actualizar cache de manera optimista
      if (previousPrompts) {
        queryClient.setQueryData(
          ["prompts"],
          [...previousPrompts, createPromptPayload]
        );
      }

      // Retornar el contexto para rollback en caso de error
      return { previousPrompts };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
};

export default useCreatePromptMutation;
