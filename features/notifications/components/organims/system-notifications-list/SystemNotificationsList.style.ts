import { SizeType } from "@/core/types";

import { dynamicStyles } from "../notification-list/NotificationList.style";

export const systemNotificationListStyles = (size: SizeType) =>
  dynamicStyles(size);
