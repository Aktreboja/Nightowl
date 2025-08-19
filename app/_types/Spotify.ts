export interface Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires: string;
  }
  
  export interface SpotifyToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  }