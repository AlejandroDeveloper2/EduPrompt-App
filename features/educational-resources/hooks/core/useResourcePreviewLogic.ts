import { useRouter } from "expo-router";
import { useMemo } from "react";

import { useTranslations } from "@/shared/hooks/core";
import { useResourcePreviewStore } from "../../store";
import useUpdateResourceFormLogic from "./useUpdateResourceFormLogic";

import { RESOURCE_PREVIEW_TABS } from "../../components/organims/preview-resource-list/constants";

const useResourcePreviewLogic = () => {
  const router = useRouter();
  const { t } = useTranslations();

  const {
    selectedResource,
    activePreviewTab,
    isTagSelection,
    viewerType,
    setActivePreviewTab,
    setIsTagSelection,
    reset,
  } = useResourcePreviewStore();

  const resourcePreviewTabs = useMemo(() => RESOURCE_PREVIEW_TABS(t), [t]);

  const handleClose = () => {
    reset();
    router.navigate("/(app)/(tabs)/resources_screen");
  };

  const { isPending, selectedTag, form } = useUpdateResourceFormLogic(
    selectedResource,
    handleClose,
  );

  return {
    selectedResource,
    activePreviewTab,
    isTagSelection,
    viewerType,
    resourcePreviewTabs,
    setActivePreviewTab,
    setIsTagSelection,
    isPending,
    selectedTag,
    form,
    handleClose,
    t,
  };
};

export default useResourcePreviewLogic;
