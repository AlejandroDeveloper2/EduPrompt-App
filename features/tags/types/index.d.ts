type TagType = "prompt_tag" | "resource_tag";

interface CreateTagPayload {
  name: string;
  type: TagType;
}

interface UpdateTagPayload extends Partial<CreateTagPayload> {
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

export type {
  CreateTagPayload,
  SyncTagsPayload,
  Tag,
  TagFilters,
  TagType,
  UpdateTagPayload,
};
