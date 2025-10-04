import { useStore } from "zustand";

import { UserOfflineStore } from "@/lib/store";

const useUserOfflineStore = () => {
  return useStore(UserOfflineStore);
};

export default useUserOfflineStore;
