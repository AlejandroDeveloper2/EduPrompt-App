import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { Indicator } from "../types";

export const putIndicators = async (
  updatedIndicators: Indicator
): Promise<void> => {
  await axiosClient.put<ServerResponse<null>>("/indicators", updatedIndicators);
};
