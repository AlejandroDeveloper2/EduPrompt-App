/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { GenerationData } from "../../types";

import {
  ResourceDescriptionFormData,
  resourceDescriptionFormSchema,
} from "../../components/organims/generation-forms/resource-description-form/validationSchema";

import {
  useBackgroundTaskRunner,
  useCheckPremium,
  useForm,
  useTranslations,
} from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import {
  useGenerationPromptViewStore,
  useResourceGenerationStore,
} from "../../store";
import { useGenerateResourceMutation } from "../mutations";

import { getResourcePrice } from "../../helpers";

const initialValues: ResourceDescriptionFormData = {
  descriptionPrompt: "",
};

const useResourceDescriptionFormLogic = () => {
  const {
    currentIaGeneration,
    setGenerationStep,
    executeIaGeneration,
    updateIaGeneration,
  } = useResourceGenerationStore(
    useShallow((state) => ({
      currentIaGeneration: state.currentIaGeneration,
      setGenerationStep: state.setGenerationStep,
      executeIaGeneration: state.executeIaGeneration,
      updateIaGeneration: state.updateIaGeneration,
    })),
  );
  const selectedPrompt = useGenerationPromptViewStore(
    useShallow((state) => state.selectedPrompt),
  );

  const { mutateAsync, isPending } = useGenerateResourceMutation();
  const { runBackgroundTask } = useBackgroundTaskRunner();
  const userProfile = useEventbusValue("userProfile.user.updated", null);

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
    updateIaGeneration,
    form: {
      data,
      isPending,
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleSubmit,
      setValues,
    },
    t,
  };
};

export default useResourceDescriptionFormLogic;
