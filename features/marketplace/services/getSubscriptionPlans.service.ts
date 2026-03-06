import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { SubscriptionPlan } from "../types";

export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  const { data } = await axiosClient.get<ServerResponse<SubscriptionPlan[]>>(
    "/subscriptions/plans",
  );
  return data.data;
};
