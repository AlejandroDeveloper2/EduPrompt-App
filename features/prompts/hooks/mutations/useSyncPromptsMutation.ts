import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { Prompt } from "../../types";

import { useOfflinePromptsStore } from "../store";

import { postSyncPrompts } from "../../services";

import { eventBus } from "@/core/events/EventBus";

const useSyncPromptsMutation = () => {
  const queryClient = useQueryClient();

  const { updatePromptsSyncStatus, findAllPrompts } = useOfflinePromptsStore();

  const mutation = useMutation({
    mutationFn: postSyncPrompts,
    onMutate: async (syncPromptsPayload) => {
      const { prompts } = syncPromptsPayload;
      await queryClient.cancelQueries({ queryKey: ["prompts"] });

      // Obtener el estado actual
      const previousPrompts = queryClient.getQueryData<Prompt[]>(["prompts"]);

      // Actualizar cache de manera optimista
      if (previousPrompts) {
        let updatedPrompts: Omit<Prompt, "sync">[] = [...previousPrompts];
        prompts.forEach((prompt) => {
          const prevPrompt = previousPrompts.find(
            (p) => p.promptId === prompt.promptId,
          );
          if (!prevPrompt) return updatedPrompts.push(prompt);
          return (updatedPrompts = updatedPrompts.map((p) => {
            if (p.promptId === prompt.promptId) return { ...p, ...prompt };
            return p;
          }));
        });
        queryClient.setQueryData(["prompts"], updatedPrompts);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousPrompts };
    },
    onSuccess: async () => {
      await updatePromptsSyncStatus(true);
    },
    onError: (error, _newPrompts, context) => {
      if (context?.previousPrompts) {
        queryClient.setQueryData(["prompts"], context.previousPrompts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });

  const syncPrompts = useCallback(async () => {
    const prompts = await findAllPrompts();
    eventBus.emit("prompts.syncData.started", undefined);
    mutation.mutate(
      { prompts },
      {
        onSuccess: () => eventBus.emit("prompts.syncData.completed", undefined),
        onError: (error) =>
          eventBus.emit("prompts.syncData.failed", { error: error.message }),
      },
    );
  }, [mutation, findAllPrompts]);

  return {
    ...mutation,
    syncPrompts,
  };
};

export default useSyncPromptsMutation;
