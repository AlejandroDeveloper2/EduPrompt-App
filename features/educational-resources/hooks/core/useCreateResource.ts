import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { v4 as uuid } from "react-native-uuid/dist/v4";

import { CreateResourcePayload } from "../../types";

import { eventBus } from "@/core/events/EventBus";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useCreateResourceMutation } from "../mutations";
import { useOfflineResourcesStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

const useCreateResource = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { isProcessing, createResource, updateResourcesSyncStatus } =
    useOfflineResourcesStore();

  /** Online */
  const { mutate, isPending } = useCreateResourceMutation();

  const { t } = useTranslations();

  const addResource = useCallback(
    async (
      createResourcePayload: Omit<CreateResourcePayload, "resourceId">
    ) => {
      /** Creación  offline inmediata */
      const resourceId: string = uuid();
      const addedResource = await createResource({
        ...createResourcePayload,
        resourceId,
      });

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["resources"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        eventBus.emit("resources.createResource.started", undefined);
        mutate(
          { ...createResourcePayload, resourceId },
          {
            onSuccess: () => {
              eventBus.emit("resources.createResource.completed", undefined);
            },
            onError: (error) => {
              eventBus.emit("resources.createResource.failed", {
                error: String(error),
              });
            },
          }
        );
        await updateResourcesSyncStatus(true, addedResource.resourceId);
      }

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "resources-translations.module-success-messages.resource-created-msg"
        ),
      });
    },
    [
      isAuthenticated,
      isConnected,
      mutate,
      createResource,
      updateResourcesSyncStatus,
      queryClient,
      t,
    ]
  );

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    addResource,
  };
};
export default useCreateResource;
