import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";

export const patchNotificationsReadStatus = async (
  notificationIds: string[]
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/notifications", {
    notificationIds,
  });
};
