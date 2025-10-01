import { View } from "react-native";

import { AppColors } from "@/styles";

import { useAnimatedSpinner } from "@/lib/hooks/animations";
import { useCheckAuth, useCheckOnboarding } from "@/lib/hooks/core";

import { Spinner } from "@/components/atoms";

import { GlobalStyles } from "@/styles/GlobalStyles.style";

export default function Index() {
  useCheckOnboarding();
  useCheckAuth();
  const { animatedCircleStyles } = useAnimatedSpinner();

  return (
    <View style={[GlobalStyles.RootContainer, { justifyContent: "center" }]}>
      <Spinner
        color={AppColors.primary[400]}
        animatedCircleStyles={animatedCircleStyles}
      />
    </View>
  );
}
