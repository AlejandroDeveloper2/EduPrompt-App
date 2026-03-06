import { useMutation } from "@tanstack/react-query";

import { postCaptureOrder } from "../../services";

const useCaptureOrderMutation = () => {
  return useMutation({
    mutationFn: postCaptureOrder,
  });
};

export default useCaptureOrderMutation;
