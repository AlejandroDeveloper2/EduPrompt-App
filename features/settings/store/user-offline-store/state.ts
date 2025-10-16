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
  },
  sync: false,
  userName: "",
  email: "",
};
