import { View } from "react-native";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import Typography from "../typography/Typography";

import { LoadPercentageStyle } from "./LoadPercentage.style";

interface LoadPercentageProps {
  progressPercentage: number;
}

const LoadPercentage = ({ progressPercentage }: LoadPercentageProps) => {
  const size = useScreenDimensionsStore();

  return (
    <View style={LoadPercentageStyle(size).CircleContainer}>
      <Typography
        text={`${progressPercentage}%`}
        weight="regular"
        type="paragraph"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
    </View>
  );
};

export default LoadPercentage;
