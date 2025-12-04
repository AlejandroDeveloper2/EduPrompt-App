class TokenManager {
  private access: string | null = null;
  private refresh: string | null = null;

  setTokens(t: string, r: string) {
    this.access = t;
    this.refresh = r;
  }

  clearTokens() {
    this.access = null;
    this.refresh = null;
  }

  getTokens() {
    return { token: this.access, refreshToken: this.refresh };
  }
}

export const tokenManager = new TokenManager();
