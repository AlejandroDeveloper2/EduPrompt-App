import {
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useEffect } from "react";

import { db } from "@/core/config/db/drizzleClient";
import migrations from "@/core/config/db/migrations/migrations";

import { setupNotificationChannel, setupNotifications } from "@/shared/utils";

const useSetupApp = () => {
  const { success, error } = useMigrations(db, migrations);

  const [loaded] = useFonts({
    Outfit_700Bold,
    Outfit_500Medium,
    Outfit_400Regular,
    Outfit_300Light,
  });

  useEffect(() => {
    /** Configurar handlers y canales cuando la app inicia */
    setupNotifications();
    setupNotificationChannel();
  }, []);

  return { loaded, db: { success, error } };
};

export default useSetupApp;
