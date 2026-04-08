import { PaginatedResponse } from "@/core/types";
import {
  CreateResourcePayload,
  EducationalResource,
  ResourceFilters,
  UpdateResourcePayload,
} from "../../types";

export interface StoreStateProps {
  isProcessing: boolean;
  isLoading: boolean;
  isSharing: boolean;
}

export interface StoreActions {
  createResource: (
    createResourcePayload: CreateResourcePayload,
    toast?: boolean,
  ) => Promise<EducationalResource>;
  findResources: (
    filters: ResourceFilters,
  ) => Promise<PaginatedResponse<EducationalResource>>;
  findResourceById: (resourceId: string) => Promise<EducationalResource | null>;
  updateResource: (
    updateResourcePayload: UpdateResourcePayload,
  ) => Promise<EducationalResource>;
  deleteManyResources: () => Promise<void>;
  updateResourcesSyncStatus: (
    sync: boolean,
    resourceId?: string,
  ) => Promise<void>;
  findAllResources: () => Promise<EducationalResource[]>;
  shareResources: (groupName: string) => Promise<void>;
}

export type OfflineResourcesStoreType = StoreStateProps & StoreActions;
