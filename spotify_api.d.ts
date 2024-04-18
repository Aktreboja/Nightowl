import { Artist, Track } from '@spotify/web-api-ts-sdk';

interface UserFollowers {
  href: string | null;
  id: string;
}

interface ExternalUrls {
  spotify: string;
}

interface UserImages {
  url: string;
  height: number | null;
  width: number | null;
}

export interface UserProfileResponse {
  display_name: string | null;
  external_urls: ExternalUrls;
  followers: UserFollowers;
  href: string;
  id: string;
  images: UserImages;
}

interface ResponseError {
  status: number;
  message: string;
}
export interface SpotifyResponseError {
  error: ResponseError;
}

export interface TopItems {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Artist[] | Track[];
}

export interface RecommendationQuery {
  seedTracks: string[];
  seedArtists: string[];
  seedGenres?: string[];
  market?: string;
}
