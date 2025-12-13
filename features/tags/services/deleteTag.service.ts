import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const deleteTag = async (tagId: string): Promise<void> => {
  await axiosClient.delete<ServerResponse<null>>(`/tags/${tagId}`);
};
