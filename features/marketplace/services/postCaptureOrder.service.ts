import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { CaptureProductOrderInput } from "../types";

export const postCaptureOrder = async (
  captureProductOrderInput: CaptureProductOrderInput,
): Promise<{ subscriptionId: string | null }> => {
  const { data } = await axiosClient.post<
    ServerResponse<{ subscriptionId: string | null }>
  >("/subscriptions/orders/capture", captureProductOrderInput);
  return data.data;
};
