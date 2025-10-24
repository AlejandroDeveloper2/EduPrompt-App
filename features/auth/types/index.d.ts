interface LoginResponse {
  token: string;
  refreshToken: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupPayload {
  userName: string;
  email: string;
  password: string;
}

interface ResetPassCodeResponse {
  userId: string;
}

interface ResetPassPayload {
  newPassword: string;
  userId: string;
}

interface ChangePassPayload {
  currentPassword: string;
  newPassword: string;
}
interface EmailUpdatePayload {
  updatedEmail: string;
  code: string;
}

interface UserStats {
  tokenCoins: number;
  isPremiumUser: boolean;
  userPreferences: UserPreferences;
  sync: boolean;
  userName?: string;
  email?: string;
}

export type {
  ChangePassPayload,
  EmailUpdatePayload,
  LoginCredentials,
  LoginResponse,
  ResetPassCodeResponse,
  ResetPassPayload,
  SignupPayload,
  UserStats,
};
