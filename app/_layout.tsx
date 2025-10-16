import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Host } from "react-native-portalize";

import { queryClient } from "@/core/config/reactQuery";

import { ToastProvider } from "@/shared/context";

import { useAuthEventListeners } from "@/features/auth/hooks/core";
import { useSetupApp } from "@/shared/hooks/core";

import { setupNotifications } from "@/shared/utils";

/** SetUp Notifications */
setupNotifications();

export default function RootLayout() {
  return (
    <Host>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
        </QueryClientProvider>
      </ToastProvider>
    </Host>
  );
}

function InnerApp() {
  const { loaded } = useSetupApp();
  useAuthEventListeners();

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
