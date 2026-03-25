/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Prompt } from "@/features/prompts/types";
import { GenerationData } from "../../types";

import {
  ResourceDescriptionFormData,
  resourceDescriptionFormSchema,
} from "../../components/organims/resource-description-form/validationSchema";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import {
  useBackgroundTaskRunner,
  useCheckPremium,
  useForm,
  useTranslations,
} from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useGenerateResourceMutation } from "../mutations";
import { useGenerationsStore } from "../store";

import { getResourcePrice } from "../../helpers";

const initialValues: ResourceDescriptionFormData = {
  descriptionPrompt: "",
};

const useResourceDescriptionFormLogic = () => {
  const [isTagSelection, setIsTagSelection] = useState<boolean>(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const {
    currentIaGeneration,
    setGenerationStep,
    executeIaGeneration,
    updateIaGeneration,
  } = useGenerationsStore();

  const { mutateAsync, isPending } = useGenerateResourceMutation();
  const { runBackgroundTask } = useBackgroundTaskRunner();
  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const paginatedPrompts = useEventbusValue("prompts.list.pagination.updated", {
    prompts: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const isPremium = useCheckPremium();

  const { t } = useTranslations();

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
      await executeIaGeneration(
        (formatKey) => {
          return userProfile
            ? userProfile.tokenCoins >= getResourcePrice(formatKey) || isPremium
            : false;
        },
        async (newTask, currentIaGeneration) => {
          await runBackgroundTask(
            newTask,
            async () => {
              const updatedGenerationData: GenerationData = {
                ...currentIaGeneration.data,
                resourceDescriptionPrompt: data.descriptionPrompt,
              };
              await mutateAsync(updatedGenerationData);
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
        data.descriptionPrompt,
      );
    },
    noReset: true,
  });

  const savePromptPopUp = useAnimatedPopUp();
  const selectPromptPopUp = useAnimatedPopUp();

  useEffect(() => {
    if (!currentIaGeneration) return;
    const { steps, generationId } = currentIaGeneration;
    const totalSteps: number = steps.length;
    const isCompletedSteps: boolean =
      steps.filter((step) => step.completed === true).length >= totalSteps - 1;

    if (isCompletedSteps)
      updateIaGeneration(generationId, {}, {}, { generationCompleted: true });
  }, []);

  useEffect(() => {
    if (!currentIaGeneration) return;
    const { data: currentData } = currentIaGeneration;
    setValues({
      descriptionPrompt: currentData.resourceDescriptionPrompt,
    });
  }, [currentIaGeneration]);

  useEffect(() => {
    if (selectedPrompt)
      setValues({ descriptionPrompt: selectedPrompt.promptText });
  }, [selectedPrompt]);

  return {
    currentIaGeneration,
    setGenerationStep,
    isTagSelection,
    setIsTagSelection,
    selectedPrompt,
    setSelectedPrompt,
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
    paginatedPrompts,
    t,
  };
};

export default useResourceDescriptionFormLogic;
