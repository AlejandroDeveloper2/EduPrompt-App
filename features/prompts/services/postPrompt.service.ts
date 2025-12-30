import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { CreatePromptPayload } from "../types";

export const postPrompt = async (
  createPromptPayload: CreatePromptPayload
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/prompts", createPromptPayload);
};
