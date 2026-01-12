import { useEffect } from "react";
import { FlatList, View } from "react-native";

import { AppColors } from "@/shared/styles";

import { Order } from "@/core/types";

import { useMarkAsReadNotificationsMutation } from "@/features/notifications/hooks/mutations";
import { useSystemNotificationsQuery } from "@/features/notifications/hooks/queries";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import {
  Empty,
  FilterTag,
  LoadingTextIndicator,
} from "@/shared/components/molecules";
import { NotificationCard } from "../../molecules";

import { SystemNotificationListStyle } from "./SystemNotificationsList.style";

interface NotificationListHeaderProps {
  filter: Order;
  updateFilter: (updatedFilter: Order) => void;
}

const NotificationListHeader = ({
  filter,
  updateFilter,
}: NotificationListHeaderProps) => {
  const size = useScreenDimensionsStore();
  const systemNotificationListStyle = SystemNotificationListStyle(size);

  return (
    <View style={systemNotificationListStyle.ListHeaderContainer}>
      <ScreenSection
        description="Encuentra aqui todas las notificaciones del sistema para enterarte de las novedades de Edu Prompt. "
        title="Notificaciones del sistema"
        icon="notifications-outline"
      />
      <View style={systemNotificationListStyle.FiltersContainer}>
        <Typography
          text="Listar en orden"
          weight="bold"
          type="button"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <View style={systemNotificationListStyle.Filters}>
          <FilterTag
            icon="calendar-outline"
            label="Ascendente"
            active={filter === "asc"}
            onPressFilter={() => updateFilter("asc")}
          />
          <FilterTag
            icon="calendar-outline"
            label="Descendente"
            active={filter === "desc"}
            onPressFilter={() => updateFilter("desc")}
          />
        </View>
      </View>
    </View>
  );
};

const SystemNotificationsList = () => {
  const size = useScreenDimensionsStore();
  const notificationListStyle = SystemNotificationListStyle(size);

  const {
    data: notifications,
    isLoading,
    filter,
    updateFilter,
  } = useSystemNotificationsQuery();
  const { mutate } = useMarkAsReadNotificationsMutation();

  useEffect(() => {
    if (!notifications) return;
    const notificationsIds = notifications.map((n) => n.notificationId);
    if (notificationsIds.length > 0) mutate(notificationsIds);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  return (
    <FlatList
      style={notificationListStyle.ListContainer}
      contentContainerStyle={notificationListStyle.ListContent}
      data={notifications}
      horizontal={false}
      windowSize={5}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      numColumns={size === "laptop" ? 2 : 1}
      renderItem={({ item }) => (
        <NotificationCard
          data={item}
          totalRecords={notifications?.length ?? 0}
        />
      )}
      keyExtractor={(item) => item.notificationId}
      ListHeaderComponent={
        <NotificationListHeader filter={filter} updateFilter={updateFilter} />
      }
      ListEmptyComponent={
        <Empty
          message="No hay notificaciones ahora mismo"
          icon="notifications-off-outline"
        />
      }
      ListFooterComponent={
        isLoading ? (
          <LoadingTextIndicator
            message="Cargando notificaciones..."
            color={AppColors.primary[400]}
          />
        ) : null
      }
    />
  );
};

export default SystemNotificationsList;
