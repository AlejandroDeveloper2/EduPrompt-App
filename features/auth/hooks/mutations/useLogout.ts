import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { removeSessionToken } from "@/shared/utils";
import { postLogout } from "../../services";

const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      return await postLogout();
    },
    onSuccess: () => {
      removeSessionToken();
      router.replace("/auth");
    },
  });
};

export default useLogout;
