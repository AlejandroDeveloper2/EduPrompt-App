/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Portal } from "react-native-portalize";

import { ProviderProps, ToastConfig, ToastContextType } from "./types";

import { registerShowToast } from "./showToast";

import { GlobalStyles } from "@/styles/GlobalStyles.style";

const Toast = lazy(() => import("@/components/molecules/toast/Toast"));

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: ProviderProps) => {
  const [toastsQueue, setToastsQueue] = useState<ToastConfig[]>([]);

  const onRemove = (key: string): void => {
    setToastsQueue((prevToasts) => {
      const filteredToasts = prevToasts.filter((t) => t.key !== key);
      return filteredToasts;
    });
  };

  const onAdd = (toast: ToastConfig): void => {
    setToastsQueue([toast, ...toastsQueue]);
  };

  useEffect(() => {
    registerShowToast(onAdd);
  }, []);

  return (
    <ToastContext.Provider value={{ toastsQueue, onAdd, onRemove }}>
      <Portal>
        <Suspense fallback={<Text>Cargando..</Text>}>
          <View style={GlobalStyles.ToastsQueueContainer}>
            {toastsQueue.map((toast) => (
              <Toast
                key={toast.key}
                variant={toast.variant}
                message={toast.message}
                duration={toast.toastDuration}
                link={toast.link}
                onRemove={() => onRemove(toast.key)}
              />
            ))}
          </View>
        </Suspense>
      </Portal>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
