import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";

import { EducationalResource } from "../../types";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useResourcePreviewStore } from "../../store";
import { useDeleteDialogContext } from "../context";
import useResourceTags from "./useResourceTags";

const useResourceListUI = () => {
  const router = useRouter();
  const size = useResponsive();
  const { t, lang } = useTranslations();

  const confirmResourceDeleteDialog = useDeleteDialogContext();

  const paginatedTags = useResourceTags();

  const actions = useMemo(
    () =>
      SELECTION_MODE_ACTIONS(confirmResourceDeleteDialog.openAlert, () =>
        router.navigate("/(app)/resources_sharing_sheet"),
      ),
    [confirmResourceDeleteDialog, router],
  );

  const handleViewResource = useCallback(
    (resource: EducationalResource) => {
      useResourcePreviewStore.getState().setSelectedResource(resource);
      router.navigate("/(app)/update_resource_sheet");
    },
    [router],
  );

  return {
    router,
    size,
    t,
    lang,
    actions,
    paginatedTags,
    confirmResourceDeleteDialog,
    handleViewResource,
  };
};

export default useResourceListUI;
