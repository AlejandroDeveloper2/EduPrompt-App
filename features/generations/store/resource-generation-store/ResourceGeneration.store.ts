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

import { eventBus } from "@/core/events/EventBus";

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

      /** Management actions */
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
      clearSelectedGeneration: (): void => {
        set({ currentIaGeneration: null });
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
      createAndSelectNewGeneration: (): void => {
        const {
          currentIaGeneration,
          deleteIaGeneration,
          createIaGeneration,
          getIaGeneration,
          updateIaGeneration,
        } = get();

        if (!currentIaGeneration) return;

        updateIaGeneration(
          currentIaGeneration.generationId,
          {},
          {},
          { isGenerating: false, canDelete: true, result: null }
        );

        deleteIaGeneration(currentIaGeneration.generationId);

        const newGeneration = createIaGeneration();

        set({ currentIaGeneration: newGeneration });

        getIaGeneration(newGeneration.generationId);
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
        const {
          currentIaGeneration,
          setGenerationStep,
          getIaGeneration,
          updateIaGeneration,
        } = get();

        if (!currentIaGeneration) return;

        updateIaGeneration(
          currentIaGeneration.generationId,
          {},
          {},
          { isGenerating: false, canDelete: true, result: null }
        );

        setGenerationStep(
          currentIaGeneration.generationId,
          "resource_type_selection"
        );

        getIaGeneration(currentIaGeneration.generationId);
      },

      /** Selection mode actions */
      selectAllGenerations: (): void => {
        set(({ iaGenerations }) => {
          const updated: IaGeneration[] = iaGenerations.map((g) => ({
            ...g,
            isSelected: true,
          }));
          eventBus.emit(
            "selectionMode.selectedElements.updated",
            updated.length
          );
          return { iaGenerations: updated };
        });
      },
      selectGeneration: (generationId: string): void => {
        set(({ iaGenerations }) => {
          const updated = iaGenerations.map((g) => {
            if (g.generationId === generationId)
              return { ...g, isSelected: true };
            return g;
          });

          const selectedGenerations: number = updated.filter(
            (g) => g.isSelected
          ).length;

          eventBus.emit(
            "selectionMode.selectedElements.updated",
            selectedGenerations
          );
          return {
            iaGenerations: updated,
          };
        });
      },
      unselectGeneration: (generationId: string): void => {
        const { iaGenerations } = get();
        const updated = iaGenerations.map((g) => {
          if (g.generationId === generationId)
            return { ...g, isSelected: false };
          return g;
        });
        const selectedGenerations: number = updated.filter(
          (g) => g.isSelected
        ).length;
        eventBus.emit(
          "selectionMode.selectedElements.updated",
          selectedGenerations
        );
        set({ iaGenerations: updated });
      },
      deleteIaGeneration: (generationId: string): void => {
        const { iaGenerations } = get();
        const updatedGenerations = iaGenerations.filter(
          (gen) => gen.generationId !== generationId
        );
        set({ iaGenerations: updatedGenerations });
      },
      deleteSelectedGenerations: (disableSelectionMode: () => void): void => {
        const { iaGenerations } = get();

        const updated = iaGenerations.filter((g) => !g.isSelected);

        set({ iaGenerations: updated });

        disableSelectionMode();

        eventBus.emit("selectionMode.selectedElements.updated", 0);
      },
      clearSelectionList: (): void => {
        set(({ iaGenerations }) => {
          const updated: IaGeneration[] = iaGenerations.map((g) => ({
            ...g,
            isSelected: false,
          }));
          eventBus.emit("selectionMode.selectedElements.updated", 0);
          return { iaGenerations: updated };
        });
      },
      reinitSelectedGenerations: (disableSelectionMode: () => void): void => {
        const { iaGenerations } = get();
        const updated = iaGenerations.map((generation) => {
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
        });
        set({ iaGenerations: updated });
        disableSelectionMode();
      },

      /** Generation Actions */
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
          `${data.resourceType.resourceTypeLabel} - ${data.subjectName}`
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
