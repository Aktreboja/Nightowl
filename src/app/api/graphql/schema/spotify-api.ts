import { RESTDataSource } from '@apollo/datasource-rest';
import { Track } from '@spotify/web-api-ts-sdk';

export class SpotifyAPI extends RESTDataSource {
  override baseURL = 'https://api.spotify.com/v1';

  async getTrack(id: string): Promise<Track> {
    return this.get<Track>(`/tracks/${encodeURIComponent(id)}`);
  }
}
