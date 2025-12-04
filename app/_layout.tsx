import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Host } from "react-native-portalize";

import { queryClient } from "@/core/config/reactQuery";

import { SelectionModeProvider, ToastProvider } from "@/shared/context";

/** Listeners */
import { useAuthEventListeners } from "@/features/auth/hooks/listeners";
import { useUserNotificationsEventListener } from "@/features/notifications/hooks/listeners";
import { useUserEventsListener } from "@/features/settings/hooks/listeners";

/** Jobs */
import {
  useCleanNotificationsJob,
  useNotificationCheckerJob,
} from "@/features/notifications/hooks/core";

/** Inicializers */
import { useSetupApp } from "@/shared/hooks/core";

export default function RootLayout() {
  const { loaded } = useSetupApp();
  return (
    <Host>
      <ToastProvider>
        <SelectionModeProvider>
          <QueryClientProvider client={queryClient}>
            <InnerApp loaded={loaded} />
          </QueryClientProvider>
        </SelectionModeProvider>
      </ToastProvider>
    </Host>
  );
}

function InnerApp({ loaded }: { loaded: boolean }) {
  /** Listeners de eventos con el eventBus */
  useAuthEventListeners();

  /** Job para escuchar eventos del modulo de perfil de usuario */
  useUserEventsListener();

  /** Job para escuchar eventos del modulo de notificaciones */
  useUserNotificationsEventListener();

  /** Job para limpiar notificaciones */
  useCleanNotificationsJob();

  /** Job para revisar si la notificaciones son nuevas o no */
  useNotificationCheckerJob();

  if (!loaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
