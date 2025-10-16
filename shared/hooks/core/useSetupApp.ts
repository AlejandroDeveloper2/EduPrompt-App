import { useEffect } from "react";

import {
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";

import { useIndicatorPanelStore } from "@/features/dashboard/hooks/store";

const useSetupApp = () => {
  const [loaded] = useFonts({
    Outfit_700Bold,
    Outfit_500Medium,
    Outfit_400Regular,
    Outfit_300Light,
  });

  const { setupIndicators } = useIndicatorPanelStore();

  useEffect(() => {
    setupIndicators();
  }, [setupIndicators]);

  return { loaded };
};

export default useSetupApp;
