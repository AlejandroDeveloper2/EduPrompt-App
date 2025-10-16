import { ReactNode } from "react";

import { FORM_TABS } from "./constants";

export type FormSectionId = (typeof FORM_TABS)[number]["tabId"];
export type FormSectionComponentMap = Record<FormSectionId, ReactNode>;
