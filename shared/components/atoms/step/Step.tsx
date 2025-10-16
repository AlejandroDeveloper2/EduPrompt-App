import { Pressable } from "react-native";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { StepStyle } from "./Step.style";

interface StepProps {
  active: boolean;
  onActive: () => void;
}

const Step = ({ active, onActive }: StepProps) => {
  const size = useScreenDimensionsStore();

  return (
    <Pressable
      onPress={onActive}
      style={StepStyle(active, size).PressableStep}
    ></Pressable>
  );
};

export default Step;
