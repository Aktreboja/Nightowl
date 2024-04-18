'use client';
import { SpotifyResponseError } from '../../../../spotify_api';
import { User } from '@spotify/web-api-ts-sdk';

/**
 * @description retrieves user information from Spotify
 * @param access_token Gets the user's Spotify Data.
 * @returns { UserProfileResponse } the user profile or spotify response error
 */
export const getUserData = async (access_token: string): Promise<User> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + '/me',
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );

    if (response.ok) {
      return (await response.json()) as User;
    } else {
      const errorData: SpotifyResponseError = await response.json();
      throw new Error(
        `Failed to fetch user data: ${response.status} - ${errorData.error.message}`,
      );
    }
  } catch (error) {
    throw new Error(`Failed to fetch user data: ${(error as Error).message}.`);
  }
};
