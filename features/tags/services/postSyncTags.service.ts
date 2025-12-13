import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { SyncTagsPayload } from "../types";

export const postSyncTags = async (
  syncTagsPayload: SyncTagsPayload
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/tags/sync", syncTagsPayload);
};
