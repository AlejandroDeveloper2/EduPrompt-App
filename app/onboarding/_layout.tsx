import { Stack } from "expo-router";

import { CustomStatusBar } from "@/components/atoms";

export default function OnboardingLayout() {
  return (
    <>
      <CustomStatusBar />
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
