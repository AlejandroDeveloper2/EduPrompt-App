import { useMutation } from "@tanstack/react-query";

import { showToast } from "@/shared/context";

import { postProductOrder } from "../../services";

import { generateToastKey } from "@/shared/helpers";

const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: postProductOrder,
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "¡Compra realizada éxitosamente!",
      });
    },
  });
};

export default useCreateOrderMutation;
