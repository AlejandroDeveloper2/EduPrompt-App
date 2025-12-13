import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { CreateTagPayload } from "../types";

export const postTag = async (
  createTagPayload: CreateTagPayload
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/tags", createTagPayload);
};
