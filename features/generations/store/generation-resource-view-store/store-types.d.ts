import { EducationalResource } from "@/features/educational-resources/types";

export interface StoreStateProps {
  selectedResource: EducationalResource | null;
  isTagSelection: boolean;
}

export interface StoreActions {
  setIsTagSelection: (value: boolean) => void;
  reset: () => void;
}

export type GenerationResourceViewStoreType = StoreStateProps & StoreActions;
