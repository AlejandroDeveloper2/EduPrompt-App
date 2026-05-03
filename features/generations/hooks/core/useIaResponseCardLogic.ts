import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

import { ViewerType } from "@/core/types";
import { ResourceFormat } from "../../types";

import {
  useBackgroundTaskRunner,
  useResponsive,
  useTranslations,
} from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useResourceGenerationStore } from "../../store";
import { useGenerateResourceMutation } from "../mutations";

import { getResourcePrice } from "../../helpers";

const useIaResponseCardLogic = (format: ResourceFormat) => {
  const router = useRouter();

  const size = useResponsive();
  const { t } = useTranslations();

  const {
    createAndSelectNewGeneration,
    editSelectedGeneration,
    clearAndRemoveSelectedGeneration,
    executeIaGeneration,
  } = useResourceGenerationStore(
    useShallow((state) => ({
      createAndSelectNewGeneration: state.createAndSelectNewGeneration,
      editSelectedGeneration: state.editSelectedGeneration,
      clearAndRemoveSelectedGeneration: state.clearAndRemoveSelectedGeneration,
      executeIaGeneration: state.executeIaGeneration,
    })),
  );

  const { mutateAsync, isPending, data } = useGenerateResourceMutation();
  const { runBackgroundTask } = useBackgroundTaskRunner();
  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const onRegenerate = useCallback(() => {
    executeIaGeneration(
      (formatKey) => {
        return userProfile
          ? userProfile.tokenCoins >= getResourcePrice(formatKey)
          : false;
      },
      async (newTask, currentIaGeneration) => {
        await runBackgroundTask(
          newTask,
          async () => {
            await mutateAsync(currentIaGeneration.data);
          },
          {
            successNotification: {
              title: t(
                "generations_translations.ia_response_card_labels.generation_process_labels.success.title",
              ),
              message: `${t(
                "generations_translations.ia_response_card_labels.generation_process_labels.success.message",
              )} ${
                currentIaGeneration.data.resourceType.other ??
                currentIaGeneration.data.resourceType.resourceTypeLabel
              }`,
            },
            errorNotification: {
              title: t(
                "generations_translations.ia_response_card_labels.generation_process_labels.error.title",
              ),
              message: `${t(
                "generations_translations.ia_response_card_labels.generation_process_labels.error.message",
              )} ${
                currentIaGeneration.data.resourceType.other ??
                currentIaGeneration.data.resourceType.resourceTypeLabel
              }`,
            },
          },
        );
      },
    );
  }, [executeIaGeneration, mutateAsync, runBackgroundTask, t, userProfile]);

  const viewerType: ViewerType =
    format.formatKey === "text"
      ? "text"
      : format.formatKey === "image"
        ? "image"
        : "table/chart";

  return {
    router,
    size,
    t,
    viewerType,
    isPending,
    data,
    createAndSelectNewGeneration,
    editSelectedGeneration,
    clearAndRemoveSelectedGeneration,
    onRegenerate,
  };
};

export default useIaResponseCardLogic;
