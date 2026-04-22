import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { ProgressConfig } from "@/core/types";

import { AppColors } from "../../../styles";

import { useProgressBar, useResponsive } from "../../../hooks/core";

import { Typography } from "../../atoms";
import { ProgressBar } from "../../molecules";

import { dynamicStyles } from "./Loader.style";

interface LoaderProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  progressConfig: ProgressConfig;
  tasksDone?: number;
}

const Loader = ({
  title,
  icon,
  description,
  progressConfig,
  tasksDone,
}: LoaderProps) => {
  const size = useResponsive();
  const progressPercentage = useProgressBar(progressConfig, tasksDone);

  const styles = dynamicStyles(size);

  return (
    <View style={styles.LoaderContainer}>
      <Typography
        text={title}
        weight="bold"
        type="h2"
        textAlign="center"
        color={AppColors.primary[400]}
        width="auto"
        icon={icon}
      />
      <Typography
        text={description}
        weight="regular"
        type="paragraph"
        textAlign="left"
        color={AppColors.neutral[900]}
        width="100%"
      />
      <ProgressBar
        progressConfig={progressConfig}
        progressPercentage={progressPercentage}
      />
    </View>
  );
};

export default Loader;
