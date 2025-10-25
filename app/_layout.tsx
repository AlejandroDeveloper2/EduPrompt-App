import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Host } from "react-native-portalize";

import { queryClient } from "@/core/config/reactQuery";

import { ToastProvider } from "@/shared/context";

import { useAuthEventListeners } from "@/features/auth/hooks/core";
import {
  useCleanNotificationsJob,
  useNotificationCheckerJob,
  useUserNotificationsEventListener,
} from "@/features/notifications/hooks/core";
import { useUserEventsListener } from "@/features/settings/hooks/core";
import { useUserProfileQuery } from "@/features/settings/hooks/queries";
import { useSetupApp } from "@/shared/hooks/core";

export default function RootLayout() {
  const { loaded } = useSetupApp();
  return (
    <Host>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <InnerApp loaded={loaded} />
        </QueryClientProvider>
      </ToastProvider>
    </Host>
  );
}

function InnerApp({ loaded }: { loaded: boolean }) {
  /** Montar perfil de usuario */
  useUserProfileQuery();

  /** Listeners de eventos con el eventBus */
  useAuthEventListeners();
  useUserNotificationsEventListener();
  useUserEventsListener();

  /** Job para limpiar notificaciones */
  useCleanNotificationsJob();
  /** Job para revisar si la notificaciones son nuevas o no */
  useNotificationCheckerJob();

  if (!loaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
