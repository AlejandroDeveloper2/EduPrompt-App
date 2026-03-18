import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { Subscription } from "../types";

export const getSubscriptionByUser = async (): Promise<Subscription> => {
  const { data } =
    await axiosClient.get<ServerResponse<Subscription>>("/subscriptions");
  return data.data;
};
