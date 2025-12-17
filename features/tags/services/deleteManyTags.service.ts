import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const deleteManyTags = async (tagIds: string[]): Promise<void> => {
  await axiosClient.delete<ServerResponse<null>>("/tags", { data: { tagIds } });
};
