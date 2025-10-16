import { EducationalResource } from "../../types";

type LoadingFunction = (loading: boolean, message: string | null) => void;

export interface StoreStateProps {
  resources: EducationalResource[];
  resource: EducationalResource | null;
  selectionMode: boolean;
  selectedResources: EducationalResource[];
}

export interface StoreActions {
  findResources: (
    filters?: string,
    toggleLoading: LoadingFunction
  ) => Promise<void>;
  findResourceById: (
    resourceId: string,
    toggleLoading: LoadingFunction
  ) => Promise<void>;
  saveResourcePreview: (
    newResourcePreview: EducationalResource,
    toggleLoading: LoadingFunction
  ) => Promise<void>;
  modifyResourceName: (
    resourceId: string,
    updatedName: string,
    toggleLoading: LoadingFunction
  ) => Promise<void>;
  modifyResourceTag: (
    updatedTag: string,
    toggleLoading: LoadingFunction
  ) => Promise<void>;
  selectPreviewResources: (selectedResource: EducationalResource) => void;
  removePreviewResources: (toggleLoading: LoadingFunction) => Promise<void>;
}
