import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { Indicator } from "../types";

export const patchIndicators = async (
  updatedIndicators: Partial<Indicator>
): Promise<void> => {
  await axiosClient.patch<ServerResponse<null>>(
    "/indicators",
    updatedIndicators
  );
};
