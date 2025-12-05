import { FlatList, View } from "react-native";

import { Order } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useLoadUserNotifications } from "@/features/notifications/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import {
  Empty,
  FilterTag,
  LoadingTextIndicator,
} from "@/shared/components/molecules";
import { NotificationCard } from "../../molecules";

import { NotificationListStyle } from "./NotificationList.style";

interface NotificationHeaderProps {
  filter: Order;
  updateFilter: (updatedFilter: Order) => void;
}

const NotificationListHeader = ({
  filter,
  updateFilter,
}: NotificationHeaderProps) => {
  const size = useScreenDimensionsStore();

  const notificationListStyle = NotificationListStyle(size);

  return (
    <View style={notificationListStyle.ListHeaderContainer}>
      <ScreenSection
        description="Encuentra aqui todas las notificaciones internas de tus actividades en Edu Prompt. "
        title="Notificaciones"
        icon="notifications-outline"
      />
      <View style={notificationListStyle.FiltersContainer}>
        <Typography
          text="Listar en orden"
          weight="bold"
          type="button"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="filter-outline"
        />
        <View style={notificationListStyle.Filters}>
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

const NotificationList = () => {
  const size = useScreenDimensionsStore();
  const { isLoading, loadingMessage, updateFilter, notifications, filter } =
    useLoadUserNotifications();

  const notificationListStyle = NotificationListStyle(size);

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
          {...item}
          notificationDate={item.creationDate}
          canSelect
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
            message={loadingMessage ?? "..."}
            color={AppColors.primary[400]}
          />
        ) : null
      }
    />
  );
};

export default NotificationList;
