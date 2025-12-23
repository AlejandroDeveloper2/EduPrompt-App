import { Stack } from "expo-router";

import { useCheckAuth } from "@/features/auth/hooks/core";

import { CustomStatusBar } from "@/shared/components/atoms";

export default function AuthLayout() {
  useCheckAuth();
  return (
    <>
      <CustomStatusBar />
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup_screen" />
        <Stack.Screen name="request_password_reset_screen" />
        <Stack.Screen name="reset_password_screen" />
        <Stack.Screen name="verify_reset_pass_code_screen" />
        <Stack.Screen name="account_activation_screen" />
        <Stack.Screen name="account_activation_request_screen" />
      </Stack>
    </>
  );
}
