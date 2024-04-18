import { Artist, Track, Page, SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { TopItems, SpotifyResponseError } from '../../../../spotify_api';

/**
 * @description Retrieves the Top artists for a user, based on a given time range
 * @param access_token The access token required to acces the Spotify Web API
 * @param time_range Time range to retrieve time based results. (short_term, medium_term, long_term)
 * @returns {TopItems} The top items for the user (Artist[])
 */
export const GetTopArtists = async (
  access_token: string,
  time_range: string,
): Promise<TopItems> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE +
        `/me/top/artists?limit=50&time_range=${time_range}`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );
    if (response.ok) return (await response.json()) as TopItems;
    else {
      const errorData: SpotifyResponseError = await response.json();
      throw new Error(
        `Unable to fetch Artist: ${response.status} - ${errorData.error.message}`,
      );
    }
  } catch (error) {
    throw new Error(`Error fetching top Artists: ${(error as Error).message}`);
  }
};

/**
 * @description Gets a specific artist
 * @param access_token The access token required to acces the Spotify Web API
 * @param id the Spotify ID of the artist
 * @returns {Artist} The artist
 */
export const GetArtist = async (
  access_token: string,
  id: string,
): Promise<Artist | SpotifyResponseError> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + `/artists/${id}`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );

    if (response.ok) return (await response.json()) as Artist;
    else {
      const errorData: SpotifyResponseError = await response.json();
      throw new Error(
        `Unable to fetch Artist: ${response.status} - ${errorData.error.message}`,
      );
    }
  } catch (error) {
    throw new Error(`Error with fetching Artist: ${(error as Error).message}`);
  }
};

/**
 * @description Retrieves several Artists, based on Spotify IDs.
 * @param access_token The access token required to acces the Spotify Web API
 * @param ids the Spotify IDs of the Artists
 * @returns {Artist[]} A collection of Artist objects.
 */
export const GetSeveralArtists = async (
  access_token: string,
  ids: string[],
): Promise<Artist[] | SpotifyResponseError> => {
  try {
    const idsQuery = ids.map((id) => id).join(',');
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + `/artists?ids=${idsQuery}`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );
    if (response.ok) {
      return (await response.json()).artists as Artist[];
    } else {
      const errorData: SpotifyResponseError = await response.json();
      throw new Error(
        `Error fetching several artists: ${response.status} - ${errorData.error.message}`,
      );
    }
  } catch (error) {
    throw new Error(
      `Unable to get Several Artists: ${(error as Error).message}`,
    );
  }
};

/**
 * @description Retrieves the Artist's top tracks
 * @param access_token The access token required to acces the Spotify Web API
 * @param id the Spotify ID of the artist
 * @returns {Track[]} A collection of tracks
 */
export const GetArtistsTopTracks = async (
  access_token: string,
  id: string,
): Promise<Track[] | SpotifyResponseError> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE +
        `/artists/${id}/top-tracks?market=ES`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );
    if (response.ok) return (await response.json()) as Track[];
    else {
      const errorData: SpotifyResponseError = await response.json();
      throw new Error(
        `Error fetching Artist's top tracks: ${response.status} - ${errorData.error.message}`,
      );
    }
  } catch (error) {
    throw new Error(
      `Unable to get Artist's top tracks: ${(error as Error).message}`,
    );
  }
};

/**
 * @description Retrieves the Artist's Albums
 * @param access_token The access token required to acces the Spotify Web API
 * @param id The Spotify ID of the artist
 * @returns {Page<SimplifiedAlbum>} Pages of SimplifiedAlbums
 */
export const GetArtistsAlbums = async (
  access_token: string,
  id: string,
): Promise<Page<SimplifiedAlbum> | SpotifyResponseError> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + `/artists/${id}/albums`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );
    if (response.ok) return (await response.json()) as Page<SimplifiedAlbum>;
    else {
      const errorData: SpotifyResponseError = await response.json();
      throw new Error(
        `Error fetching Artist's albums: ${response.status} - ${errorData.error.message}`,
      );
    }
  } catch (error) {
    throw new Error(
      `Unable to get Artist's albums: ${(error as Error).message}`,
    );
  }
};

/**
 * @description Retrieves the Artist's related artists
 * @param access_token The access token required to acces the Spotify Web API
 * @param id The Spotify ID of the artist
 * @returns {Artist[]} A collection of related Artists.
 */
export const GetRelatedArtists = async (
  access_token: string,
  id: string,
): Promise<Artist[] | SpotifyResponseError> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE +
        `/artists/${id}/related-artists`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );
    if (response.ok) return (await response.json()) as Artist[];
    else {
      const errorData: SpotifyResponseError = await response.json();
      throw new Error(
        `Error fetching related artists: ${response.status} - ${errorData.error.message}`,
      );
    }
  } catch (error) {
    throw new Error(
      `Unable to get related artists: ${(error as Error).message}`,
    );
  }
};

/**
 * @description Checks to see if the user currently follows an artist
 * @param access_token
 * @param id
 * @returns
 */
export const checkFollowedArtist = async (
  access_token: string,
  id: string,
): Promise<boolean> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE +
        `/me/tracks/contains?type=artist&ids=${id}`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );
    const savedArray = (await response.json()) as boolean[];
    return savedArray[0];
  } catch (error) {
    throw new Error(
      `Error retrieving saved Tracks: ${(error as Error).message}`,
    );
  }
};
