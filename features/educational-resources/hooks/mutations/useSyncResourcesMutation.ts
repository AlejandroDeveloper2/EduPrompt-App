import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

import { EducationalResource } from "../../types";

import { useOfflineResourcesStore } from "../../store";

import { eventBus } from "@/core/events/EventBus";
import { postSyncResources } from "../../services";

const useSyncResourcesMutation = () => {
  const queryClient = useQueryClient();

  const { updateResourcesSyncStatus, findAllResources } =
    useOfflineResourcesStore(
      useShallow(({ updateResourcesSyncStatus, findAllResources }) => ({
        updateResourcesSyncStatus,
        findAllResources,
      })),
    );

  const mutation = useMutation({
    mutationFn: postSyncResources,
    onMutate: async (syncResourcesPayload) => {
      const { resources } = syncResourcesPayload;
      await queryClient.cancelQueries({ queryKey: ["resources"] });

      // Obtener el estado actual
      const previousResources = queryClient.getQueryData<EducationalResource[]>(
        ["resources"],
      );

      // Actualizar cache de manera optimista
      if (previousResources) {
        let updatedResources: Omit<EducationalResource, "sync">[] = [
          ...previousResources,
        ];
        resources.forEach((resource) => {
          const prevResource = previousResources.find(
            (r) => r.resourceId === r.resourceId,
          );
          if (!prevResource) return updatedResources.push(resource);
          return (updatedResources = updatedResources.map((r) => {
            if (r.resourceId === resource.resourceId)
              return { ...r, ...resource };
            return r;
          }));
        });
        queryClient.setQueryData(["resources"], updatedResources);
      }

      // Retornar el contexto para rollback en caso de error
      return { previousResources };
    },
    onSuccess: async () => {
      await updateResourcesSyncStatus(true);
    },
    onError: (error, _newResources, context) => {
      if (context?.previousResources) {
        queryClient.setQueryData(["resources"], context.previousResources);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });

  const syncResources = useCallback(async () => {
    eventBus.emit("resources.syncData.started", undefined);

    const resources = await findAllResources();
    mutation.mutate(
      { resources },
      {
        onSuccess: () =>
          eventBus.emit("resources.syncData.completed", undefined),
        onError: (error) =>
          eventBus.emit("resources.syncData.failed", { error: error.message }),
      },
    );
  }, [mutation, findAllResources]);

  return {
    ...mutation,
    syncResources,
  };
};

export default useSyncResourcesMutation;
