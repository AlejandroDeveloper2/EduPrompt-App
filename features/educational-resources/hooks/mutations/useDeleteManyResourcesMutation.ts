import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { EducationalResource } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import {
  useOfflineResourcesStore,
  useResourcesSelectionStore,
} from "../../store";
import { useResources } from "../core";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { deleteManyResources } from "../../services";

const getSyncedResources = (
  resources: EducationalResource[],
  selectedResourceIds: string[],
): string[] => {
  let selectedResources: EducationalResource[] = [];
  resources.forEach((resource) => {
    if (selectedResourceIds.includes(resource.resourceId))
      selectedResources.push(resource);
  });
  const syncedResourceIds = selectedResources
    .filter((r) => r.sync)
    .map((r) => r.resourceId);

  return syncedResourceIds;
};

const useDeleteManyResourcesMutation = () => {
  const queryClient = useQueryClient();

  const { t } = useTranslations();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const toggleSelectionMode = useResourcesSelectionStore(
    useShallow((state) => state.toggleSelectionMode),
  );

  const { resources } = useResources();

  /** Offline */
  const deleteManyOffline = useOfflineResourcesStore(
    useShallow((state) => state.deleteManyResources),
  );

  return useMutation({
    mutationFn: async (selectedResourceIds: string[]) => {
      /** Eliminación  offline inmediata */
      await deleteManyOffline();

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["resources"] });

      /** Eliminación online */
      if (isConnected && isAuthenticated) {
        const syncedResources = getSyncedResources(
          resources,
          selectedResourceIds,
        );
        await deleteManyResources(syncedResources);
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
      toggleSelectionMode(false);
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
