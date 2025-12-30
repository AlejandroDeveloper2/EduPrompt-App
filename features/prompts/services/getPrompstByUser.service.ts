import { axiosClient } from "@/core/config/axiosClient";

import { PaginatedResponse, ServerResponse } from "@/core/types";
import { Prompt, PromptFilters } from "../types";

export const getPromptsByUser = async (
  filters: PromptFilters
): Promise<PaginatedResponse<Prompt>> => {
  const { data } = await axiosClient.get<
    ServerResponse<PaginatedResponse<Prompt>>
  >("/prompts", {
    params: filters,
  });
  return data.data;
};
