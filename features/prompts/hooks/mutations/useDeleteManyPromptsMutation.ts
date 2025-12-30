import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Prompt } from "../../types";

import { deleteManyPrompts } from "../../services";

const useDeleteManyPromptsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteManyPrompts,
    onMutate: async (promptIds: string[]) => {
      await queryClient.cancelQueries({ queryKey: ["prompts"] });
      // Obtener el estado actual
      const previousPrompts = queryClient.getQueryData<Prompt[]>(["prompts"]);

      // Actualizar cache de manera optimista
      if (previousPrompts) {
        const selectedPromptIds = new Set(promptIds);
        const updatedPrompts = previousPrompts.filter(
          (prompt) => !selectedPromptIds.has(prompt.promptId)
        );
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

export default useDeleteManyPromptsMutation;
