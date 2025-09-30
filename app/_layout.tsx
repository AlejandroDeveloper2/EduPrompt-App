import { Stack } from "expo-router";
import { Host } from "react-native-portalize";

import { useSetupApp } from "@/lib/hooks/core";
import { setupNotifications } from "@/lib/utils";

import { CustomStatusBar } from "@/components/atoms";

/** SetUp Notifications */
setupNotifications();

export default function RootLayout() {
  const { loaded } = useSetupApp();

  if (!loaded) return null;

  return (
    <Host>
      <CustomStatusBar />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Host>
  );
}
