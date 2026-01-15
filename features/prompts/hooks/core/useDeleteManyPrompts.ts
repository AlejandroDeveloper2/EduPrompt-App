import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useSelectionModeStore } from "@/shared/hooks/store";
import { useDeleteManyPromptsMutation } from "../mutations";
import { useOfflinePromptsStore, usePromptsSelectionStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

const useDeleteManyPrompts = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { disableSelectionMode } = useSelectionModeStore();
  const { selectedPromptIds } = usePromptsSelectionStore();

  /** Offline */
  const { isProcessing, deleteManyPrompts } = useOfflinePromptsStore();

  /** Online */
  const { mutate, isPending } = useDeleteManyPromptsMutation();

  const { t } = useTranslations();

  const removeManyPrompts = useCallback(async () => {
    /** Eliminación  offline inmediata */
    await deleteManyPrompts();

    if (!isAuthenticated)
      await queryClient.refetchQueries({ queryKey: ["prompts"] });

    /** Eliminación online */
    if (isConnected && isAuthenticated) {
      const selectedPrompts = Array.from(selectedPromptIds);
      mutate(selectedPrompts);
    }
    disableSelectionMode();
    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: t(
        "prompts-translations.module-success-messages.prompts-deleted-msg"
      ),
    });
  }, [
    isAuthenticated,
    isConnected,
    mutate,
    deleteManyPrompts,
    queryClient,
    disableSelectionMode,
    selectedPromptIds,
    t,
  ]);

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    removeManyPrompts,
  };
};

export default useDeleteManyPrompts;
