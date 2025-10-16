import { View, ViewStyle } from "react-native";

import { Step as StepType } from "@/core/types";

import { Step } from "../../atoms";

import { StepperStyle } from "./Stepper.style";

type IllustrationType =
  | "FirstStepImage"
  | "SecondStepImage"
  | "ThirdStepImage"
  | "FourthStepImage"
  | "FiveStepImage";

interface StepperProps {
  steps: StepType<IllustrationType>[];
  currentStep: StepType<IllustrationType>;
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
