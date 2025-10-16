import type { ToastConfig } from "./types";

let _onOpen: ((config: ToastConfig) => void) | null = null;

export const registerShowToast = (fn: (config: ToastConfig) => void) => {
  _onOpen = fn;
};

export const showToast = (config: ToastConfig) => {
  if (_onOpen) {
    _onOpen(config);
  } else {
    console.warn("⚠️ showToast was called before ToastProvider was mounted.");
  }
};
