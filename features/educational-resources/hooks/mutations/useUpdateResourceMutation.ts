import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { EducationalResource, UpdateResourcePayload } from "../../types";

import { patchResource } from "../../services";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineResourcesStore } from "../../store";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

const useUpdateResourceMutation = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { isProcessing, updateResource, updateResourcesSyncStatus } =
    useOfflineResourcesStore(
      useShallow(
        ({ isProcessing, updateResource, updateResourcesSyncStatus }) => ({
          isProcessing,
          updateResource,
          updateResourcesSyncStatus,
        }),
      ),
    );

  const mutation = useMutation({
    mutationFn: async (payload) => {
      /** Actualización  offline inmediata */
      const updatedResource = await updateResource(payload);

      /** Creacion online */
      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["resources"] });

      if (isConnected && isAuthenticated) {
        await patchResource(payload);
        await updateResourcesSyncStatus(true, updatedResource.resourceId);
      }
    },
    onMutate: async (updateResourcePayload: UpdateResourcePayload) => {
      /** Actualización optimista */
      await queryClient.cancelQueries({ queryKey: ["resources"] });
      // Obtener el estado actual
      const previousResources = queryClient.getQueryData<EducationalResource[]>(
        ["resources"],
      );

      // Actualizar cache de manera optimista
      if (previousResources) {
        const { title, groupTag } = updateResourcePayload;
        const updatedResources = previousResources.map((resource) => {
          if (resource.resourceId === updateResourcePayload.resourceId)
            return { ...resource, title, groupTag };
          return resource;
        });
        queryClient.setQueryData(["resources"], updatedResources);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousResources };
    },

    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "resources_translations.module_success_messages.resource_updated_msg",
        ),
      });
    },
    onError: (_error, _newResources, context) => {
      if (context?.previousResources) {
        queryClient.setQueryData(["resources"], context.previousResources);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
  return { ...mutation, isProcessing };
};

export default useUpdateResourceMutation;
