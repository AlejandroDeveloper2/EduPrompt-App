import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { Product } from "../types";

export const postProductOrder = async (
  product: Product,
): Promise<{ orderId: string }> => {
  const { data } = await axiosClient.post<ServerResponse<{ orderId: string }>>(
    "/subscriptions/orders",
    product,
  );
  return data.data;
};
