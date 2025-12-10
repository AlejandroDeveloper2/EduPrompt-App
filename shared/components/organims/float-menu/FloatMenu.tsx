import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Portal } from "react-native-portalize";
import Animated from "react-native-reanimated";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { FloatMenuItem } from "../../molecules";

import { FloatMenuStyle } from "./FloatMenu.style";

interface FloatMenuProps {
  isMounted: boolean;
  animatedStyle: {
    transform: {
      translateX: number;
    }[];
  };
  children: ReactNode | ReactNode[];
  toggleDeploy: () => void;
}

const FloatMenu = ({
  isMounted,
  animatedStyle,
  children,
  toggleDeploy,
}: FloatMenuProps) => {
  const size = useScreenDimensionsStore();

  if (!isMounted) return null;
  return (
    <Portal>
      <TouchableOpacity
        style={{ ...StyleSheet.absoluteFillObject }}
        activeOpacity={0.2}
        onPress={toggleDeploy}
      />
      <Animated.View
        style={[FloatMenuStyle(size).FloatMenuContainer, animatedStyle]}
      >
        {children}
      </Animated.View>
    </Portal>
  );
};

FloatMenu.Item = FloatMenuItem;

export default FloatMenu;
