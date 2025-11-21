import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { AssistantResponse, ResourceFormatKey } from "../types";

import { getGeneratedImage } from "../utils";

export const postGenerateEducationalResource = async (
  userPrompt: string,
  formatKey: ResourceFormatKey
): Promise<AssistantResponse> => {
  const { data } = await axiosClient.post<ServerResponse<AssistantResponse>>(
    `/generations/${formatKey}`,
    {
      userPrompt,
    }
  );
  if (formatKey === "image") return await getGeneratedImage(data.data);
  return data.data;
};
