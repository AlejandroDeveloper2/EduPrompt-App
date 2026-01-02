import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const deleteManyResources = async (
  resourceIds: string[]
): Promise<void> => {
  await axiosClient.delete<ServerResponse<null>>("/resources", {
    data: { resourceIds },
  });
};
