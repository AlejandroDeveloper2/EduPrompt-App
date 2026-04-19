import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useMemo } from "react";
import { View, ViewStyle } from "react-native";

import { calcAvarageProcessDuration } from "@/shared/utils";

import Loader from "@/shared/components/organims/loader/Loader";

import { styles } from "./ProcessProgress.style";

type ProcessProgressInfo = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

interface ProcessProgressProps {
  processName: string;
  defaultDuration: number;
  info: ProcessProgressInfo;
  Component?: ReactNode | ReactNode[];
  style?: ViewStyle;
}

const ProcessProgress = ({
  processName,
  defaultDuration,
  info,
  Component,
  style,
}: ProcessProgressProps) => {
  const { title, description, icon } = info;

  const processDuration = useMemo(() => {
    return calcAvarageProcessDuration(processName);
  }, [processName]);

  return (
    <View style={[styles.Container, style]}>
      {Component}
      <Loader
        title={title}
        description={description}
        icon={icon}
        progressConfig={{
          mode: "duration-timer",
          limit: processDuration ?? defaultDuration,
        }}
      />
    </View>
  );
};

export default ProcessProgress;
