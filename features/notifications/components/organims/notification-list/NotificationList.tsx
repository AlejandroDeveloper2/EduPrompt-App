import { useState } from "react";
import { FlatList, View } from "react-native";

import { Notification } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { ScreenSection, Typography } from "@/shared/components/atoms";
import {
  Empty,
  FilterTag,
  LoadingTextIndicator,
} from "@/shared/components/molecules";
import { NotificationCard } from "../../molecules";

import { NotificationListStyle } from "./NotificationList.style";

const notifications: Notification[] = [
  {
    notificationId: "not-1",
    title: "Notificación 1",
    creationDate: new Date(),
    message: "Mensaje",
  },
  {
    notificationId: "not-2",
    title: "Notificación 2",
    creationDate: new Date(),
    message: "Mensaje",
  },
  {
    notificationId: "not-3",
    title: "Notificación 3",
    creationDate: new Date(),
    message: "Mensaje",
  },
  {
    notificationId: "not-4",
    title: "Notificación 4",
    creationDate: new Date(),
    message: "Mensaje",
  },
  {
    notificationId: "not-5",
    title: "Notificación 5",
    creationDate: new Date(),
    message: "Mensaje",
  },
];

const NotificationListHeader = () => {
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
            active={true}
            onPressFilter={() => {}}
          />
          <FilterTag
            icon="calendar-outline"
            label="Descendente"
            active={false}
            onPressFilter={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

const NotificationList = () => {
  const size = useScreenDimensionsStore();
  const notificationListStyle = NotificationListStyle(size);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <FlatList
      style={notificationListStyle.ListContainer}
      contentContainerStyle={notificationListStyle.ListContent}
      data={notifications}
      horizontal={false}
      numColumns={size === "laptop" ? 2 : 1}
      renderItem={({ item }) => (
        <NotificationCard
          {...item}
          notificationDate={new Date(item.creationDate)}
          onDeleteNotification={() => {}}
        />
      )}
      keyExtractor={(item) => item.notificationId}
      ListHeaderComponent={<NotificationListHeader />}
      ListEmptyComponent={
        <Empty
          message="No hay notificaciones ahora mismo"
          icon="notifications-off-outline"
        />
      }
      onEndReached={(info) =>
        info.distanceFromEnd === 0 ? setLoading(true) : setLoading(false)
      }
      ListFooterComponent={
        loading ? (
          <LoadingTextIndicator
            message="Cargando notificaciones..."
            color={AppColors.primary[400]}
          />
        ) : null
      }
    />
  );
};

export default NotificationList;
