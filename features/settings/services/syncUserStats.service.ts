import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { UserStats } from "../types";

export const putUserStats = async (
  updatedUserStats: Omit<UserStats, "sync" | "userName" | "email">
): Promise<void> => {
  await axiosClient.put<ServerResponse<null>>(
    "/users/sync/stats",
    updatedUserStats
  );
};
