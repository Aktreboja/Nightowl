/**
 * Spotify PKCE Authentication Utilities
 * @param length 
 * @returns 
 */
export const generateCodeVerifier = (length: number = 64): string => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

export const generateCodeChallenge = async (
  codeVerifier: string
): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

export const createAuthUrl = (
  clientId: string,
  redirectUri: string,
  codeChallenge: string,
  scopes: string[] = ['user-read-private', 'user-read-email']
): string => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scopes.join(' '),
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const exchangeCodeForToken = async (
  code: string,
  codeVerifier: string,
  clientId: string,
  redirectUri: string
): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Token exchange failed: ${errorData.error_description || errorData.error}`
    );
  }

  return response.json();
};

export const refreshAccessToken = async (
  refreshToken: string,
  clientId: string
): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Token refresh failed: ${errorData.error_description || errorData.error}`
    );
  }

  return response.json();
};
