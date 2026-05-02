import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { Prompt } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflinePromptsStore, usePromptsSelectionStore } from "../../store";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { deleteManyPrompts } from "../../services";

const useDeleteManyPromptsMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const toggleSelectionMode = usePromptsSelectionStore(
    useShallow((state) => state.toggleSelectionMode),
  );

  /** Offline */
  const deleteOfflinePrompts = useOfflinePromptsStore(
    useShallow((state) => state.deleteManyPrompts),
  );

  return useMutation({
    mutationFn: async (selectedPromptIds) => {
      /** Eliminación  offline inmediata */
      await deleteOfflinePrompts();

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["prompts"] });

      /** Eliminación online */
      if (isConnected && isAuthenticated) {
        await deleteManyPrompts(selectedPromptIds);
      }
    },
    onMutate: async (promptIds: string[]) => {
      await queryClient.cancelQueries({ queryKey: ["prompts"] });
      // Obtener el estado actual
      const previousPrompts = queryClient.getQueryData<Prompt[]>(["prompts"]);

      // Actualizar cache de manera optimista
      if (previousPrompts) {
        const selectedPromptIds = new Set(promptIds);
        const updatedPrompts = previousPrompts.filter(
          (prompt) => !selectedPromptIds.has(prompt.promptId),
        );
        queryClient.setQueryData(["prompts"], updatedPrompts);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousPrompts };
    },
    onSuccess: () => {
      toggleSelectionMode(false);
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "prompts_translations.module_success_messages.prompts_deleted_msg",
        ),
      });
    },
    onError: (_error, _newPrompts, context) => {
      if (context?.previousPrompts) {
        queryClient.setQueryData(["prompts"], context.previousPrompts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
};

export default useDeleteManyPromptsMutation;
