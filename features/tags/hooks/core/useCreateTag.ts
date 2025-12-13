import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { CreateTagPayload } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useCreateTagMutation } from "../mutations";
import { useOfflineTagsStore } from "../store";

const useCreateTag = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { isProcessing, createTag, updateTagsSyncStatus } =
    useOfflineTagsStore();

  /** Online */
  const { mutate, isPending } = useCreateTagMutation();

  const addTag = useCallback(
    async (createTagPayload: CreateTagPayload) => {
      /** Creación  offline inmediata */
      const addedTag = await createTag(createTagPayload);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["tags"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        mutate(createTagPayload);
        await updateTagsSyncStatus(true, addedTag.tagId);
      }
    },
    [
      isAuthenticated,
      isConnected,
      mutate,
      createTag,
      updateTagsSyncStatus,
      queryClient,
    ]
  );

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    addTag,
  };
};

export default useCreateTag;
