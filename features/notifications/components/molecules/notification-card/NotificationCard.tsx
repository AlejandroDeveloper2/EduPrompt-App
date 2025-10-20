import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

import { NotificationLink } from "@/features/notifications/types";

import {
  checkIsNewNotification,
  openExternalLink,
} from "@/features/notifications/helpers";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Badge, Ionicon, Typography } from "@/shared/components/atoms";

import { NotificationCardStyle } from "./NotificationCard.style";

interface NotificationCardProps {
  notificationId: string;
  title: string;
  notificationDate: Date;
  message: string;
  isNew?: boolean;
  links?: NotificationLink[];
  onDeleteNotification?: () => void;
}

const NotificationCard = ({
  notificationId,
  title,
  notificationDate,
  message,
  links,
  onDeleteNotification,
}: NotificationCardProps) => {
  const size = useScreenDimensionsStore();
  const notificationCardStyle = NotificationCardStyle(size);

  const { isNew, formattedDate } = useMemo(() => {
    return checkIsNewNotification(notificationDate);
  }, [notificationDate]);

  return (
    <Animated.View style={[notificationCardStyle.NotificationContainer]}>
      <View style={notificationCardStyle.Header}>
        <View style={notificationCardStyle.TitleContainer}>
          <View style={{ flex: 1 }}>
            <Typography
              text={title}
              weight="bold"
              type="button"
              textAlign="left"
              color={AppColors.neutral[1000]}
              width="100%"
              icon="notifications-outline"
            />
          </View>
          <View style={[notificationCardStyle.Tools, { flex: 0.3 }]}>
            {isNew && <Badge label="Nuevo" variant="primary" />}
            {onDeleteNotification && (
              <Ionicon
                name="close-outline"
                size={20}
                color={AppColors.neutral[700]}
                onPress={onDeleteNotification}
              />
            )}
          </View>
        </View>
        <Typography
          text={formattedDate}
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
      {links && (
        <View style={notificationCardStyle.LinksContainer}>
          {links.map((link, i) => (
            <Pressable
              key={`${link.href}-{i}`}
              style={notificationCardStyle.LinkPressable}
              onPress={() => openExternalLink(link.href)}
            >
              <Typography
                text={link.label}
                weight="bold"
                type="caption"
                textAlign="left"
                color={AppColors.primary[400]}
                width="100%"
                icon="link-outline"
              />
            </Pressable>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

export default NotificationCard;
