import { useAppSelector } from '@/features/hooks';
import useSpotifyApi from './useSpotifyApi';
import { checkToken } from '@/features/reducers/AuthReducer';
import { Album, Artist, Track } from '@spotify/web-api-ts-sdk';

/**
 * use hook for Artist related endpoints for Spotify.
 * @returns
 */
const useSpotifyArtists = () => {
  const { request } = useSpotifyApi();
  const spotifyToken = useAppSelector(checkToken);

  const GetOptions = {
    method: 'GET',
    headers: { Authorization: `Bearer ${spotifyToken?.access_token}` },
  };

  /**
   * @name fetchArtistsTopTracks
   * @description fetches the Artist's top tracks
   * @param artist_id the spotify id of the artist
   * @returns {Track[]} the artist's top tracks
   */
  const fetchArtistsTopTracks = async (artist_id: string): Promise<Track[]> => {
    try {
      const response = await request(
        `/artists/${encodeURIComponent(artist_id)}/top-tracks`,
        GetOptions,
      );
      const tracks = await response.json();
      return tracks.tracks as Track[];
    } catch (error) {
      console.error("Error fetching artist's top tracks: ", error);
      return [];
    }
  };
  /**
   * @name fetchArtistsRelatedArtists
   * @description Fetches the artist's related artists
   * @param artist_id the spotify id of the artist
   * @returns { Artist[] } the artist's related artists.
   */
  const fetchArtistsRelatedArtists = async (
    artist_id: string,
  ): Promise<Artist[]> => {
    try {
      const response = await request(
        `/artists/${encodeURIComponent(artist_id)}/related-artists`,
        GetOptions,
      );
      const artists = await response.json();
      return artists.artists as Artist[];
    } catch (error) {
      console.error("Error fetching Artist's related artists: ", error);
      return [];
    }
  };

  const fetchArtistsAlbums = async (artist_id: string): Promise<Album[]> => {
    try {
      const response = await request(
        `/artists/${encodeURIComponent(artist_id)}/albums?include_groups=album,appears_on`,
        GetOptions,
      );
      const albums = await response.json();
      return albums.items as Album[];
    } catch (error) {
      console.error("Error fetching Artist's albums: ", error);
      return [];
    }
  };
  return {
    fetchArtistsTopTracks,
    fetchArtistsRelatedArtists,
    fetchArtistsAlbums,
  };
};

export default useSpotifyArtists;
