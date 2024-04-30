import { useAppDispatch } from '@/features/hooks';
import { useAppSelector } from '@/features/hooks';
import {
  getCodeVerifier,
  setCodeVerifier,
} from '@/features/reducers/AuthReducer';

/**
 * A custom React hook for Spotify authentication flow.
 * @returns An object containing functions related to Spotify authentication.
 */
const useSpotifyAuth = () => {
  const dispatch = useAppDispatch();

  /**
   * Generates a random string.
   * @param {number} length The length of the random string to generate.
   * @returns {string} A random string.
   */
  const generateRandomString = (length: number) => {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  };

  /**
   * Encrypts the given plaintext into a SHA-256 string.
   * @param {string} plain The plaintext to encrypt.
   * @returns {Promise<ArrayBuffer>} A promise that resolves to the SHA-256 encrypted string.
   */
  const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  /**
   * Encodes the given ArrayBuffer into a base64 string.
   * @param {ArrayBuffer} input The input ArrayBuffer to encode.
   * @returns {string} The base64 encoded string.
   */
  const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  // Redirects the user to Spotify's Authorize page.
  async function redirectToSpotifyAuthorize() {
    const code_verifier = generateRandomString(64);
    const hashed = await sha256(code_verifier);
    const code_challenge_base64 = base64encode(hashed);

    // Add the code verifier to the redux state.
    dispatch(setCodeVerifier(code_verifier));

    // Set up the redirect url to authorize Spotify's API
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

  return {
    generateRandomString,
    sha256,
    base64encode,
    redirectToSpotifyAuthorize,
  };
};

export default useSpotifyAuth;
