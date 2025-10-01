import { Href } from "expo-router";
import type { ReactNode } from "react";

export type ToastVariantType = "primary" | "neutral" | "danger";

export type ToastConfig = {
  key: string;
  variant: ToastVariantType;
  message: string;
  toastDuration?: number;
  link?: {
    label: string;
    href: Href;
  };
};

export interface ProviderProps {
  children: ReactNode | ReactNode[];
}

interface ContextStateProps {
  toastsQueue: ToastConfig[];
}

interface ContextActions {
  onRemove: (key: string) => void;
  onAdd: (toastConfig: ToastConfig) => void;
}

export type ToastContextType = ContextStateProps & ContextActions;
