import { axiosClient } from "@/core/config/axiosClient";

import { PaginatedResponse, ServerResponse } from "@/core/types";
import { Tag, TagFilters } from "../types";

export const getTags = async (
  filters: TagFilters
): Promise<PaginatedResponse<Tag>> => {
  const { data } = await axiosClient.get<
    ServerResponse<PaginatedResponse<Tag>>
  >("/tags", {
    params: filters,
  });
  return data.data;
};
