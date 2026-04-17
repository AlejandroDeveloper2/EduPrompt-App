import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreatePromptPayload, Prompt } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflinePromptsStore } from "../store";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { postPrompt } from "../../services";

const useCreatePromptMutation = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { createPrompt, updatePromptsSyncStatus } = useOfflinePromptsStore();

  return useMutation({
    mutationFn: async (payload) => {
      /** Creación  offline inmediata */
      const addedPrompt = await createPrompt(payload);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["prompts"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        await postPrompt(payload);
        await updatePromptsSyncStatus(true, addedPrompt.promptId);
      }
    },
    onMutate: async (createPromptPayload: CreatePromptPayload) => {
      await queryClient.cancelQueries({ queryKey: ["prompts"] });
      // Obtener el estado actual
      const previousPrompts = queryClient.getQueryData<Prompt[]>(["prompts"]);

      // Actualizar cache de manera optimista
      if (previousPrompts) {
        queryClient.setQueryData(
          ["prompts"],
          [...previousPrompts, createPromptPayload],
        );
      }

      // Retornar el contexto para rollback en caso de error
      return { previousPrompts };
    },

    onError: (_error, _newPrompts, context) => {
      if (context?.previousPrompts) {
        queryClient.setQueryData(["prompts"], context.previousPrompts);
      }
    },

    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "prompts_translations.module_success_messages.prompt_created_msg",
        ),
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
};

export default useCreatePromptMutation;
