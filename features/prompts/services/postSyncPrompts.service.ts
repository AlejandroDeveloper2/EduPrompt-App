import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { SyncPromptsPayload } from "../types";

export const postSyncPrompts = async (
  syncPromptsPayload: SyncPromptsPayload
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>(
    "/prompts/sync",
    syncPromptsPayload
  );
};
