import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppColors } from "@/styles";

type Props = {
  backgroundColor?: string;
  style?: "light" | "dark" | "auto" | undefined;
};

export default function CustomStatusBar({
  backgroundColor = AppColors.primary[400],
  style = "light",
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* Capa bajo el status bar */}
      <View
        style={{
          height: insets.top,
          backgroundColor,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      />
      <StatusBar translucent style={style} />
    </>
  );
}
