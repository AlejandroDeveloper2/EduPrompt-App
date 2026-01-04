import { ReactNode } from "react";

import { RESOURCE_PREVIEW_TABS } from "./constants";

export type SectionId = (typeof RESOURCE_PREVIEW_TABS)[number]["tabId"];
export type SectionComponentMap = Record<SectionId, ReactNode>;
