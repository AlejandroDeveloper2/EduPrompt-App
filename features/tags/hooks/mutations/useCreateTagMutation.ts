import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { CreateTagPayload, Tag } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineTagsStore } from "../../store";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { postTag } from "../../services";

const useCreateTagMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { createTag, updateTagsSyncStatus } = useOfflineTagsStore(
    useShallow((state) => ({
      createTag: state.createTag,
      updateTagsSyncStatus: state.updateTagsSyncStatus,
    })),
  );

  return useMutation({
    mutationFn: async (createTagPayload) => {
      const addedTag = await createTag(createTagPayload);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["tags"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        await postTag(createTagPayload);
        await updateTagsSyncStatus(true, addedTag.tagId);
      }
    },
    onMutate: async (createTagPayload: CreateTagPayload) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      // Obtener el estado actual
      const previousTags = queryClient.getQueryData<Tag[]>(["tags"]);

      // Actualizar cache de manera optimista
      if (previousTags) {
        queryClient.setQueryData(["tags"], [...previousTags, createTagPayload]);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousTags };
    },

    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t("tags_translations.module_success_messages.tag_created_msg"),
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

export default useCreateTagMutation;
