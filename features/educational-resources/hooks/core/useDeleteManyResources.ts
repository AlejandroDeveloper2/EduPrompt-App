import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useSelectionModeStore } from "@/shared/hooks/store";
import { useDeleteManyResourcesMutation } from "../mutations";
import { useOfflineResourcesStore, useResourcesSelectionStore } from "../store";

import { generateToastKey } from "@/shared/helpers";

const useDeleteManyResources = () => {
  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { disableSelectionMode } = useSelectionModeStore();
  const { selectedResourceIds } = useResourcesSelectionStore();

  /** Offline */
  const { isProcessing, deleteManyResources } = useOfflineResourcesStore();

  /** Online */
  const { mutate, isPending } = useDeleteManyResourcesMutation();

  const removeManyResources = useCallback(async () => {
    /** Eliminación  offline inmediata */
    await deleteManyResources();

    if (!isAuthenticated)
      await queryClient.refetchQueries({ queryKey: ["prompts"] });

    /** Eliminación online */
    if (isConnected && isAuthenticated) {
      const selectedResources = Array.from(selectedResourceIds);
      mutate(selectedResources);
    }
    disableSelectionMode();
    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: "Recursos educativos eliminados correctamente",
    });
  }, [
    isAuthenticated,
    isConnected,
    mutate,
    deleteManyResources,
    queryClient,
    disableSelectionMode,
    selectedResourceIds,
  ]);

  return {
    isPending: isConnected && isAuthenticated ? isPending : isProcessing,
    removeManyResources,
  };
};

export default useDeleteManyResources;
