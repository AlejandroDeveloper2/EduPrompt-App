import { PaginatedResponse } from "@/core/types";
import {
  CreateTagPayload,
  Tag,
  TagFilters,
  UpdateTagPayload,
} from "../../types";

export interface StoreActions {
  isProcessing: boolean;
  isLoading: boolean;
  createTag: (createTagPayload: CreateTagPayload) => Promise<Tag>;
  findTags: (filters: TagFilters) => Promise<PaginatedResponse<Tag>>;
  findTagById: (tagId: string) => Promise<Tag | null>;
  updateTag: (updateTagPayload: UpdateTagPayload) => Promise<Tag>;
  deleteTag: (tagId: string) => Promise<void>;
  updateTagsSyncStatus: (sync: boolean, tagId?: string) => Promise<void>;
  findAllTags: () => Promise<Tag[]>;
}

export type OfflineTagsStoreType = StoreActions;
