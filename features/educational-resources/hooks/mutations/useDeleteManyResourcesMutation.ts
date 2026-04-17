import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EducationalResource } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useSelectionModeStore } from "@/shared/hooks/store";
import { useOfflineResourcesStore } from "../store";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { deleteManyResources } from "../../services";

const useDeleteManyResourcesMutation = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { disableSelectionMode } = useSelectionModeStore();

  /** Offline */
  const { deleteManyResources: deleteManyOffline } = useOfflineResourcesStore();

  return useMutation({
    mutationFn: async (payload) => {
      /** Eliminación  offline inmediata */
      await deleteManyOffline();

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["resources"] });

      /** Eliminación online */
      if (isConnected && isAuthenticated) {
        await deleteManyResources(payload);
      }
    },
    onMutate: async (resourcesIds: string[]) => {
      await queryClient.cancelQueries({ queryKey: ["resources"] });
      // Obtener el estado actual
      const previousResources = queryClient.getQueryData<EducationalResource[]>(
        ["resources"],
      );

      // Actualizar cache de manera optimista
      if (previousResources) {
        const selectedResourceIds = new Set(resourcesIds);
        const updatedResources = previousResources.filter(
          (resource) => !selectedResourceIds.has(resource.resourceId),
        );
        queryClient.setQueryData(["resources"], updatedResources);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousResources };
    },
    onSuccess: () => {
      disableSelectionMode();
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "resources_translations.module_success_messages.resources_deleted_msg",
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

export default useDeleteManyResourcesMutation;
