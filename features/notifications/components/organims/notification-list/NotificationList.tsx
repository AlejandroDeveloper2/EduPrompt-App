import { FlatList, View } from "react-native";

import { Order } from "@/core/types";

import { AppColors } from "@/shared/styles";

import { useLoadUserNotifications } from "@/features/notifications/hooks/core";
import { useResponsive, useTranslations } from "@/shared/hooks/core";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import {
  Empty,
  FilterTag,
  LoadingTextIndicator,
} from "@/shared/components/molecules";
import { Alert } from "@/shared/components/organims";
import { NotificationCard } from "../../molecules";

import { dynamicStyles } from "./NotificationList.style";

interface NotificationHeaderProps {
  filter: Order;
  updateFilter: (updatedFilter: Order) => void;
}

const NotificationListHeader = ({
  filter,
  updateFilter,
}: NotificationHeaderProps) => {
  const size = useResponsive();
  const { t } = useTranslations();

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

const NotificationList = () => {
  const size = useResponsive();
  const {
    isLoading,
    loadingMessage,
    updateFilter,
    notifications,
    filter,
    confirmDeleteDialog,
    deleteSelectedNotifications,
  } = useLoadUserNotifications();
  const { t } = useTranslations();

  const styles = dynamicStyles(size);

  return (
    <>
      <Alert
        title={t(
          "notifications_translations.user_notification_list.confirm_delete_alert_labels.title",
        )}
        isOpen={confirmDeleteDialog.isOpen}
        closeAlert={confirmDeleteDialog.closeAlert}
        variant="danger"
        message={t(
          "notifications_translations.user_notification_list.confirm_delete_alert_labels.message",
        )}
        acceptButtonLabel={t(
          "notifications_translations.user_notification_list.confirm_delete_alert_labels.btn_accept",
        )}
        acceptButtonIcon="trash-bin-outline"
        onCancel={confirmDeleteDialog.closeAlert}
        onAccept={() => {
          deleteSelectedNotifications();
          confirmDeleteDialog.closeAlert();
        }}
      />

      <FlatList
        style={styles.ListContainer}
        contentContainerStyle={styles.ListContent}
        data={notifications}
        horizontal={false}
        windowSize={5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        numColumns={size === "laptop" ? 2 : 1}
        renderItem={({ item }) => (
          <NotificationCard
            data={item}
            totalRecords={notifications.length}
            canSelect
          />
        )}
        keyExtractor={(item) => item.notificationId}
        ListHeaderComponent={
          <NotificationListHeader filter={filter} updateFilter={updateFilter} />
        }
        ListEmptyComponent={
          <Empty
            message={t(
              "notifications_translations.user_notification_list.no_notifications_msg",
            )}
            icon="notifications-off-outline"
          />
        }
        ListFooterComponent={
          isLoading ? (
            <LoadingTextIndicator
              message={loadingMessage ?? "..."}
              color={AppColors.primary[400]}
            />
          ) : null
        }
      />
    </>
  );
};

export default NotificationList;
