import { Tab, ViewerType } from "@/core/types";
import { EducationalResource } from "../../types";

export interface StoreStateProps {
  selectedResource: EducationalResource | null;
  activePreviewTab: Tab;
  isTagSelection: boolean;
  viewerType: ViewerType;
}

export interface StoreActions {
  setSelectedResource: (resource: EducationalResource | null) => void;
  setActivePreviewTab: (tab: Tab) => void;
  setIsTagSelection: (value: boolean) => void;
  reset: () => void;
}

export type ResourcePreviewStoreType = StoreStateProps & StoreActions;
