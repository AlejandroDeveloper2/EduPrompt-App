import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const deleteManyPrompts = async (promptIds: string[]): Promise<void> => {
  await axiosClient.delete<ServerResponse<null>>("/prompts", {
    data: { promptIds },
  });
};
