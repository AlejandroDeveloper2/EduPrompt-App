import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { SystemNotification } from "../types";

export const getNotificationById = async (
  notificationId: string
): Promise<SystemNotification> => {
  const { data } = await axiosClient.get<ServerResponse<SystemNotification>>(
    `/systemNotifications/${notificationId}`
  );
  return data.data;
};
