import { FlatList } from "react-native";

import { useNotificationListLogic } from "@/features/notifications/hooks/core";

import { Empty } from "@/shared/components/molecules";
import { Alert } from "@/shared/components/organims";
import { NotificationCard } from "../../molecules";
import NotificationListHeader from "./NotificationListHeader";

import { dynamicStyles } from "./NotificationList.style";

const NotificationList = () => {
  const {
    t,
    size,
    updateFilter,
    notifications,
    filter,
    confirmDeleteDialog,
    deleteSelectedNotifications,
  } = useNotificationListLogic();

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
      />
    </>
  );
};

export default NotificationList;
