import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { Order, SystemNotification } from "../types";

export const getNotifications = async (
  order: Order
): Promise<SystemNotification[]> => {
  const { data } = await axiosClient.get<ServerResponse<SystemNotification[]>>(
    "/notifications",
    {
      params: {
        order,
      },
    }
  );
  return data.data;
};
