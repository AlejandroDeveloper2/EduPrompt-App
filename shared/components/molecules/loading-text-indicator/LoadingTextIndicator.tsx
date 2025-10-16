import { View } from "react-native";

import { useAnimatedSpinner } from "../../../hooks/animations";

import { Spinner, Typography } from "../../atoms";

import { LoadingTextIndicatorStyle } from "./LoadingTextIndicator.style";

interface LoadingTextIndicatorProps {
  message: string;
  color: string;
}

const LoadingTextIndicator = ({
  message,
  color,
}: LoadingTextIndicatorProps) => {
  const { animatedCircleStyles } = useAnimatedSpinner();

  return (
    <View style={LoadingTextIndicatorStyle.Container}>
      <Spinner color={color} animatedCircleStyles={animatedCircleStyles} />
      <Typography
        text={message}
        weight="regular"
        type="paragraph"
        textAlign="left"
        color={color}
        width="auto"
      />
    </View>
  );
};

export default LoadingTextIndicator;
