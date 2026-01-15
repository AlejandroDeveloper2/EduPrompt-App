import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuid } from "react-native-uuid/dist/v4";

import { CreatePromptPayload } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useCreatePromptMutation } from "../mutations";
import { useOfflinePromptsStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

const useCreatePrompt = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { isProcessing, createPrompt, updatePromptsSyncStatus } =
    useOfflinePromptsStore();

  /** Online */
  const { mutate, isPending } = useCreatePromptMutation();

  const { t } = useTranslations();

  const addPrompt = useCallback(
    async (createPromptPayload: Omit<CreatePromptPayload, "promptId">) => {
      /** Creación  offline inmediata */
      const promptId: string = uuid();
      const addedPrompt = await createPrompt({
        ...createPromptPayload,
        promptId,
      });

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["prompts"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        eventBus.emit("prompts.savePrompt.started", undefined);
        mutate(
          { ...createPromptPayload, promptId },
          {
            onSuccess: () => {
              eventBus.emit("prompts.savePrompt.completed", undefined);
            },
            onError: (error) => {
              eventBus.emit("prompts.savePrompt.failed", {
                error: String(error),
              });
            },
          }
        );
        await updatePromptsSyncStatus(true, addedPrompt.promptId);
      }

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "prompts-translations.module-success-messages.prompt-created-msg"
        ),
      });
    },
    [
      isAuthenticated,
      isConnected,
      mutate,
      createPrompt,
      updatePromptsSyncStatus,
      queryClient,
      t,
    ]
  );

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    addPrompt,
  };
};

export default useCreatePrompt;
