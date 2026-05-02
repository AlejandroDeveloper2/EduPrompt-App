import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { Notification } from "../../types";

import { useAnimatedCard } from "@/shared/hooks/animations";
import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useNotificationsSelectionStore } from "../../store";
import useCheckIsNewNotification from "./useCheckIsNewNotification";

const useNotificationCardLogic = (data: Notification) => {
  const size = useResponsive();
  const { t, lang } = useTranslations();
  const { selectedNotificationIds, toggleSelection } =
    useNotificationsSelectionStore(
      useShallow((state) => ({
        selectedNotificationIds: state.selectedNotificationIds,
        toggleSelection: state.toggleSelection,
      })),
    );
  const isSelected: boolean = useMemo(
    () => selectedNotificationIds.has(data.notificationId),
    [data.notificationId, selectedNotificationIds],
  );
  const animatedCardStyle = useAnimatedCard(isSelected);
  const { isNew, formattedDate } = useCheckIsNewNotification(data.creationDate);

  return {
    size,
    t,
    lang,
    animatedCardStyle,
    isNew,
    formattedDate,
    toggleSelection,
    isSelected,
  };
};

export default useNotificationCardLogic;
