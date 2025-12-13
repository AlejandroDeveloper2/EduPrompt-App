import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { UpdateTagPayload } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdateTagMutation } from "../mutations";
import { useOfflineTagsStore } from "../store";

const useUpdateTag = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { isProcessing, updateTag, updateTagsSyncStatus } =
    useOfflineTagsStore();

  /** Online */
  const { mutate, isPending } = useUpdateTagMutation();

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
    },
    [
      isAuthenticated,
      isConnected,
      mutate,
      updateTag,
      updateTagsSyncStatus,
      queryClient,
    ]
  );

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    editTag,
  };
};

export default useUpdateTag;
