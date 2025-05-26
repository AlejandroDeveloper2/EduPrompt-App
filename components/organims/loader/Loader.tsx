import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { ProgressConfig } from "@/lib/types";

import { AppColors } from "@/styles";

import { useProgressBar } from "@/lib/hooks/core";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Typography } from "@/components/atoms";
import { ProgressBar } from "@/components/molecules";

import { LoaderStyle } from "./Loader.style";

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
  const size = useScreenDimensionsStore();
  const progressPercentage = useProgressBar(progressConfig, tasksDone);

  return (
    <View style={LoaderStyle(size).LoaderContainer}>
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
