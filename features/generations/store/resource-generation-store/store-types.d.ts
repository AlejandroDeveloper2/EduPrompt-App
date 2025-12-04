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

  /** Selection mode actions */
  selectAllGenerations: () => void;
  selectGeneration: (generationId: string) => void;
  unselectGeneration: (generationId: string) => void;
  deleteSelectedGenerations: (disableSelectionMode: () => void) => void;
  deleteIaGeneration: (generationId: string) => void;
  reinitGeneration: (generationId: string) => void;
  reinitSelectedGenerations: (disableSelectionMode: () => void) => void;
  clearSelectionList: () => void;

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
