import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { Prompt, UpdatePromptPayload } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflinePromptsStore } from "../../store";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { putPrompt } from "../../services";

const useUpdatePromptMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { updatePrompt, updatePromptsSyncStatus } = useOfflinePromptsStore(
    useShallow((state) => ({
      updatePrompt: state.updatePrompt,
      updatePromptsSyncStatus: state.updatePromptsSyncStatus,
    })),
  );

  return useMutation({
    mutationFn: async (payload) => {
      /** Actualización  offline inmediata */
      const updatedPrompt = await updatePrompt(payload);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["prompts"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        await putPrompt(payload);
        await updatePromptsSyncStatus(true, updatedPrompt.promptId);
      }
    },
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

    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "prompts_translations.module_success_messages.prompt_updated_msg",
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

export default useUpdatePromptMutation;
