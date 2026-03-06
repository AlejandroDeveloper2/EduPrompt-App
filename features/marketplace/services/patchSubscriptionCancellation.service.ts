import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const patchSubscriptionCancellation = async (
  subscriptionId: string,
  currentHistoryId: string,
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>(
    `/subscriptions/${subscriptionId}/${currentHistoryId}`,
    {},
  );
};
