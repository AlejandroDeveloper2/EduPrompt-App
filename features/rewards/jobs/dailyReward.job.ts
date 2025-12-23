import uuid from "react-native-uuid";

import { Job } from "@/core/jobs/types";

import { config } from "@/core/config/enviromentVariables";
import { eventBus } from "@/core/events/EventBus";

export const dailyRewardJob: Job = {
  id: "daily-reward",
  interval: "daily",
  run: async () => {
    eventBus.emit("userProfile.updateTokeUserCoins.requested", {
      amount: parseInt(config.tokenDailyRewardAmount),
      mode: "add",
    });

    eventBus.emit("notifications.createNotification.requested", {
      notificationId: uuid.v4(),
      title: "Recompensa diaria",
      creationDate: new Date(),
      message:
        "Has ganado 10 tokens gratis por ingresar diariamente a EduPrompt.",
    });
  },
};
