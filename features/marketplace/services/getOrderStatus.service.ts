import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { OrderStatusResponse } from "../types";

export const getOrderStatus = async (
  orderId: string,
): Promise<OrderStatusResponse> => {
  const { data } = await axiosClient.get<ServerResponse<OrderStatusResponse>>(
    `/subscriptions/orders/${orderId}/status`,
  );
  return data.data;
};
