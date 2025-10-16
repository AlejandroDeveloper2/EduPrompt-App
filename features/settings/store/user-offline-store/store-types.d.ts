import { UserPreferences, UserStats } from "../../types";

export interface StoreStateProps {
  userStats: UserStats;
}

export interface StoreUserActions {
  updateLocalUserPreferences: (
    updatedUserPreferences: Partial<UserPreferences>,
    sync: boolean
  ) => void;
  markAsSynced: () => void;
  setUserStats: (userStats: UserStats) => void;
  addLocalTokenCoins: (amount: number, sync: boolean) => void;
  subtractLocalTokenCoins: (amount: number, sync: boolean) => void;
  updateLocalAccountType: (isPremiumUser: boolean, sync: boolean) => void;
  loadLocalUserStats: () => UserStats;
}

export type UserStoreType = StoreStateProps & StoreUserActions;

export type UserStorePersistedState = Pick<UserStoreType, "userStats">;
