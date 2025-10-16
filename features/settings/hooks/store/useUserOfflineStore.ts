import { useStore } from "zustand";

import { UserOfflineStore } from "../../store";

const useUserOfflineStore = () => {
  return useStore(UserOfflineStore);
};

export default useUserOfflineStore;
