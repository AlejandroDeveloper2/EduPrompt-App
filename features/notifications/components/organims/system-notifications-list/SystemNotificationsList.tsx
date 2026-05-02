import { FlatList } from "react-native";

import { AppColors } from "@/shared/styles";

import { useSystemNotificationsLogic } from "@/features/notifications/hooks/core";

import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { NotificationCard } from "../../molecules";
import SystemNotificationListHeader from "./SystemNotificationListHeader";

import { systemNotificationListStyles } from "./SystemNotificationsList.style";

const SystemNotificationsList = () => {
  const { size, t, lang, notifications, isLoading, filter, updateFilter } =
    useSystemNotificationsLogic();

  const styles = systemNotificationListStyles(size);

  return (
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
          data={{
            ...item,
            title: item.title[lang],
            message: item.message[lang],
          }}
          totalRecords={notifications?.length ?? 0}
        />
      )}
      keyExtractor={(item) => item.notificationId}
      ListHeaderComponent={
        <SystemNotificationListHeader
          filter={filter}
          updateFilter={updateFilter}
        />
      }
      ListEmptyComponent={
        <Empty
          message={t(
            "notifications_translations.system_notification_list.no_notifications_msg",
          )}
          icon="notifications-off-outline"
        />
      }
      ListFooterComponent={
        isLoading ? (
          <LoadingTextIndicator
            message={t(
              "notifications_translations.system_notification_list.loading_notifications_msg",
            )}
            color={AppColors.primary[400]}
          />
        ) : null
      }
    />
  );
};

export default SystemNotificationsList;
