import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { UpdateResourcePayload } from "../types";

export const patchResource = async (
  updateResourcePayload: UpdateResourcePayload
): Promise<void> => {
  const { title, groupTag, resourceId } = updateResourcePayload;
  await axiosClient.patch<ServerResponse<null>>(`/resources/${resourceId}`, {
    title,
    groupTag,
  });
};
