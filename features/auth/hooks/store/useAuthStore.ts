import { useStore } from "zustand";

import { AuthStore } from "../../store";

const useAuthStore = () => {
  return useStore(AuthStore);
};

export default useAuthStore;
