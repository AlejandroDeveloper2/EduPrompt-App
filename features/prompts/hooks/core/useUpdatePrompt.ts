import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { UpdatePromptPayload } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdatePromptMutation } from "../mutations";
import { useOfflinePromptsStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

const useUpdatePrompt = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { isProcessing, updatePrompt, updatePromptsSyncStatus } =
    useOfflinePromptsStore();

  /** Online */
  const { mutate, isPending } = useUpdatePromptMutation();

  const { t } = useTranslations();

  const editPrompt = useCallback(
    async (updatePromptPayload: UpdatePromptPayload) => {
      /** Actualización  offline inmediata */
      const updatedPrompt = await updatePrompt(updatePromptPayload);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["prompts"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        mutate(updatePromptPayload);
        await updatePromptsSyncStatus(true, updatedPrompt.promptId);
      }

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "prompts-translations.module-success-messages.prompt-updated-msg"
        ),
      });
    },
    [
      isAuthenticated,
      isConnected,
      mutate,
      updatePrompt,
      updatePromptsSyncStatus,
      queryClient,
      t,
    ]
  );

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    editPrompt,
  };
};

export default useUpdatePrompt;
