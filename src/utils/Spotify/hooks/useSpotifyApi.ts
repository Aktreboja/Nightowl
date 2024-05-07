import { useAppDispatch, useAppSelector } from '@/features/hooks';
import {
  checkToken,
  getCodeVerifier,
  setAuth,
  setToken,
} from '@/features/reducers/AuthReducer';
import { SpotifyToken } from '../../../../types';
import { User } from '@spotify/web-api-ts-sdk';
import { redirectToSpotifyAuthorize } from '../Spotify';

/**
 * A custom React hook for handling Spotify API requests and authentication.
 * @returns An object containing functions to interact with the Spotify API.
 */
const useSpotifyApi = () => {
  const dispatch = useAppDispatch();
  const code_verifier = useAppSelector(getCodeVerifier);
  const token = useAppSelector(checkToken);

  /**
   * Makes a request to the Spotify API endpoint with the given options.
   * Automatically handles refreshing the access token if a 401 response is received.
   * @param {string} endpoint The endpoint to request.
   * @param {RequestInit} options The options for the request.
   * @returns {Promise<Response>} A promise that resolves to the response from the API.
   */
  const request = async (
    endpoint: string,
    options: RequestInit,
  ): Promise<Response> => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + endpoint,
      { ...options },
    );

    if (response.status === 401) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        dispatch(setToken(newAccessToken));

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken.access_token}`,
        };
        // Retry the request with the new access token
        return request(endpoint, options);
      } else {
        console.log('Refresh token is expired or invalid');

        // Unauthenticate the user
        dispatch(setAuth(false));
        dispatch(setToken(null));

        // Redirect to Spotify authorize page if refresh token is expired or invalid
        // await redirectToSpotifyAuthorize();
      }
    }
    return response;
  };

  /**
   * Retrieves the access token from Spotify API after authentication.
   * @param {string} code The authorization code obtained from the authentication process.
   * @returns {Promise<SpotifyToken | null>} A promise that resolves to the access token.
   */
  const getAccessToken = async (code: string): Promise<SpotifyToken | null> => {
    try {
      if (code_verifier) {
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
              redirect_uri: process.env
                .NEXT_PUBLIC_SPOTIFY_REDIRECT_URL as string,
              code_verifier: code_verifier || '',
            }),
          },
        );
        return (await response.json()) as SpotifyToken;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error Retrieving Access Token: ', error);
      return null;
    }
  };

  /**
   * Refreshes the access token using the refresh token stored in the current token state.
   * @returns {Promise<SpotifyToken | null>} A promise that resolves to the refreshed access token.
   */
  const refreshAccessToken = async (): Promise<SpotifyToken | null> => {
    if (token) {
      const refresh_token = token.refresh_token;
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT as string,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'refresh_token',
              refresh_token: refresh_token,
              client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
            }),
          },
        );

        if (!response.ok) return null;
        return (await response.json()) as SpotifyToken;
      } catch (error) {
        console.error('Error refreshing token: ', error);
        return null;
      }
    } else return null;
  };

  /**
   * Retrieves user information from the Spotify API.
   * @returns {Promise<User>} A promise that resolves to the user information.
   * @throws Throws an error if user information cannot be retrieved.
   */
  const getUser = async (): Promise<User> => {
    try {
      const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token?.access_token}` },
      };
      const response = await request('/me', options);
      return (await response.json()) as User;
    } catch (error) {
      console.error('Error retrieving user: ', error);
      throw new Error('Error retrieving user');
    }
  };

  return { getAccessToken, request, refreshAccessToken, getUser };
};

export default useSpotifyApi;
