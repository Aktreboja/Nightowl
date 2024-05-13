import { useAppSelector } from '@/features/hooks';
import useSpotifyApi from './useSpotifyApi';
import { checkToken } from '@/features/reducers/AuthReducer';
import { TopItems } from '../../../../spotify_api';
import { SimplifiedTrack, Track, Page } from '@spotify/web-api-ts-sdk';

const useSpotifyTracks = () => {
  const { request } = useSpotifyApi();
  const spotifyToken = useAppSelector(checkToken);

  // Dynamic request options object for different request methods.
  const DynamicOptions = ({
    method,
    body,
  }: {
    method: string;
    body?: string;
  }) => {
    let requestOptions = {
      method,
      headers: { Authorization: `Bearer ${spotifyToken?.access_token}` },
    };

    if (body) {
      return {
        ...requestOptions,
        body,
      };
    } else return requestOptions;
  };

  const fetchTopTracks = async (time_range: string): Promise<Track[]> => {
    try {
      const response = await request(
        `/me/top/tracks?limit=50&time_range=${time_range}`,
        DynamicOptions({ method: 'GET' }),
      );
      const topItems: TopItems = await response.json();
      return topItems.items as Track[];
    } catch (error) {
      console.error('Error fetching Top Tracks');
      return [];
    }
  };

  const fetchAlbumTracks = async (
    album_id: string,
  ): Promise<SimplifiedTrack[]> => {
    try {
      const response = await request(
        `/albums/${album_id}/tracks`,
        DynamicOptions({ method: 'GET' }),
      );
      const tracks: Page<SimplifiedTrack[]> = await response.json();
      // @ts-ignore
      return tracks.items;
    } catch (error) {
      return [];
    }
  };

  const saveSpotifyTrack = async (id: string): Promise<Response> => {
    try {
      const response = await request(
        `/me/tracks`,
        DynamicOptions({ method: 'PUT', body: JSON.stringify({ ids: [id] }) }),
      );
      return response;
    } catch (error) {
      throw new Error(`Error saving spotify Track`);
    }
  };

  const saveSpotifyTracks = async (ids: string[]): Promise<Response> => {
    try {
      const response = await request(
        `/me/tracks`,
        DynamicOptions({ method: 'PUT', body: JSON.stringify({ ids: ids }) }),
      );
      return response;
    } catch (error) {
      throw new Error(`Error saving spotify Tracks`);
    }
  };

  return {
    fetchTopTracks,
    fetchAlbumTracks,
    saveSpotifyTrack,
    saveSpotifyTracks,
  };
};

export default useSpotifyTracks;
