import {
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Host } from "react-native-portalize";

export default function RootLayout() {
  const [loaded] = useFonts({
    Outfit_700Bold,
    Outfit_500Medium,
    Outfit_400Regular,
    Outfit_300Light,
  });

  if (!loaded) return null;

  return (
    <Host>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="+not-found" /> */}
      </Stack>
      <StatusBar style="auto" translucent />
    </Host>
  );
}
