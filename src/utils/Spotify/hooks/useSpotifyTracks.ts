import { useAppDispatch, useAppSelector } from '@/features/hooks';
import useSpotifyApi from './useSpotifyApi';
import { checkToken } from '@/features/reducers/AuthReducer';
import { TopItems } from '../../../../spotify_api';
import { Track } from '@spotify/web-api-ts-sdk';

const useSpotifyTracks = () => {
  const { request } = useSpotifyApi();
  const spotifyToken = useAppSelector(checkToken);

  const GetOptions = {
    method: 'GET',
    headers: { Authorization: `Bearer ${spotifyToken?.access_token}` },
  };

  const fetchTopTracks = async (time_range: string): Promise<Track[]> => {
    try {
      const response = await request(
        `/me/top/tracks?limit=50&time_range=${time_range}`,
        GetOptions,
      );
      const topItems: TopItems = await response.json();
      return topItems.items as Track[];
    } catch (error) {
      console.error('Error fetching Top Tracks');
      return [];
    }
  };

  return { fetchTopTracks };
};

export default useSpotifyTracks;
