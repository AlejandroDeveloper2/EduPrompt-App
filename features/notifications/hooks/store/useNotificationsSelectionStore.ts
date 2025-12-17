import { useStore } from "zustand";

import { NotificationsSelectionStore } from "../../store";

const useNotificationsSelectionStore = () => {
  return useStore(NotificationsSelectionStore);
};

export default useNotificationsSelectionStore;
