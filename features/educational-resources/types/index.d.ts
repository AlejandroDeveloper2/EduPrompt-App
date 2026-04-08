type ResourceFormatKey = "text" | "image" | "chart" | "table";

interface EducationalResource {
  resourceId: string;
  title: string;
  content: string;
  format: string;
  formatKey: ResourceFormatKey;
  groupTag: string;
  creationDate: Date;
  sync: boolean;
}

type CreateResourcePayload = Omit<EducationalResource, "creationDate" | "sync">;
type UpdateResourcePayload = Pick<
  EducationalResource,
  "title" | "groupTag" | "resourceId"
>;

interface SyncResourcesPayload {
  resources: EducationalResource[];
}

interface ResourceFilters {
  page?: string | undefined;
  limit?: string | undefined;
  formatKey?: ResourceFormatKey | undefined;
  tag?: string | undefined;
  title?: string | undefined;
}

type BaseFilters = Omit<ResourceFilters, "page" | "limit">;

interface FileMetadata {
  fileId: string;
  name: string;
  fileExtension: string;
  fileUri: string;
  format: string;
  formatKey: ResourceFormatKey;
  downloadDate: string;
  fileSize: string;
}

export type {
  BaseFilters,
  CreateResourcePayload,
  EducationalResource,
  FileMetadata,
  ResourceFilters,
  ResourceFormatKey,
  SyncResourcesPayload,
  UpdateResourcePayload,
};
