

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }
  
  export interface CurrentToken {
    access_token: string | null;
    refresh_token: string | null;
    expires_in: string | null;
    expires: string | null;
  
    save(response: TokenResponse): void;
    validateToken(currentDatetime: number, expires: number): boolean
  }
  