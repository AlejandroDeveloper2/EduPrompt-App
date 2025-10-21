import { useStore } from "zustand";

import { UserNotificationsStore } from "../../store";

const useUserNotificationsStore = () => {
  return useStore(UserNotificationsStore);
};
export default useUserNotificationsStore;
