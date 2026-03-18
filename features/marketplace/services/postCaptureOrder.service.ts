import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { CaptureProductOrderInput } from "../types";

export const postCaptureOrder = async (
  captureProductOrderInput: CaptureProductOrderInput,
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>(
    "/subscriptions/orders/capture",
    captureProductOrderInput,
  );
};
