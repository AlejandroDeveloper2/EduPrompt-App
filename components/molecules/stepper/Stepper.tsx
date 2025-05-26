import { useRouter } from "expo-router";
import { View } from "react-native";

import { StepType } from "@/lib/types";

import { Step } from "@/components/atoms";

import { StepperStyle } from "./Stepper.style";

interface StepperProps {
  steps: StepType[];
}

const Stepper = ({ steps }: StepperProps) => {
  const router = useRouter();

  return (
    <View style={StepperStyle.StepList}>
      {steps.map((step) => (
        <Step
          key={step.stepId}
          active={false}
          onActive={() => router.navigate(step.to)}
        />
      ))}
    </View>
  );
};

export default Stepper;
