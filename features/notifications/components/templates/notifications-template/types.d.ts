import { ReactNode } from "react";

import { LIST_TABS } from "./constants";

export type NotificationListId = (typeof LIST_TABS)[number]["tabId"];
export type NotificationListComponentMap = Record<
  NotificationListId,
  ReactNode
>;
