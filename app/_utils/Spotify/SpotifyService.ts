import { SpotifyClient, SpotifyClientParams } from './SpotifyClient';
import { Artist, Track, User, Page } from '@spotify/web-api-ts-sdk';

export type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export interface TopItemsData {
  artists: Page<Artist> | null;
  tracks: Page<Track> | null;
}

export class SpotifyService {
  private static instance: SpotifyService;
  private client: SpotifyClient;

  private constructor() {
    this.client = SpotifyClient.getInstance();
  }

  public static getInstance(): SpotifyService {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }
    return SpotifyService.instance;
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(
    accessToken: string,
    refreshToken?: string
  ): Promise<User | null> {
    return this.client.get<User>('/me', accessToken, refreshToken);
  }

  /**
   * Get user's top artists
   */
  async getTopArtists(
    accessToken: string,
    refreshToken?: string,
    params?: SpotifyClientParams
  ): Promise<Page<Artist> | null> {
    return this.client.get<Page<Artist>>(
      '/me/top/artists',
      accessToken,
      refreshToken,
      params
    );
  }

  /**
   * Get user's top tracks
   */
  async getTopTracks(
    accessToken: string,
    refreshToken?: string,
    params?: SpotifyClientParams
  ): Promise<Page<Track> | null> {
    return this.client.get<Page<Track>>(
      '/me/top/tracks',
      accessToken,
      refreshToken,
      params
    );
  }

  /**
   * Get user's top items (artists and tracks) for a specific time range
   */
  async getTopItems(
    accessToken: string,
    refreshToken: string,
    timeRange: TimeRange,
    limit: number = 20
  ): Promise<TopItemsData> {
    const params: SpotifyClientParams = {
      time_range: timeRange,
      limit,
    };

    const [artists, tracks] = await Promise.all([
      this.getTopArtists(accessToken, refreshToken, params),
      this.getTopTracks(accessToken, refreshToken, params),
    ]);

    return {
      artists,
      tracks,
    };
  }

  /**
   * Get user's recently played tracks
   */
  async getRecentlyPlayed(
    accessToken: string,
    refreshToken?: string,
    limit: number = 20
  ): Promise<any> {
    const params: SpotifyClientParams = { limit };
    return this.client.get(
      '/me/player/recently-played',
      accessToken,
      refreshToken,
      params
    );
  }

  /**
   * Get user's playlists
   */
  async getUserPlaylists(
    accessToken: string,
    refreshToken?: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<any> {
    const params: SpotifyClientParams = { limit, offset };
    return this.client.get('/me/playlists', accessToken, refreshToken, params);
  }

  /**
   * Get user's saved tracks
   */
  async getSavedTracks(
    accessToken: string,
    refreshToken?: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<any> {
    const params: SpotifyClientParams = { limit, offset };
    return this.client.get('/me/tracks', accessToken, refreshToken, params);
  }

  /**
   * Get user's followed artists
   */
  async getFollowedArtists(
    accessToken: string,
    refreshToken?: string,
    limit: number = 20
  ): Promise<any> {
    const params: SpotifyClientParams = { limit };
    return this.client.get(
      '/me/following?type=artist',
      accessToken,
      refreshToken,
      params
    );
  }

  /**
   * Get artist details
   */
  async getArtist(
    artistId: string,
    accessToken: string,
    refreshToken?: string
  ): Promise<Artist | null> {
    return this.client.get<Artist>(
      `/artists/${artistId}`,
      accessToken,
      refreshToken
    );
  }

  /**
   * Get multiple artists by their IDs
   */
  async getArtists(
    artistIds: string[],
    accessToken: string,
    refreshToken?: string
  ): Promise<{ artists: Artist[] } | null> {
    const ids = artistIds.join(',');
    return this.client.get<{ artists: Artist[] }>(
      `/artists?ids=${ids}`,
      accessToken,
      refreshToken
    );
  }

  /**
   * Get track details
   */
  async getTrack(
    trackId: string,
    accessToken: string,
    refreshToken?: string
  ): Promise<Track | null> {
    return this.client.get<Track>(
      `/tracks/${trackId}`,
      accessToken,
      refreshToken
    );
  }

  /**
   * Get artist's top tracks
   */
  async getArtistTopTracks(
    artistId: string,
    accessToken: string,
    refreshToken?: string,
    market: string = 'US'
  ): Promise<any> {
    const params: SpotifyClientParams = { type: 'tracks', limit: 10 };
    return this.client.get(
      `/artists/${artistId}/top-tracks?market=${market}`,
      accessToken,
      refreshToken,
      params
    );
  }

  /**
   * Get artist's albums
   */
  async getArtistAlbums(
    artistId: string,
    accessToken: string,
    refreshToken?: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<any> {
    const params: SpotifyClientParams = { limit, offset };
    return this.client.get(
      `/artists/${artistId}/albums`,
      accessToken,
      refreshToken,
      params
    );
  }

  /**
   * Get album details
   */
  async getAlbum(
    albumId: string,
    accessToken: string,
    refreshToken?: string
  ): Promise<any> {
    return this.client.get(`/albums/${albumId}`, accessToken, refreshToken);
  }

  /**
   * Get album tracks
   */
  async getAlbumTracks(
    albumId: string,
    accessToken: string,
    refreshToken?: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<any> {
    const params: SpotifyClientParams = { limit, offset };
    return this.client.get(
      `/albums/${albumId}/tracks`,
      accessToken,
      refreshToken,
      params
    );
  }

  /**
   * Search for items
   */
  async search(
    query: string,
    types: string[] = ['track', 'artist', 'album'],
    accessToken: string,
    refreshToken?: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<any> {
    const params: SpotifyClientParams = {
      q: query,
      type: types.join(','),
      limit,
      offset,
    };
    return this.client.get('/search', accessToken, refreshToken, params);
  }

  /**
   * Get audio features for a track
   */
  async getTrackAudioFeatures(
    trackId: string,
    accessToken: string,
    refreshToken?: string
  ): Promise<any> {
    return this.client.get(
      `/audio-features/${trackId}`,
      accessToken,
      refreshToken
    );
  }

  /**
   * Get audio analysis for a track
   */
  async getTrackAudioAnalysis(
    trackId: string,
    accessToken: string,
    refreshToken?: string
  ): Promise<any> {
    return this.client.get(
      `/audio-analysis/${trackId}`,
      accessToken,
      refreshToken
    );
  }

  /**
   * Get user's listening history
   */
  async getListeningHistory(
    accessToken: string,
    refreshToken?: string,
    limit: number = 50
  ): Promise<any> {
    const params: SpotifyClientParams = { limit };
    return this.client.get(
      '/me/player/recently-played',
      accessToken,
      refreshToken,
      params
    );
  }
}

// Export a singleton instance
export const spotifyService = SpotifyService.getInstance();
