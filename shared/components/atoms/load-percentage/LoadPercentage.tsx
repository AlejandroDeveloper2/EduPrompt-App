import { View } from "react-native";

import { AppColors } from "../../../styles";

import { useResponsive } from "@/shared/hooks/core";

import Typography from "../typography/Typography";

import { dynamicStyles } from "./LoadPercentage.style";

interface LoadPercentageProps {
  progressPercentage: number;
}

const LoadPercentage = ({ progressPercentage }: LoadPercentageProps) => {
  const size = useResponsive();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.CircleContainer}>
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
