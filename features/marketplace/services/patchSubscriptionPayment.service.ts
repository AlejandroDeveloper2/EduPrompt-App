import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const patchSubscriptionPayment = async ({
  subscriptionId,
  orderId,
}: {
  subscriptionId: string;
  orderId: string;
}): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>(
    `/subscriptions/retry/${subscriptionId}/${orderId}`,
    {},
  );
};
