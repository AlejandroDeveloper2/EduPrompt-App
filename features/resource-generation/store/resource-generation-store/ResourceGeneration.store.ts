import AsyncStorage from "expo-sqlite/kv-store";
import uuid from "react-native-uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { Process } from "@/core/types";
import {
  GenerationData,
  GenerationStepNameType,
  IaGeneration,
} from "../../types";
import {
  GenerationStorePersistedState,
  ResourceGenerationStoreType,
} from "./store-types";

import { showToast } from "@/shared/context";

import {
  formatDate,
  generateToastKey,
  setGenerationProcessName,
} from "@/shared/helpers";
import { calcAvarageProcessDuration } from "@/shared/utils";
import { buildNewGeneration, initialGenerationData } from "./helpers";

export const ResourceGenerationStore = create<ResourceGenerationStoreType>()(
  persist<ResourceGenerationStoreType, [], [], GenerationStorePersistedState>(
    (set, get) => ({
      iaGenerations: [],
      currentIaGeneration: null,
      getIaGeneration: (generationId: string): void => {
        const { iaGenerations } = get();
        const generation = iaGenerations.find(
          (gen) => gen.generationId === generationId
        );
        set({ currentIaGeneration: generation || null });
      },
      createIaGeneration: (): IaGeneration => {
        const { iaGenerations } = get();
        const generationTitle: string = `Generación ${formatDate(
          "es",
          new Date()
        )}`;
        const newGeneration: IaGeneration = buildNewGeneration(generationTitle);
        set({ iaGenerations: [...iaGenerations, newGeneration] });
        return newGeneration;
      },
      updateIaGeneration: (
        generationId,
        updatedData,
        updatedCurrentStep,
        updatedGeneration
      ): void => {
        const { iaGenerations, currentIaGeneration } = get();

        if (!currentIaGeneration) return;

        const { data, steps, currentStep } = currentIaGeneration;

        const updatedCurrentData: GenerationData = { ...data, ...updatedData };

        const updatedStep = { ...currentStep, ...updatedCurrentStep };

        const updatedSteps = steps.map((step) =>
          step.generationStepId === updatedStep.generationStepId
            ? { ...updatedStep }
            : step
        );

        const finalUpdatedGeneration: IaGeneration = {
          ...currentIaGeneration,
          ...updatedGeneration,
          currentStep: updatedStep,
          data: updatedCurrentData,
          steps: updatedSteps,
          generationId,
        };

        const updatedGenerations = iaGenerations.map((gen) =>
          gen.generationId === generationId ? finalUpdatedGeneration : gen
        );

        set({
          iaGenerations: updatedGenerations,
          currentIaGeneration: finalUpdatedGeneration,
        });
      },

      deleteIaGeneration: (generationId: string): void => {
        const { iaGenerations } = get();
        const updatedGenerations = iaGenerations.filter(
          (gen) => gen.generationId !== generationId
        );
        set({ iaGenerations: updatedGenerations });
      },

      setGenerationStep(
        generationId: string,
        stepId: GenerationStepNameType
      ): void {
        const { iaGenerations, updateIaGeneration } = get();
        const generation = iaGenerations.find(
          (gen) => gen.generationId === generationId
        );
        if (!generation) return;

        const currentStep = generation.steps.find(
          (step) => step.generationStepId === stepId
        );

        updateIaGeneration(
          generationId,
          {},
          currentStep || generation.steps[0],
          {}
        );
      },
      clearSelectedGeneration: (): void => {
        set({ currentIaGeneration: null });
      },
      reinitGeneration: (generationId: string): void => {
        const { iaGenerations } = get();
        const updatedGenerations = iaGenerations.map((generation) => {
          if (generation.generationId === generationId) {
            const updatedSteps = generation.steps.map((step) => ({
              ...step,
              completed: false,
            }));
            return {
              ...generation,
              generationCompleted: false,
              steps: updatedSteps,
              currentStep: updatedSteps[0],
              data: initialGenerationData,
            };
          }
          return generation;
        });
        set({ iaGenerations: updatedGenerations });
      },
      createAndSelectNewGeneration: (): void => {
        const { currentIaGeneration, deleteIaGeneration, createIaGeneration } =
          get();

        if (!currentIaGeneration) return;

        deleteIaGeneration(currentIaGeneration.generationId);

        const newGeneration = createIaGeneration();

        set({ currentIaGeneration: newGeneration });
      },
      clearAndRemoveSelectedGeneration: (): void => {
        const {
          currentIaGeneration,
          deleteIaGeneration,
          clearSelectedGeneration,
        } = get();

        if (!currentIaGeneration) return;

        deleteIaGeneration(currentIaGeneration.generationId);

        clearSelectedGeneration();
      },
      editSelectedGeneration: (): void => {
        const { currentIaGeneration, setGenerationStep, getIaGeneration } =
          get();

        if (!currentIaGeneration) return;

        setGenerationStep(
          currentIaGeneration.generationId,
          "resource_type_selection"
        );

        getIaGeneration(currentIaGeneration.generationId);
      },
      executeIaGeneration: async (
        canGenerate,
        genCallback,
        descriptionPrompt
      ): Promise<void> => {
        const { currentIaGeneration, updateIaGeneration } = get();

        if (!currentIaGeneration) return;
        if (!currentIaGeneration.generationCompleted) return;

        const formatKey = currentIaGeneration.data.resourceFormat.formatKey;

        if (!canGenerate(formatKey)) {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message:
              "Tokens insuficientes para generar este recurso, recarga mas tokens.",
          });
          return;
        }
        const { generationId, data } = currentIaGeneration;

        updateIaGeneration(
          generationId,
          descriptionPrompt
            ? {
                resourceDescriptionPrompt: descriptionPrompt,
              }
            : {},
          { completed: true },
          {
            isGenerating: true,
            canDelete: false,
          }
        );
        const processName = setGenerationProcessName(
          `${data.resourceType.resourceTypeLabel} -
                ${data.subjectName}`
        );

        const newTask: Process = {
          processId: uuid.v4(),
          startTime: Date.now(),
          type: "generation",
          processName,
          progressConfig: {
            mode: "duration-timer",
            limit: calcAvarageProcessDuration(processName) ?? 10000,
          },
          progress: 0,
          state: "in-progress",
        };

        await genCallback(newTask, currentIaGeneration);
      },
    }),
    {
      name: ASYNC_STORAGE_KEYS.generations,
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
      partialize: (state) => ({
        iaGenerations: state.iaGenerations,
        currentIaGeneration: state.currentIaGeneration,
      }),
    }
  )
);
