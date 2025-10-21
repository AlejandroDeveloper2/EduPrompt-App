import { useEffect } from "react";

import {
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";

import { setupNotificationChannel, setupNotifications } from "@/shared/utils";

const useSetupApp = () => {
  const [loaded] = useFonts({
    Outfit_700Bold,
    Outfit_500Medium,
    Outfit_400Regular,
    Outfit_300Light,
  });

  useEffect(() => {
    /** 🔔 Configurar handlers y canales cuando la app inicia */
    setupNotifications();
    setupNotificationChannel();
  }, []);

  return { loaded };
};

export default useSetupApp;
