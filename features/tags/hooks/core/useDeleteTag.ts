import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useDeleteTagMutation } from "../mutations";
import { useOfflineTagsStore } from "../store";

const useDeleteTag = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { isProcessing, deleteTag } = useOfflineTagsStore();

  /** Online */
  const { isPending, mutate } = useDeleteTagMutation();

  const removeTag = useCallback(
    async (tagId: string) => {
      /** Eliminación  offline inmediata */
      await deleteTag(tagId);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["tags"] });

      /** Eliminación online */
      if (isConnected && isAuthenticated) {
        mutate(tagId);
      }
    },
    [isAuthenticated, isConnected, mutate, deleteTag, queryClient]
  );

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    removeTag,
  };
};

export default useDeleteTag;
