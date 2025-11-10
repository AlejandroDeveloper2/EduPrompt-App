interface UserPreferences {
  autoSync: boolean;
  cleanFrecuency: string | null;
  pushNotifications: boolean;
  lastCleanAt?: string;
  autoCleanNotifications: boolean;
  language: string;
}

interface User {
  userName: string;
  email: string;
  tokenCoins: number;
  isPremiumUser: boolean;
  userPreferences: UserPreferences;
}

interface UserStats extends Omit<User, "userName" | "email"> {
  sync: boolean;
  userName?: string;
  email?: string;
}

interface CleanFrecuencyOption {
  key: string;
  frecuency: number;
  label: string;
}

export type { CleanFrecuencyOption, User, UserPreferences, UserStats };
