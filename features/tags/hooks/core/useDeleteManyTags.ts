import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useSelectionModeStore } from "@/shared/hooks/store";
import { useDeleteManyTagsMutation } from "../mutations";
import { useOfflineTagsStore, useTagsSelectionStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

const useDeleteManyTags = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { disableSelectionMode } = useSelectionModeStore();
  const { selectedTagIds } = useTagsSelectionStore();

  /** Offline */
  const { isProcessing, deleteManyTags } = useOfflineTagsStore();

  /** Online */
  const { isPending, mutate } = useDeleteManyTagsMutation();

  const { t } = useTranslations();

  const removeManyTags = useCallback(async () => {
    /** Eliminación  offline inmediata */
    await deleteManyTags();

    if (!isAuthenticated)
      await queryClient.refetchQueries({ queryKey: ["tags"] });

    /** Eliminación online */
    if (isConnected && isAuthenticated) {
      const selectedTags = Array.from(selectedTagIds);
      mutate(selectedTags);
    }
    disableSelectionMode();
    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: t("tags-translations.module-success-messages.tags-deleted-msg"),
    });
  }, [
    isAuthenticated,
    isConnected,
    mutate,
    deleteManyTags,
    queryClient,
    disableSelectionMode,
    selectedTagIds,
    t,
  ]);

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    removeManyTags,
  };
};

export default useDeleteManyTags;
