type TagType = "prompt_tag" | "resource_tag";

interface CreateTagPayload {
  tagId: string;
  name: string;
  type: TagType;
}

interface UpdateTagPayload extends Partial<Omit<CreateTagPayload, "tagId">> {
  tagId: string;
}
interface SyncTagsPayload {
  tags: Tag[];
}

interface Tag {
  tagId: string;
  name: string;
  type: TagType;
  sync: boolean;
}

interface TagFilters {
  type: TagType;
  name?: string | undefined;
  page?: string | undefined;
  limit?: string | undefined;
}

type BaseFilters = Omit<TagFilters, "page" | "limit">;

export type {
  BaseFilters,
  CreateTagPayload,
  SyncTagsPayload,
  Tag,
  TagFilters,
  TagType,
  UpdateTagPayload,
};
