import {
  GenerationData,
  GenerationStep,
  GenerationStepNameType,
  IaGeneration,
} from "../../types";

export interface ResourceGenerationStoreType {
  iaGenerations: IaGeneration[];
  currentIaGeneration: IaGeneration | null;
  getIaGeneration: (generationId: string) => void;
  createIaGeneration: () => void;
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
}

export type GenerationStorePersistedState = Pick<
  ResourceGenerationStoreType,
  "iaGenerations" | "currentIaGeneration"
>;
