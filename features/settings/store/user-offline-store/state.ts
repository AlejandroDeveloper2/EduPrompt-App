import { UserStats } from "../../types";

export const initialState: UserStats = {
  tokenCoins: 0,
  isPremiumUser: false,
  userPreferences: {
    autoSync: false,
    cleanFrecuency: null,
    pushNotifications: false,
    autoCleanNotifications: false,
    language: "es",
    lastCleanAt: undefined,
  },
  sync: false,
  userName: "",
  email: "",
};
