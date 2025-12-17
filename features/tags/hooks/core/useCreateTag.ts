import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuid } from "react-native-uuid/dist/v4";

import { CreateTagPayload } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useCreateTagMutation } from "../mutations";
import { useOfflineTagsStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

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
    async (createTagPayload: Omit<CreateTagPayload, "tagId">) => {
      /** Creación  offline inmediata */
      const tagId: string = uuid();
      const addedTag = await createTag({ ...createTagPayload, tagId });

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["tags"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        mutate({ ...createTagPayload, tagId });
        await updateTagsSyncStatus(true, addedTag.tagId);
      }

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Etiqueta creada correctamente",
      });
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
