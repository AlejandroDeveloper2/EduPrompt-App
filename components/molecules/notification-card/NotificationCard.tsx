import { View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Ionicon, Typography } from "@/components/atoms";

import { NotificationCardStyle } from "./NotificationCard.style";

interface NotificationCardProps {
  notificationId: string;
  title: string;
  notificationDate: string;
  message: string;
  onDeleteNotification: () => void;
}

const NotificationCard = ({
  notificationId,
  title,
  notificationDate,
  message,
  onDeleteNotification,
}: NotificationCardProps) => {
  const size = useScreenDimensionsStore();
  const notificationCardStyle = NotificationCardStyle(size);

  return (
    <Animated.View style={[notificationCardStyle.NotificationContainer]}>
      <View style={notificationCardStyle.Header}>
        <View style={notificationCardStyle.TitleContainer}>
          <Typography
            text={title}
            weight="bold"
            type="button"
            textAlign="left"
            color={AppColors.neutral[1000]}
            width="auto"
            icon="notifications-outline"
          />
          <Ionicon
            name="close-outline"
            size={20}
            color={AppColors.neutral[700]}
            onPress={onDeleteNotification}
          />
        </View>
        <Typography
          text={notificationDate}
          weight="regular"
          type="caption"
          textAlign="left"
          color={AppColors.neutral[600]}
          width="auto"
        />
      </View>
      <Typography
        text={message}
        weight="regular"
        type="paragraph"
        textAlign="left"
        color={AppColors.neutral[900]}
        width="100%"
      />
    </Animated.View>
  );
};

export default NotificationCard;
