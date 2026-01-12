import { create } from "zustand";

import { SharedStoreType } from "./store-types";

export const SharedStore = create<SharedStoreType>(() => ({
  folder: null,
  folders: [],
}));
