import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { UpdateResourcePayload } from "../../types";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdateResourceMutation } from "../mutations";
import { useOfflineResourcesStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

const useUpdateResource = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  /** Offline */
  const { isProcessing, updateResource, updateResourcesSyncStatus } =
    useOfflineResourcesStore();

  /** Online */
  const { mutate, isPending } = useUpdateResourceMutation();

  const { t } = useTranslations();

  const editResource = useCallback(
    async (updateResourcePayload: UpdateResourcePayload) => {
      /** Actualización  offline inmediata */
      const updatedResource = await updateResource(updateResourcePayload);

      if (!isAuthenticated)
        await queryClient.refetchQueries({ queryKey: ["resources"] });

      /** Creacion online */
      if (isConnected && isAuthenticated) {
        mutate(updateResourcePayload);
        await updateResourcesSyncStatus(true, updatedResource.resourceId);
      }

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "resources-translations.module-success-messages.resource-updated-msg"
        ),
      });
    },
    [
      isAuthenticated,
      isConnected,
      mutate,
      updateResource,
      updateResourcesSyncStatus,
      queryClient,
      t,
    ]
  );

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    editResource,
  };
};

export default useUpdateResource;
