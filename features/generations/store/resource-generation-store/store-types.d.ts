import { Process } from "@/core/types";

import {
  GenerationData,
  GenerationStep,
  GenerationStepNameType,
  IaGeneration,
  ResourceFormatKey,
} from "../../types";

export interface ResourceGenerationStoreType {
  iaGenerations: IaGeneration[];
  currentIaGeneration: IaGeneration | null;

  /** Management actions */
  getIaGeneration: (generationId: string) => void;
  createIaGeneration: () => IaGeneration;
  updateIaGeneration: (
    generationId: string,
    updatedData: Partial<GenerationData>,
    updatedCurrentStep: Partial<GenerationStep>,
    updatedGeneration: Partial<IaGeneration>
  ) => void;
  clearSelectedGeneration: () => void;
  setGenerationStep: (
    generationId: string,
    stepId: GenerationStepNameType
  ) => void;
  createAndSelectNewGeneration: () => void;
  clearAndRemoveSelectedGeneration: () => void;
  editSelectedGeneration: () => void;
  deleteSelectedGenerations: () => void;
  deleteIaGeneration: (generationId: string) => void;
  reinitSelectedGenerations: () => void;

  /** Generation Actions */
  executeIaGeneration: (
    canGenerate: (formatKey: ResourceFormatKey) => boolean,
    genCallback: (
      newTask: Process,
      currentIaGeneration: IaGeneration
    ) => Promise<void>,
    descriptionPrompt?: string
  ) => Promise<void>;
}

export type GenerationStorePersistedState = Pick<
  ResourceGenerationStoreType,
  "iaGenerations" | "currentIaGeneration"
>;
