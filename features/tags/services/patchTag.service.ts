import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { UpdateTagPayload } from "../types";

export const patchTag = async (
  updateTagPayload: UpdateTagPayload
): Promise<void> => {
  const { tagId, name, type } = updateTagPayload;
  await axiosClient.patch<ServerResponse<null>>(`/tags/${tagId}`, {
    name,
    type,
  });
};
