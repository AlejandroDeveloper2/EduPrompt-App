import { create } from "zustand";

import { BackgroundTaskStoreType } from "./store-types";

import { storeActions } from "./actions";
import { initialState } from "./state";

export const BackgroundTasksStore = create<BackgroundTaskStoreType>()(
  (...args) => ({ ...initialState, ...storeActions(...args) })
);
