import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { Prompt } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflinePromptsStore } from "../store";

import { postSyncPrompts } from "../../services";

import { generateToastKey } from "@/shared/helpers";
import { syncData } from "@/shared/utils";

const useSyncPromptsMutation = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const isAuthenticated = useEventbusValue("auth.authenticated", false);
  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const { updatePromptsSyncStatus, findAllPrompts } = useOfflinePromptsStore();

  const { t } = useTranslations();

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
            (p) => p.promptId === prompt.promptId
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
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "prompts-translations.module-success-messages.prompts-synced-msg"
        ),
      });
    },
    onError: (error, _newPrompts, context) => {
      if (context?.previousPrompts) {
        queryClient.setQueryData(["prompts"], context.previousPrompts);
      }
    },
    onSettled: () => {
      updatePromptsSyncStatus(true);
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });

  useEffect(() => {
    const handleSync = async () => {
      if (userProfile && userProfile.userPreferences.autoSync) {
        const prompts = await findAllPrompts();
        syncData(
          isConnected,
          isAuthenticated,
          prompts.every((p) => p.sync),
          async () => {
            mutation.mutate({ prompts });
          }
        );
      }
    };
    handleSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isAuthenticated, userProfile]);

  const syncPrompts = useCallback(async () => {
    const prompts = await findAllPrompts();
    syncData(
      isConnected,
      isAuthenticated,
      prompts.every((p) => p.sync),
      () => {
        mutation.mutate({ prompts });
      }
    );
  }, [isAuthenticated, isConnected, mutation, findAllPrompts]);

  return {
    ...mutation,
    syncPrompts,
  };
};

export default useSyncPromptsMutation;
