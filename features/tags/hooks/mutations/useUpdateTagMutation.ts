import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { Tag, UpdateTagPayload } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineTagsStore } from "../../store";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { patchTag } from "../../services";

const useUpdateTagMutation = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { updateTag, updateTagsSyncStatus } = useOfflineTagsStore(
    useShallow((state) => ({
      updateTag: state.updateTag,
      updateTagsSyncStatus: state.updateTagsSyncStatus,
    })),
  );

  return useMutation({
    mutationFn: async (updateTagPayload: UpdateTagPayload) => {
      /** Actualización  offline inmediata */
      const updatedTag = await updateTag(updateTagPayload);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["tags"] });

      /** Actualización online */
      if (isConnected && isAuthenticated) {
        await patchTag(updateTagPayload);
        await updateTagsSyncStatus(true, updatedTag.tagId);
      }
    },
    onMutate: async (updateTagPayload: UpdateTagPayload) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      // Obtener el estado actual
      const previousTags = queryClient.getQueryData<Tag[]>(["tags"]);

      // Actualizar cache de manera optimista
      if (previousTags) {
        const { name, type } = updateTagPayload;
        const updatedTags = previousTags.map((tag) => {
          if (tag.tagId === updateTagPayload.tagId)
            return { ...tag, name, type };
          return tag;
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
        message: t("tags_translations.module_success_messages.tag_updated_msg"),
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export default useUpdateTagMutation;
