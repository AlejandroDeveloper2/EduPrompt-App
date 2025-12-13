import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { Tag } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineTagsStore } from "../store";

import { postSyncTags } from "../../services";

import { generateToastKey } from "@/shared/helpers";
import { syncData } from "@/shared/utils";

const useSyncTagMutation = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const isAuthenticated = useEventbusValue("auth.authenticated", false);
  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const { updateTagsSyncStatus, findAllTags } = useOfflineTagsStore();

  const mutation = useMutation({
    mutationFn: postSyncTags,
    onMutate: async (syncTagsPayload) => {
      const { tags } = syncTagsPayload;
      await queryClient.cancelQueries({ queryKey: ["tags"] });

      // Obtener el estado actual
      const previousTags = queryClient.getQueryData<Tag[]>(["tags"]);

      // Actualizar cache de manera optimista
      if (previousTags) {
        let updatedTags: Tag[] = [...previousTags];
        tags.forEach((tag) => {
          const prevTag = previousTags.find((t) => t.tagId === tag.tagId);
          if (!prevTag) return updatedTags.push(tag);
          return (updatedTags = updatedTags.map((t) => {
            if (t.tagId === tag.tagId) return { ...t, ...tag };
            return t;
          }));
        });
        queryClient.setQueryData(["tags"], updatedTags);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousTags };
    },
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Info de etiquetas sincronizada con éxito",
      });
    },
    onError: (error, _newTags, context) => {
      if (context?.previousTags) {
        queryClient.setQueryData(["tags"], context.previousTags);
      }
    },
    onSettled: () => {
      updateTagsSyncStatus(true);
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  useEffect(() => {
    const handleSync = async () => {
      if (userProfile && userProfile.userPreferences.autoSync) {
        const tags = await findAllTags();
        syncData(
          isConnected,
          isAuthenticated,
          tags.every((t) => t.sync),
          async () => {
            mutation.mutate({ tags });
          }
        );
      }
    };
    handleSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isAuthenticated, userProfile]);

  const syncTags = useCallback(async () => {
    const tags = await findAllTags();
    syncData(
      isConnected,
      isAuthenticated,
      tags.every((t) => t.sync),
      () => {
        mutation.mutate({ tags });
      }
    );
  }, [isAuthenticated, isConnected, mutation, findAllTags]);

  return {
    ...mutation,
    syncTags,
  };
};

export default useSyncTagMutation;
