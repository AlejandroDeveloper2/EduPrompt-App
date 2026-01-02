import { axiosClient } from "@/core/config/axiosClient";

import { PaginatedResponse, ServerResponse } from "@/core/types";
import { EducationalResource, ResourceFilters } from "../types";

export const getEducationalResourcesByUser = async (
  filters: ResourceFilters
): Promise<PaginatedResponse<EducationalResource>> => {
  const { data } = await axiosClient.get<
    ServerResponse<PaginatedResponse<EducationalResource>>
  >("/resources", { params: filters });

  return data.data;
};
