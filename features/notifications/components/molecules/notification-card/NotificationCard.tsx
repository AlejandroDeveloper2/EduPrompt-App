import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

import { Notification, NotificationLink } from "@/features/notifications/types";

import { useCheckIsNewNotification } from "@/features/notifications/hooks/core";
import { useNotificationsSelectionStore } from "@/features/notifications/hooks/store";
import { useAnimatedCard } from "@/shared/hooks/animations";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { openExternalLink } from "@/features/notifications/helpers";

import { Badge, Checkbox, Typography } from "@/shared/components/atoms";

import { NotificationCardStyle } from "./NotificationCard.style";

interface NotificationCardProps {
  data: Notification;
  totalRecords: number;
  links?: NotificationLink[];
  canSelect?: boolean;
}

const NotificationCard = ({
  data,
  totalRecords,
  links,
  canSelect,
}: NotificationCardProps) => {
  const size = useScreenDimensionsStore();
  const { selectedNotificationIds, toggleSelection } =
    useNotificationsSelectionStore();

  const isSelected: boolean = useMemo(
    () => selectedNotificationIds.has(data.notificationId),
    [data.notificationId, selectedNotificationIds]
  );

  const animatedCardStyle = useAnimatedCard(isSelected);
  const { isNew, formattedDate } = useCheckIsNewNotification(data.creationDate);

  const notificationCardStyle = NotificationCardStyle(size);

  return (
    <Animated.View
      style={[notificationCardStyle.NotificationContainer, animatedCardStyle]}
    >
      <View style={notificationCardStyle.Header}>
        <View style={notificationCardStyle.TitleContainer}>
          <View style={{ flex: 1 }}>
            <Typography
              text={data.title}
              weight="bold"
              type="button"
              textAlign="left"
              color={AppColors.neutral[1000]}
              width="100%"
              icon="notifications-outline"
            />
          </View>
          <View style={[notificationCardStyle.Tools]}>
            {isNew && <Badge label="Nuevo" variant="primary" />}
            {canSelect && (
              <Checkbox
                checked={isSelected}
                onCheck={() =>
                  toggleSelection(data.notificationId, totalRecords)
                }
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
        text={data.message}
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
