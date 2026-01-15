import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { UpdateTagPayload } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdateTagMutation } from "../mutations";
import { useOfflineTagsStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

const useUpdateTag = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { isProcessing, updateTag, updateTagsSyncStatus } =
    useOfflineTagsStore();

  /** Online */
  const { mutate, isPending } = useUpdateTagMutation();

  const { t } = useTranslations();

  const editTag = useCallback(
    async (updateTagPayload: UpdateTagPayload) => {
      /** Actualización  offline inmediata */
      const updatedTag = await updateTag(updateTagPayload);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["tags"] });

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        mutate(updateTagPayload);
        await updateTagsSyncStatus(true, updatedTag.tagId);
      }

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t("tags-translations.module-success-messages.tag-updated-msg"),
      });
    },
    [
      isAuthenticated,
      isConnected,
      mutate,
      updateTag,
      updateTagsSyncStatus,
      queryClient,
      t,
    ]
  );

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    editTag,
  };
};

export default useUpdateTag;
