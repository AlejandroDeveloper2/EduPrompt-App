interface StoreState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
}

interface StoreActions {
  setAuthTokens: (token: string, refreshToken: string) => void;
  clearAuthTokens: () => Promise<void>;
}

type AuthStoreType = StoreState & StoreActions;

export type { AuthStoreType, StoreActions, StoreState };
