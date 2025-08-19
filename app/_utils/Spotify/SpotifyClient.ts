interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

export interface SpotifyClientParams {
  q?: string;
  type?: string;
  time_range?: string;
  limit?: number;
  offset?: number;
}

export class SpotifyClient {
  private static instance: SpotifyClient;

  private constructor(
    private clientId: string,
    private clientSecret: string,
    private redirectUrl: string
  ) {}

  public static getInstance(): SpotifyClient {
    if (!SpotifyClient.instance) {
      SpotifyClient.instance = new SpotifyClient(
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
        process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL as string
      );
    }
    return SpotifyClient.instance;
  }

  private tokenExpiration: number = 0;

  async authenticate(
    code: string,
    codeVerifier: string
  ): Promise<SpotifyTokenResponse> {
    const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT as string,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${credentials}`,
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirectUrl,
            code_verifier: codeVerifier,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to authenticate with Spotify');
      }

      const data: SpotifyTokenResponse = await response.json();
      this.tokenExpiration = Date.now() + data.expires_in * 1000;
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token || '');
      return data;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  private async ensureValidToken(accessToken: string): Promise<string | null> {
    // TODO (AR): HANDLE EXPIRATIONS
    if (!accessToken) {
      return null;
    }
    return accessToken;
  }

  async refreshToken(refreshToken: string): Promise<SpotifyTokenResponse> {
    const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT as string,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: this.clientId,
        }),
      }
    );
    return response.json();
  }

  async get<T>(
    endpoint: string,
    accessToken: string,
    refreshToken?: string,
    params?: SpotifyClientParams
  ): Promise<T | null> {
    const token = await this.ensureValidToken(accessToken);
    const queryString = params
      ? `?${new URLSearchParams(params as unknown as Record<string, string>)}`
      : '';
    const response = await fetch(
      `https://api.spotify.com/v1${endpoint}${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  }

  async post<T>(
    endpoint: string,
    accessToken: string,
    refreshToken?: string,
    data?: any
  ): Promise<T> {
    const token = await this.ensureValidToken(accessToken);
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  }
}
