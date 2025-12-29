import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Host } from "react-native-portalize";

import { queryClient } from "@/core/config/reactQuery";

import { ToastProvider } from "@/shared/context";
import { AppColors } from "@/shared/styles";

/** Inicializers */
import { useSetupApp } from "@/shared/hooks/core";

/** Listeners */
import { useAuthEventListeners } from "@/features/auth/hooks/listeners";

import { Typography } from "@/shared/components/atoms";

export default function RootLayout() {
  const { loaded, db } = useSetupApp();

  return (
    <QueryClientProvider client={queryClient}>
      <Host>
        <ToastProvider>
          <InnerApp loaded={loaded} db={db} />
        </ToastProvider>
      </Host>
    </QueryClientProvider>
  );
}

function InnerApp({
  loaded,
  db,
}: {
  loaded: boolean;
  db: { success: boolean; error: Error | undefined };
}) {
  /** Listener para escuchar eventos del modulo de auth */
  useAuthEventListeners();

  if (!loaded) return null;

  if (db.error)
    return (
      <Typography
        text={`Error: ${db.error.message}`}
        weight="regular"
        type="button"
        textAlign="center"
        color={AppColors.danger[400]}
        width="100%"
      />
    );
  if (!db.success)
    return (
      <Typography
        text="Running migrations…"
        weight="regular"
        type="button"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="100%"
      />
    );

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
