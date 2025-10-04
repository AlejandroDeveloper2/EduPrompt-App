import { UserStats } from "@/lib/types/data-types";

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
