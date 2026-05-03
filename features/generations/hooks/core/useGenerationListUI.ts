import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useResourceGenerationStore } from "../../store";

const useGenerationListUI = () => {
  const size = useResponsive();
  const { t } = useTranslations();

  const { deleteSelectedGenerations, reinitSelectedGenerations } =
    useResourceGenerationStore(
      useShallow((state) => ({
        deleteSelectedGenerations: state.deleteSelectedGenerations,
        reinitSelectedGenerations: state.reinitSelectedGenerations,
      })),
    );

  const actions = useMemo(
    () =>
      SELECTION_MODE_ACTIONS(
        deleteSelectedGenerations,
        reinitSelectedGenerations,
      ),
    [deleteSelectedGenerations, reinitSelectedGenerations],
  );

  return {
    size,
    t,
    actions,
  };
};

export default useGenerationListUI;
