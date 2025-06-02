import { useStore } from "zustand";

import { BackgroundTasksStore } from "@/lib/store";

const useBackgroundTasksStore = () => {
  return useStore(BackgroundTasksStore);
};

export default useBackgroundTasksStore;
