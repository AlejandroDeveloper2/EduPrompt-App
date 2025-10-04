import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";
import { UserPreferences } from "@/lib/types/data-types";

export const patchUserPreferences = async (
  updatedUserPreferences: Partial<UserPreferences>
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>("/users/preferences", {
    ...updatedUserPreferences,
  });
};
