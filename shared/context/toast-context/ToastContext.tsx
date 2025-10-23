import { createContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Portal } from "react-native-portalize";

import { ProviderProps, ToastConfig, ToastContextType } from "./types";

import { registerShowToast, unregisterShowToast } from "./showToast";

import { GlobalStyles } from "../../styles/GlobalStyles.style";

import Toast from "@/shared/components/molecules/toast/Toast";

// const Toast = lazy(() => import("@/shared/components/molecules/toast/Toast"));

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Componente Provider para gestionar notificaciones toast en la aplicación.
 *
 * @component
 * @param {ProviderProps} props - Las props del provider
 * @param {ReactNode} props.children - Componentes hijos que serán envueltos por el provider
 *
 * @remarks
 * Este componente gestiona una cola de notificaciones toast y proporciona métodos para añadirlas y eliminarlas.
 * Utiliza el Context API de React para hacer que la funcionalidad toast esté disponible en toda la aplicación.
 *
 * El provider:
 * - Mantiene una cola de notificaciones toast usando el estado de React
 * - Proporciona métodos para añadir y eliminar toasts de la cola
 * - Renderiza los toasts en un Portal para asegurar que aparezcan por encima de otros elementos de la UI
 * - Registra un manejador global para mostrar toasts al montarse
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 */

export const ToastProvider = ({ children }: ProviderProps) => {
  const [toastsQueue, setToastsQueue] = useState<ToastConfig[]>([]);

  const onRemove = (key: string): void => {
    setToastsQueue((prevToasts) => {
      const filteredToasts = prevToasts.filter((t) => t.key !== key);
      return filteredToasts;
    });
  };

  const onAdd = (toast: ToastConfig): void => {
    setToastsQueue((prev) => [toast, ...prev]);
  };

  useEffect(() => {
    registerShowToast(onAdd);

    return () => unregisterShowToast();
  }, []);

  return (
    <ToastContext.Provider value={{ toastsQueue, onAdd, onRemove }}>
      <Portal>
        {/* <Suspense fallback={<Text>Cargando..</Text>}> */}
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
        {/* </Suspense> */}
      </Portal>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
