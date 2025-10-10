import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
  PanGesture,
} from "react-native-gesture-handler";
import { Portal } from "react-native-portalize";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Typography } from "@/components/atoms";

import { PopUpStyle } from "./PopUp.style";

interface PopUpProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  isPopUpMounted: boolean;
  gesture: PanGesture;
  animatedPopUpStyle: {
    transform: {
      translateY: number;
    }[];
  };
  children: ReactNode | ReactNode[];
  onClosePopUp: () => void;
}

const PopUp = ({
  title,
  icon,
  isPopUpMounted,
  gesture,
  animatedPopUpStyle,
  children,
  onClosePopUp,
}: PopUpProps) => {
  const size = useScreenDimensionsStore();
  const insets = useSafeAreaInsets();

  const popUpStyle = PopUpStyle(size, insets);

  if (!isPopUpMounted) return null;
  return (
    <Portal>
      <GestureHandlerRootView>
        <View style={popUpStyle.Overlay}>
          <TouchableOpacity
            style={{ ...StyleSheet.absoluteFillObject }}
            activeOpacity={1}
            onPress={onClosePopUp}
          />
          <GestureDetector gesture={gesture}>
            <Animated.View style={[popUpStyle.PopUpWindow, animatedPopUpStyle]}>
              <View style={popUpStyle.ClosePopUpDragIndicator} />
              <Typography
                text={title}
                weight="medium"
                type="h2"
                textAlign="center"
                color={AppColors.neutral[1000]}
                width="100%"
                icon={icon}
              />
              <View style={popUpStyle.PopUpContent}>{children}</View>
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </Portal>
  );
};

export default PopUp;
