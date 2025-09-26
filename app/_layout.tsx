import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Host } from "react-native-portalize";

import { useSetupApp } from "@/lib/hooks/core";
import { setupNotifications } from "@/lib/utils";

/** SetUp Notifications */
setupNotifications();

export default function RootLayout() {
  const { loaded } = useSetupApp();

  if (!loaded) return null;

  return (
    <Host>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" translucent />
    </Host>
  );
}
