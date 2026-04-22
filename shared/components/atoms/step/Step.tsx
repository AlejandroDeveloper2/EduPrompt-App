import { Pressable } from "react-native";

import { useResponsive } from "@/shared/hooks/core";

import { dynamicStyles } from "./Step.style";

interface StepProps {
  active: boolean;
  onActive: () => void;
}

const Step = ({ active, onActive }: StepProps) => {
  const size = useResponsive();
  const styles = dynamicStyles(active, size);

  return (
    <Pressable onPress={onActive} style={styles.PressableStep}></Pressable>
  );
};

export default Step;
