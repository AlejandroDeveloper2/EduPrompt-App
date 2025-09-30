import { AppColors } from "@/styles";

import Typography from "../typography/Typography";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Typography
      text={message}
      weight="regular"
      type="caption"
      textAlign="center"
      color={AppColors.danger[400]}
      icon="warning-outline"
      width="auto"
    />
  );
};

export default ErrorMessage;
