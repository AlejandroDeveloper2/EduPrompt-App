/* eslint-disable react-hooks/exhaustive-deps */
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import uuid from "react-native-uuid";

import { showToast } from "@/shared/context";

import {
  ResourceDescriptionFormData,
  resourceDescriptionFormSchema,
} from "../../components/organims/resource-description-form/validationSchema";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useBackgroundTaskRunner, useForm } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useGenerateResource } from "../mutations";
import { useGenerationsStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { calcAvarageProcessDuration } from "@/shared/utils";
import { getResourcePrice, setGenerationProcessName } from "../../helpers";
import { GenerationData } from "../../types";

const initialValues: ResourceDescriptionFormData = {
  descriptionPrompt: "",
};

const useResourceDescriptionFormLogic = () => {
  const queryClient = useQueryClient();
  const { currentIaGeneration, updateIaGeneration, setGenerationStep } =
    useGenerationsStore();

  const { mutateAsync, isPending } = useGenerateResource();
  const { runBackgroundTask } = useBackgroundTaskRunner();

  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const {
    data,
    getFieldErrors,
    handleChange,
    handleClearInput,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: resourceDescriptionFormSchema,
    actionCallback: async () => {
      if (!currentIaGeneration) return;

      const formatKey = currentIaGeneration.data.resourceFormat.formatKey;
      const canGenerate: boolean = userProfile
        ? userProfile.tokenCoins >= getResourcePrice(formatKey)
        : false;

      if (!canGenerate) {
        showToast({
          key: generateToastKey(),
          variant: "danger",
          message:
            "Tokens insuficientes para generar este recurso, recarga mas tokens.",
        });
        return;
      }

      updateIaGeneration(
        currentIaGeneration.generationId,
        { resourceDescriptionPrompt: data.descriptionPrompt },
        { completed: true },
        {
          isGenerating: true,
          canDelete: false,
        }
      );
      const processName = setGenerationProcessName(
        currentIaGeneration.data.resourceType.resourceTypeLabel,
        currentIaGeneration.generationId
      );
      await runBackgroundTask(
        {
          processId: uuid.v4(),
          startTime: Date.now(),
          type: "generation",
          processName,
          progressConfig: {
            mode: "duration-timer",
            limit: calcAvarageProcessDuration(queryClient, processName) ?? 6000,
          },
          progress: 0,
          state: "in-progress",
        },
        async () => {
          const updatedGenerationData: GenerationData = {
            ...currentIaGeneration.data,
            resourceDescriptionPrompt: data.descriptionPrompt,
          };
          await mutateAsync(updatedGenerationData);
        }
      );
    },
    noReset: true,
  });

  const savePromptPopUp = useAnimatedPopUp();
  const selectPromptPopUp = useAnimatedPopUp();

  useEffect(() => {
    if (!currentIaGeneration) return;
    const { data: currentData } = currentIaGeneration;
    setValues({
      descriptionPrompt: currentData.resourceDescriptionPrompt,
    });
  }, [currentIaGeneration]);

  return {
    currentIaGeneration,
    setGenerationStep,
    form: {
      data,
      isPending,
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleSubmit,
    },
    popUps: {
      savePromptPopUp,
      selectPromptPopUp,
    },
  };
};

export default useResourceDescriptionFormLogic;
