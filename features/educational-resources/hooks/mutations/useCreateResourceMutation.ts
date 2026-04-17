import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateResourcePayload, EducationalResource } from "../../types";

import { postEducationalResource } from "../../services";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineResourcesStore } from "../store";

import { eventBus } from "@/core/events/EventBus";
import { generateToastKey } from "@/shared/helpers";

const useCreateResourceMutation = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { t } = useTranslations();

  /** Offline */
  const { createResource, updateResourcesSyncStatus } =
    useOfflineResourcesStore();

  return useMutation({
    mutationFn: async (payload) => {
      /** Creación  offline inmediata */
      const addedResource = await createResource(payload);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["resources"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        await postEducationalResource(payload);
        await updateResourcesSyncStatus(true, addedResource.resourceId);
      }
    },
    onMutate: async (createResourcePayload: CreateResourcePayload) => {
      await queryClient.cancelQueries({ queryKey: ["resources"] });
      // Obtener el estado actual
      const previousResources = queryClient.getQueryData<EducationalResource[]>(
        ["resources"],
      );

      // Actualizar cache de manera optimista
      if (previousResources) {
        queryClient.setQueryData(
          ["resources"],
          [...previousResources, createResourcePayload],
        );
      }

      // Retornar el contexto para rollback en caso de error
      return { previousResources };
    },

    onSuccess: () => {
      eventBus.emit("dashboard.addSavedResources", undefined);
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "resources_translations.module_success_messages.resource_created_msg",
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
};

export default useCreateResourceMutation;
