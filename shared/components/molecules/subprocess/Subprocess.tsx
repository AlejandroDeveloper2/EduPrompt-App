import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";

import { ProcessType, ProgressConfig } from "@/core/types";

import { AppColors, Spacing } from "../../../styles";

import { calculateGridElementWidth, getSubprocessIcon } from "../../../helpers";
import { useProgressBar } from "../../../hooks/core";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Typography } from "../../atoms";
import ProgressBar from "../progress-bar/ProgressBar";

import { dynamicStyles } from "./Subprocess.style";

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

  const gap: number = useMemo(
    () => (size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm),
    [size],
  );

  const subprocessWidth = useMemo(
    () =>
      calculateGridElementWidth(
        size,
        { mobile: 1, tablet: 1, laptop: 2 },
        gap,
        size === "laptop" ? 190 : 48,
        width,
      ),
    [gap, size, width],
  );

  const iconProcess = useMemo(
    () => getSubprocessIcon(processType),
    [processType],
  );

  const styles = useMemo(
    () => dynamicStyles(size, subprocessWidth),
    [size, subprocessWidth],
  );

  return (
    <Animated.View style={[styles.SubprocessContainer]}>
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
