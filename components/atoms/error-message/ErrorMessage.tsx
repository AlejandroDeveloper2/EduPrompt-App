import { View } from "react-native";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import Typography from "../typography/Typography";

import { ErrorMessageStyle } from "./ErrorMessage.style";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const size = useScreenDimensionsStore();

  return (
    <View style={ErrorMessageStyle(size).ErrorMessageBox}>
      <Typography
        text={message}
        weight="regular"
        type="caption"
        textAlign="center"
        color={AppColors.basic.white}
        icon="warning-outline"
        width="auto"
      />
    </View>
  );
};

export default ErrorMessage;
