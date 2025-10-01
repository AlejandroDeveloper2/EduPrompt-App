import { axiosClient } from "@/lib/config/axiosClient";

import { ServerResponse } from "@/lib/types";
import { SignupPayload } from "@/lib/types/data-types";

export const postSignup = async (
  signupPayload: SignupPayload
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/signup", signupPayload);
};
