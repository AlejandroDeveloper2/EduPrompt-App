import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Portal } from "react-native-portalize";
import Animated from "react-native-reanimated";

import { useResponsive } from "@/shared/hooks/core";

import { FloatMenuItem } from "../../molecules";

import { dynamicStyles } from "./FloatMenu.style";

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
  const size = useResponsive();

  const styles = dynamicStyles(size);

  if (!isMounted) return null;
  return (
    <Portal>
      <TouchableOpacity
        style={{ ...StyleSheet.absoluteFill }}
        activeOpacity={0.2}
        onPress={toggleDeploy}
      />
      <Animated.View style={[styles.FloatMenuContainer, animatedStyle]}>
        {children}
      </Animated.View>
    </Portal>
  );
};

FloatMenu.Item = FloatMenuItem;

export default FloatMenu;
