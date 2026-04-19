import { useMemo } from "react";
import { Pressable } from "react-native";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { dynamicStyles } from "./Step.style";

interface StepProps {
  active: boolean;
  onActive: () => void;
}

const Step = ({ active, onActive }: StepProps) => {
  const size = useScreenDimensionsStore();
  const styles = useMemo(() => dynamicStyles(active, size), [active, size]);

  return (
    <Pressable onPress={onActive} style={styles.PressableStep}></Pressable>
  );
};

export default Step;
