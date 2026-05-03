import { View } from "react-native";

import { Order } from "@/core/types";

import { AppColors } from "@/shared/styles";

import { useNotificationListUI } from "@/features/notifications/hooks/core";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import { FilterTag } from "@/shared/components/molecules";

import { dynamicStyles } from "./NotificationList.style";

interface NotificationHeaderProps {
  filter: Order;
  updateFilter: (updatedFilter: Order) => void;
}

const NotificationListHeader = ({
  filter,
  updateFilter,
}: NotificationHeaderProps) => {
  const { size, t } = useNotificationListUI();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.ListHeaderContainer}>
      <ScreenSection
        description={t(
          "notifications_translations.user_notification_list.description",
        )}
        title={t("notifications_translations.user_notification_list.title")}
        icon="notifications-outline"
      />
      <View style={styles.FiltersContainer}>
        <Typography
          text={t(
            "notifications_translations.user_notification_list.order_filters_labels.title",
          )}
          weight="bold"
          type="button"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <View style={styles.Filters}>
          <FilterTag
            icon="calendar-outline"
            label={t(
              "notifications_translations.user_notification_list.order_filters_labels.asc",
            )}
            active={filter === "asc"}
            onPressFilter={() => updateFilter("asc")}
          />
          <FilterTag
            icon="calendar-outline"
            label={t(
              "notifications_translations.user_notification_list.order_filters_labels.desc",
            )}
            active={filter === "desc"}
            onPressFilter={() => updateFilter("desc")}
          />
        </View>
      </View>
    </View>
  );
};

export default NotificationListHeader;
