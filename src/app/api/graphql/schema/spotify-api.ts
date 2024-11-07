import {
  AugmentedRequest,
  CacheOptions,
  RESTDataSource,
} from '@apollo/datasource-rest';
import { Track } from '@spotify/web-api-ts-sdk';
import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import { ValueOrPromise } from '@apollo/datasource-rest/dist/RESTDataSource';

export class SpotifyAPI extends RESTDataSource {
  override baseURL = 'https://api.spotify.com/v1';
  private token: string;

  constructor(options: { token: string; cache: KeyValueCache }) {
    super(options);
    this.token = options.token;
  }

  override willSendRequest(
    path: string,
    requestOpts: AugmentedRequest<CacheOptions>,
  ): ValueOrPromise<void> {
    requestOpts.headers['authorization'] = this.token;
  }

  async getTrack(id: string): Promise<Track> {
    return this.get<Track>(`/tracks/${encodeURIComponent(id)}`, {
      headers: {
        Authorization: this.token,
      },
    });
  }
}
