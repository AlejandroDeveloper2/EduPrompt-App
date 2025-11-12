import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";

export const showErrorToast = (message: string, error: unknown): void => {
  console.log(error);
  showToast({
    message,
    key: generateToastKey(),
    variant: "danger",
  });
};
