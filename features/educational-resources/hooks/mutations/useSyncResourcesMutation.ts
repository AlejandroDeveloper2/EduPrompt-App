import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { EducationalResource } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useOfflineResourcesStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { syncData } from "@/shared/utils";

import { postSyncResources } from "../../services";

const useSyncResourcesMutation = () => {
  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const isAuthenticated = useEventbusValue("auth.authenticated", false);
  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const { updateResourcesSyncStatus, findAllResources } =
    useOfflineResourcesStore();

  const { t } = useTranslations();

  const mutation = useMutation({
    mutationFn: postSyncResources,
    onMutate: async (syncResourcesPayload) => {
      const { resources } = syncResourcesPayload;
      await queryClient.cancelQueries({ queryKey: ["resources"] });

      // Obtener el estado actual
      const previousResources = queryClient.getQueryData<EducationalResource[]>(
        ["resources"]
      );

      // Actualizar cache de manera optimista
      if (previousResources) {
        let updatedResources: Omit<EducationalResource, "sync">[] = [
          ...previousResources,
        ];
        resources.forEach((resource) => {
          const prevResource = previousResources.find(
            (r) => r.resourceId === r.resourceId
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
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "resources-translations.module-success-messages.resources-synced-msg"
        ),
      });
    },
    onError: (error, _newResources, context) => {
      if (context?.previousResources) {
        queryClient.setQueryData(["resources"], context.previousResources);
      }
    },
    onSettled: () => {
      updateResourcesSyncStatus(true);
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });

  useEffect(() => {
    const handleSync = async () => {
      if (userProfile && userProfile.userPreferences.autoSync) {
        const resources = await findAllResources();
        syncData(
          isConnected,
          isAuthenticated,
          resources.every((r) => r.sync),
          async () => {
            mutation.mutate({ resources });
          }
        );
      }
    };
    handleSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isAuthenticated, userProfile]);

  const syncResources = useCallback(async () => {
    const resources = await findAllResources();
    syncData(
      isConnected,
      isAuthenticated,
      resources.every((r) => r.sync),
      () => {
        mutation.mutate({ resources });
      }
    );
  }, [isAuthenticated, isConnected, mutation, findAllResources]);

  return {
    ...mutation,
    syncResources,
  };
};

export default useSyncResourcesMutation;
