import { useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";

import { ProcessType, ProgressConfig } from "@/lib/types";

import { AppColors, Spacing } from "@/styles";

import { calculateGridElementWidth, getSubprocessIcon } from "@/lib/helpers";
import { useProgressBar } from "@/lib/hooks/core";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Typography } from "@/components/atoms";
import ProgressBar from "../progress-bar/ProgressBar";

import { SubprocessStyle } from "./Subprocess.style";

interface SubprocessProps {
  processType: ProcessType;
  processName: string;
  progressConfig: ProgressConfig;
  tasksDone?: number;
}

const Subprocess = ({
  processType,
  processName,
  progressConfig,
  tasksDone,
}: SubprocessProps) => {
  const size = useScreenDimensionsStore();
  const { width } = useWindowDimensions();
  const progressPercentage = useProgressBar(progressConfig, tasksDone);

  const gap: number =
    size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm;

  const subprocessWidth = calculateGridElementWidth(
    size,
    { mobile: 1, tablet: 1, laptop: 2 },
    gap,
    size === "laptop" ? 190 : 48,
    width
  );
  const iconProcess = getSubprocessIcon(processType);

  return (
    <Animated.View
      style={[SubprocessStyle(size, subprocessWidth).SubprocessContainer]}
    >
      <Typography
        text={processName}
        weight="regular"
        type="caption"
        textAlign="left"
        color={AppColors.neutral[1000]}
        width="auto"
        icon={iconProcess}
      />
      <ProgressBar
        progressConfig={progressConfig}
        progressPercentage={progressPercentage}
      />
    </Animated.View>
  );
};

export default Subprocess;
