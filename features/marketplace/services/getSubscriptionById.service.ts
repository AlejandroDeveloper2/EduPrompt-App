import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { Subscription } from "../types";

export const getSubscriptionById = async (
  subscriptionId: string,
): Promise<Subscription> => {
  const { data } = await axiosClient.get<ServerResponse<Subscription>>(
    `/subscriptions/${subscriptionId}`,
  );
  return data.data;
};
