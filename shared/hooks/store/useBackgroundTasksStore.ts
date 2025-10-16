import { useStore } from "zustand";

import { BackgroundTasksStore } from "@/core/store";

const useBackgroundTasksStore = () => {
  return useStore(BackgroundTasksStore);
};

export default useBackgroundTasksStore;
