import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { CreateProductOrderInput } from "../types";

export const postProductOrder = async (
  createProductOrderInput: CreateProductOrderInput,
): Promise<{ orderId: string }> => {
  const { data } = await axiosClient.post<ServerResponse<{ orderId: string }>>(
    "/subscriptions/orders",
    createProductOrderInput,
  );
  return data.data;
};
