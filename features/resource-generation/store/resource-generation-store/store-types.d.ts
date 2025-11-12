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
  getIaGeneration: (generationId: string) => void;
  createIaGeneration: () => IaGeneration;
  updateIaGeneration: (
    generationId: string,
    updatedData: Partial<GenerationData>,
    updatedCurrentStep: Partial<GenerationStep>,
    updatedGeneration: Partial<IaGeneration>
  ) => void;
  deleteIaGeneration: (generationId: string) => void;
  clearSelectedGeneration: () => void;
  setGenerationStep: (
    generationId: string,
    stepId: GenerationStepNameType
  ) => void;
  reinitGeneration: (generationId: string) => void;
  createAndSelectNewGeneration: () => void;
  clearAndRemoveSelectedGeneration: () => void;
  editSelectedGeneration: () => void;
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
