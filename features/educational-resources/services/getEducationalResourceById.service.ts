import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { EducationalResource } from "../types";

export const getEducationalResourceById = async (
  resourceId: string
): Promise<EducationalResource> => {
  const { data } = await axiosClient.get<ServerResponse<EducationalResource>>(
    `/resources/${resourceId}`
  );
  return data.data;
};
