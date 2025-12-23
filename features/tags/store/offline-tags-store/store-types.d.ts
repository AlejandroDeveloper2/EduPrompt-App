import { PaginatedResponse } from "@/core/types";
import {
  CreateTagPayload,
  Tag,
  TagFilters,
  UpdateTagPayload,
} from "../../types";

export interface StoreStateProps {
  isProcessing: boolean;
  isLoading: boolean;
}

export interface StoreActions {
  createTag: (
    createTagPayload: CreateTagPayload,
    toast?: boolean
  ) => Promise<Tag>;
  findTags: (filters: TagFilters) => Promise<PaginatedResponse<Tag>>;
  findTagById: (tagId: string) => Promise<Tag | null>;
  updateTag: (updateTagPayload: UpdateTagPayload) => Promise<Tag>;
  deleteManyTags: () => Promise<void>;
  updateTagsSyncStatus: (sync: boolean, tagId?: string) => Promise<void>;
  findAllTags: () => Promise<Tag[]>;
}

export type OfflineTagsStoreType = StoreStateProps & StoreActions;
