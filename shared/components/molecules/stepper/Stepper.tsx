import { View, ViewStyle } from "react-native";

import { Step } from "../../atoms";

import { StepperStyle } from "./Stepper.style";

interface StepperProps<T> {
  steps: T[];
  currentStep: T;
  stepIdKey: keyof T;
  style?: ViewStyle;
  onActive: (stepId: string) => void;
}

function Stepper<T>({
  steps,
  currentStep,
  stepIdKey,
  style,
  onActive,
}: StepperProps<T>) {
  return (
    <View style={[StepperStyle.StepList, style]}>
      {steps.map((step) => (
        <Step
          key={step[stepIdKey] as string}
          active={step[stepIdKey] === currentStep[stepIdKey]}
          onActive={() => onActive(step[stepIdKey] as string)}
        />
      ))}
    </View>
  );
}

export default Stepper;
