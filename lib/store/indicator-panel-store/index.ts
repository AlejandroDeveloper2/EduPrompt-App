import { create } from "zustand";

import { IndicatorPanelStoreType } from "./store-types";

import { storeActions } from "./actions";
import { initialState } from "./state";

export const IndicatorPanelStore = create<IndicatorPanelStoreType>()(
  (...args) => ({ ...initialState, ...storeActions(...args) })
);
