import { create } from "zustand";

import { Tab, ViewerType } from "@/core/types";
import { ResourcePreviewStoreType } from "./store-types";

const DEFAULT_TAB: Tab = { tabId: "tab-1", label: "" };

export const useResourcePreviewStore = create<ResourcePreviewStoreType>(
  (set, get) => ({
    selectedResource: null,
    activePreviewTab: DEFAULT_TAB,
    isTagSelection: false,
    viewerType: "text",

    setSelectedResource: (resource) => {
      const viewerType: ViewerType =
        resource?.formatKey === "text"
          ? "text"
          : resource?.formatKey === "image"
            ? "image"
            : "table/chart";

      set({
        selectedResource: resource,
        viewerType,
        activePreviewTab: DEFAULT_TAB,
        isTagSelection: false,
      });
    },

    setActivePreviewTab: (tab) => set({ activePreviewTab: tab }),
    setIsTagSelection: (value) => set({ isTagSelection: value }),

    reset: () =>
      set({
        selectedResource: null,
        activePreviewTab: DEFAULT_TAB,
        isTagSelection: false,
        viewerType: "text",
      }),
  }),
);
