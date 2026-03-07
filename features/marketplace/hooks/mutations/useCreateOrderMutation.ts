import { useMutation } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";

import { config } from "@/core/config/enviromentVariables";
import { APP_SCHEME } from "@/shared/constants";
import { AppColors } from "@/shared/styles";

import { postProductOrder } from "../../services";

const useCreateOrderMutation = (onOrderCreated?: (orderId: string) => void) => {
  return useMutation({
    mutationFn: postProductOrder,
    onSuccess: async (result) => {
      onOrderCreated?.(result.orderId);

      const paymentUrl = `${config.nextjsUrl}/payment?orderId=${result.orderId}&scheme=${APP_SCHEME}`;
      await WebBrowser.openBrowserAsync(paymentUrl, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
        toolbarColor: AppColors.primary[400],
        controlsColor: AppColors.basic.white,
        showTitle: true,
      });
    },
  });
};

export default useCreateOrderMutation;
