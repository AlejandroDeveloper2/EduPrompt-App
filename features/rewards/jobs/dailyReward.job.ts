import uuid from "react-native-uuid";

import { Job } from "@/core/jobs/types";

import { config } from "@/core/config/enviromentVariables";
import { eventBus } from "@/core/events/EventBus";
import { i18n } from "@/core/store";

export const dailyRewardJob: Job = {
  id: "daily-reward",
  interval: "daily",
  run: async () => {
    const userProfile = eventBus.getLast("userProfile.user.updated");

    /** Si el usuario es premium no se entrega la recompenza de tokens gratis al usuario */
    if (userProfile && userProfile.isPremiumUser) return;

    eventBus.emit("userProfile.updateTokeUserCoins.requested", {
      amount: parseInt(config.tokenDailyRewardAmount),
      mode: "add",
    });

    eventBus.emit("notifications.createNotification.requested", {
      notificationId: uuid.v4(),
      title: i18n.t("rewards_translations.title") ?? "title",
      creationDate: new Date(),
      message: i18n.t("rewards_translations.reward_notification_msg"),
    });
  },
};
