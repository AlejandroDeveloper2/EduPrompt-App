import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { SyncResourcesPayload } from "../types";

export const postSyncResources = async (
  syncResourcesPayload: SyncResourcesPayload
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>(
    "/resources/sync",
    syncResourcesPayload
  );
};
