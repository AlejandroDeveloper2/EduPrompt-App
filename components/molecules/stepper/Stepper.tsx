import { View, ViewStyle } from "react-native";

import { Step as StepType } from "@/lib/types/data-types";

import { Step } from "@/components/atoms";

import { StepperStyle } from "./Stepper.style";

interface StepperProps {
  steps: StepType[];
  currentStep: StepType;
  style?: ViewStyle;
  onActive: (stepId: string) => void;
}

const Stepper = ({ steps, currentStep, style, onActive }: StepperProps) => {
  return (
    <View style={[StepperStyle.StepList, style]}>
      {steps.map((step) => (
        <Step
          key={step.stepId}
          active={step.stepId === currentStep.stepId}
          onActive={() => onActive(step.stepId)}
        />
      ))}
    </View>
  );
};

export default Stepper;
