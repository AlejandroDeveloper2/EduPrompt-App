import { View } from "react-native";

import { ProgressConfig } from "@/lib/types";

import { useAnimatedProgressBar } from "@/lib/hooks/animations";

import { LoaderBar, LoadPercentage } from "@/components/atoms";

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
