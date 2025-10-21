import { AppColors } from "@/shared/styles";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const setupNotificationChannel = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default Channel",
      importance: Notifications.AndroidImportance.MAX,
      sound: "notification_sound",
      vibrationPattern: [0, 250, 250, 250],
      lightColor: AppColors.neutral[0],
    });
  }
};
