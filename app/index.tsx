import { View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useCheckOnboarding } from "@/features/onboarding/hooks/core";
import { useAnimatedSpinner } from "@/shared/hooks/animations";

import { Spinner } from "@/shared/components/atoms";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

export default function Index() {
  useCheckOnboarding();

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
