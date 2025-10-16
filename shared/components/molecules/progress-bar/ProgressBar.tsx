import { View } from "react-native";

import { ProgressConfig } from "@/core/types";

import { useAnimatedProgressBar } from "../../../hooks/animations";

import { LoaderBar, LoadPercentage } from "../../atoms";

import { ProgressBarStyle } from "./ProgressBar.style";

interface ProgressBarProps {
  progressConfig: ProgressConfig;
  progressPercentage: number;
}

const ProgressBar = ({
  progressConfig,
  progressPercentage,
}: ProgressBarProps) => {
  const animatedProgressStyle = useAnimatedProgressBar(
    progressConfig,
    progressPercentage
  );

  return (
    <View style={ProgressBarStyle.Container}>
      <LoaderBar animatedProgressStyle={animatedProgressStyle} />
      <LoadPercentage progressPercentage={progressPercentage} />
    </View>
  );
};

export default ProgressBar;
