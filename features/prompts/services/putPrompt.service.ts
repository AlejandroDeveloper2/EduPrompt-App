import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { UpdatePromptPayload } from "../types";

export const putPrompt = async (
  updatePromptPayload: UpdatePromptPayload
): Promise<void> => {
  const { promptId, promptTitle, promptText, tag } = updatePromptPayload;
  await axiosClient.put<ServerResponse<null>>(`/prompts/${promptId}`, {
    promptTitle,
    promptText,
    tag,
  });
};
