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
  selectedGenerations: IaGeneration[];

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
  selectAllGenerations: (
    updateSelectedItems: (selectedItems: number) => void
  ) => void;
  selectGeneration: (
    generation: IaGeneration,
    updateSelectedItems: (selectedItems: number) => void
  ) => void;
  unselectGeneration: (
    generationId: string,
    updateSelectedItems: (selectedItems: number) => void
  ) => void;
  deleteSelectedGenerations: (disableSelectionMode: () => void) => void;
  deleteIaGeneration: (generationId: string) => void;
  reinitGeneration: (generationId: string) => void;
  reinitSelectedGenerations: (disableSelectionMode: () => void) => void;
  clearSelectionList: (
    updateSelectedItems: (selectedItems: number) => void
  ) => void;

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
