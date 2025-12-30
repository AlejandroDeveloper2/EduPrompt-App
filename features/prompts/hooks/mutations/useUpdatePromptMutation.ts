import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Prompt, UpdatePromptPayload } from "../../types";

import { putPrompt } from "../../services";

const useUpdatePromptMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putPrompt,
    onMutate: async (updatePromptPayload: UpdatePromptPayload) => {
      await queryClient.cancelQueries({ queryKey: ["prompts"] });
      // Obtener el estado actual
      const previousPrompts = queryClient.getQueryData<Prompt[]>(["prompts"]);

      // Actualizar cache de manera optimista
      if (previousPrompts) {
        const { promptText, promptTitle, tag } = updatePromptPayload;
        const updatedPrompts = previousPrompts.map((prompt) => {
          if (prompt.promptId === updatePromptPayload.promptId)
            return { ...prompt, promptText, promptTitle, tag };
          return prompt;
        });
        queryClient.setQueryData(["prompts"], updatedPrompts);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousPrompts };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
};

export default useUpdatePromptMutation;
