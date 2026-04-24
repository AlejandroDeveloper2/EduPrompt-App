import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

import { Tag } from "../../types";

import { useOfflineTagsStore } from "../../store";

import { eventBus } from "@/core/events/EventBus";
import { postSyncTags } from "../../services";

const useSyncTagMutation = () => {
  const queryClient = useQueryClient();

  const { updateTagsSyncStatus, findAllTags } = useOfflineTagsStore(
    useShallow((state) => ({
      updateTagsSyncStatus: state.updateTagsSyncStatus,
      findAllTags: state.findAllTags,
    })),
  );

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
    onSuccess: async () => {
      await updateTagsSyncStatus(true);
    },
    onError: (_error, _newTags, context) => {
      if (context?.previousTags) {
        queryClient.setQueryData(["tags"], context.previousTags);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  const syncTags = useCallback(async () => {
    const tags = await findAllTags();
    eventBus.emit("tags.syncData.started", undefined);
    mutation.mutate(
      { tags },
      {
        onSuccess: () => eventBus.emit("tags.syncData.completed", undefined),
        onError: (error) =>
          eventBus.emit("tags.syncData.failed", { error: error.message }),
      },
    );
  }, [mutation, findAllTags]);

  return {
    ...mutation,
    syncTags,
  };
};

export default useSyncTagMutation;
