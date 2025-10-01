import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Host } from "react-native-portalize";

import { ToastProvider } from "@/lib/context";
import { useSetupApp } from "@/lib/hooks/core";
import { queryClient, setupNotifications } from "@/lib/utils";

/** SetUp Notifications */
setupNotifications();

export default function RootLayout() {
  const { loaded } = useSetupApp();

  if (!loaded) return null;

  return (
    <Host>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="auth" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </QueryClientProvider>
      </ToastProvider>
    </Host>
  );
}
