import { Token } from '../../../types';

/**
 * @name generateRandomString
 * @description Generatees a random string
 * @param length
 * @returns
 */
const generateRandomString = (length: number) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

/**
 * @name sha256
 * @param plain plaintext that will be used to encrypt into a SHA-256 string
 * @returns
 */
const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// Redirects the user to Spotify's Authorize page.
export async function redirectToSpotifyAuthorize() {
  const code_verifier = generateRandomString(64);
  const hashed = await sha256(code_verifier);
  const code_challenge_base64 = base64encode(hashed);

  window.localStorage.setItem('code_verifier', code_verifier);
  const authUrl = new URL(
    process.env.NEXT_PUBLIC_SPOTIFY_AUTH_ENDPOINT as string,
  );

  const params = {
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
    scope: process.env.NEXT_PUBLIC_SPOTIFY_SCOPE as string,
    code_challenge_method: 'S256',
    code_challenge: code_challenge_base64,
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL as string,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

// Checks to make sure that the input is a Spotify Access_token
export const isValidTokenResponse = (token: any): token is Token => {
  return (
    typeof token === 'object' &&
    'access_token' in token &&
    'refresh_token' in token &&
    'expires_in' in token
  );
};

/**
 *  Spotify API Calls
 */
export async function getToken(code: string): Promise<Token | null> {
  const code_verifier = localStorage.getItem('code_verifier');
  const response = await fetch(
    process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT as string,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL as string,
        code_verifier: code_verifier || '',
      }),
    },
  );

  // todo: Error handle API call here in case the request fails
  return await response.json();
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

// Refreshing the Access token
export async function refreshToken(refresh_token: string): Promise<any> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT as string,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
        }),
      },
    );

    return await response.json();
  } catch (error) {
    console.error('error with refresh toke: ', error);
  }
}

export async function loginWithSpotifyClick() {
  await redirectToSpotifyAuthorize();
}

// Logs you out of spotify app
export async function logoutClick() {
  localStorage.clear();
  window.location.href = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL as string;
}
