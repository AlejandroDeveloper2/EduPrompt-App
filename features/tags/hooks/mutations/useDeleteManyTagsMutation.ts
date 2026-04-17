import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Tag } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useSelectionModeStore } from "@/shared/hooks/store";
import { useOfflineTagsStore } from "../store";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { deleteManyTags } from "../../services";

const useDeleteManyTagsMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { disableSelectionMode } = useSelectionModeStore();

  /** Offline */
  const { deleteManyTags: deleteManyTagsOffline } = useOfflineTagsStore();

  return useMutation({
    mutationFn: async (payload) => {
      /** Eliminación  offline inmediata */
      await deleteManyTagsOffline();

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["tags"] });

      /** Eliminación online */
      if (isConnected && isAuthenticated) {
        await deleteManyTags(payload);
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
      disableSelectionMode();
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
