import { axiosClient } from "@/core/config/axiosClient";

import { ServerResponse } from "@/core/types";
import { SignupPayload } from "../types";

export const postSignup = async (
  signupPayload: SignupPayload
): Promise<void> => {
  await axiosClient.post<ServerResponse<null>>("/auth/signup", signupPayload);
};
