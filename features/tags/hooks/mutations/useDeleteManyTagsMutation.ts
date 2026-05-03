import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { Tag } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineTagsStore, useTagsSelectionStore } from "../../store";
import useTags from "../core/useTags";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { deleteManyTags } from "../../services";

const getSyncedTags = (tags: Tag[], selectedTagIds: string[]): string[] => {
  let selectedTags: Tag[] = [];
  tags.forEach((tag) => {
    if (selectedTagIds.includes(tag.tagId)) selectedTags.push(tag);
  });
  const syncedTagsIds = selectedTags.filter((t) => t.sync).map((t) => t.tagId);
  return syncedTagsIds;
};

const useDeleteManyTagsMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const toggleSelectionMode = useTagsSelectionStore(
    useShallow((state) => state.toggleSelectionMode),
  );

  /** Obtenemos las tags */
  const { tags } = useTags();

  /** Offline */
  const deleteManyTagsOffline = useOfflineTagsStore(
    useShallow((state) => state.deleteManyTags),
  );

  return useMutation({
    mutationFn: async (selectedTagIds) => {
      /** Eliminación  offline inmediata */
      await deleteManyTagsOffline();

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["tags"] });

      /** Eliminación online */
      if (isConnected && isAuthenticated) {
        /** Eliminamos solo las etiquetas que estan sincronizadas */
        const syncedTagsIds = getSyncedTags(tags, selectedTagIds);
        await deleteManyTags(syncedTagsIds);
      }
    },
    onMutate: async (tagIds: string[]) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      // Obtener el estado actual
      const previousTags = queryClient.getQueryData<Tag[]>(["tags"]);

      // Actualizar cache de manera optimista
      if (previousTags) {
        const selectedTagIds = new Set(tagIds);
        const updatedTags = previousTags.filter(
          (tag) => !selectedTagIds.has(tag.tagId),
        );
        queryClient.setQueryData(["tags"], updatedTags);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousTags };
    },
    onSuccess: () => {
      toggleSelectionMode(false);
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "tags_translations.module_success_messages.tags_deleted_msg",
        ),
      });
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
};

export default useDeleteManyTagsMutation;
