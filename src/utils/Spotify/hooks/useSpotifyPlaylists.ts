import { useAppDispatch, useAppSelector } from '@/features/hooks';
import useSpotifyApi from './useSpotifyApi';
import { checkToken } from '@/features/reducers/AuthReducer';

import { Playlist, Page, TrackItem } from '@spotify/web-api-ts-sdk';
import { CreatePlaylistProps } from '@/types/types';

const useSpotifyPlaylists = () => {
  const { request } = useSpotifyApi();
  const spotifyToken = useAppSelector(checkToken);

  const GetOptions = {
    method: 'GET',
    headers: { Authorization: `Bearer ${spotifyToken?.access_token}` },
  };
  /**
   * @name fetchUserPlaylists function
   * @description Fetches the user's playlists
   * @param user_id the user's Spotify user_id
   * @returns { Playlist<TrackItem[]> } an object of Playlist objects
   */
  const fetchUserPlaylists = async (
    user_id: string,
  ): Promise<Playlist<TrackItem>[]> => {
    try {
      let playlistsArray: Playlist<TrackItem>[] = [];

      const response = await request(
        `/users/${encodeURIComponent(user_id)}/playlists?limit=20`,
        GetOptions,
      );
      const playlists: Page<Playlist> = await response.json();

      // Filter to only return playlists owned by the user
      const filteredPlaylists = playlists.items.filter(
        (playlist) => playlist.owner.id == user_id,
      );
      playlistsArray = playlistsArray.concat(filteredPlaylists);
      let next = playlists.next;

      while (next) {
        const endpoint = next.split('v1')[1];
        const offsetResponse = await request(endpoint, GetOptions);
        const playlists: Page<Playlist<TrackItem>> =
          await offsetResponse.json();
        const filteredPlaylists = playlists.items.filter(
          (playlist) => playlist.owner.id == user_id,
        );
        playlistsArray = playlistsArray.concat(filteredPlaylists);
        next = playlists.next;
      }

      return playlistsArray;
    } catch (error) {
      console.error('Error fetching user Playlists: ', error);
      return [];
    }
  };

  const createPlaylist = async (
    user_id: string,
    body: CreatePlaylistProps,
  ): Promise<Playlist | null> => {
    try {
      const PostOptions = {
        ...GetOptions,
        method: 'POST',
        body: JSON.stringify(body),
      };

      const response = await request(
        `/users/${user_id}/playlists`,
        PostOptions,
      );
      const playlistResponse = await response.json();
      return playlistResponse;
    } catch (error) {
      console.error('Error creating playlists.');
      return null;
    }
  };

  return { fetchUserPlaylists, createPlaylist };
};

export default useSpotifyPlaylists;
