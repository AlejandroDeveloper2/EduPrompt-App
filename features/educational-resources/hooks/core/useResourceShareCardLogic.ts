import { useShallow } from "zustand/react/shallow";

import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useResourcesSelectionStore } from "../../store";
import useResourceTags from "./useResourceTags";

const useResourceShareCardLogic = () => {
  const { t } = useTranslations();
  const size = useResponsive();
  const toggleSelection = useResourcesSelectionStore(
    useShallow((state) => state.toggleSelection),
  );
  const { tags } = useResourceTags();

  return {
    t,
    size,
    tags,
    toggleSelection,
  };
};

export default useResourceShareCardLogic;
