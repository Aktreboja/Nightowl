import { Tracks } from '@spotify/web-api-ts-sdk';

export interface SpotifySearchResponse {}

export const searchTracks = async (access_token: string, query: string) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE +
        `/search?q=track%3A${encodeURIComponent(query)}&type=track&limit=10`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error(`Error retrieving top songs: ${(error as Error).message}`);
  }
};
