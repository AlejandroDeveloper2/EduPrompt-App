import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { CreateResourcePayload } from "../types";

export const postEducationalResource = async (
  createResourcePayload: CreateResourcePayload
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>(
    "/resources",
    createResourcePayload
  );
};
