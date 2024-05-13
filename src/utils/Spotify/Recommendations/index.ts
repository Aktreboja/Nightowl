import {
  RecommendationQuery,
  SpotifyResponseError,
} from '../../../../spotify_api';
import { RecommendationsResponse } from '@spotify/web-api-ts-sdk';

/**
 * @description Gets recommendations based on Artist and/or Tracks
 * @param access_token The Access Token required to use the Spotify API
 * @param query a query containing track / artist seeds
 * @returns {RecommendationsResponse}
 */
export const GetRecommendations = async (
  access_token: string,
  query: RecommendationQuery,
): Promise<RecommendationsResponse> => {
  try {
    const { seedTracks } = query;

    let trackQuery = 'seed_tracks=';

    for (let i = 0; i < seedTracks.length; i++) {
      trackQuery += seedTracks[i] + ',';
    }

    // for (let i = 0; i < seedArtists.length; i++) {
    //   artistQuery += seedArtists[i] + ',';
    // }
    // let recArray = [trackQuery.slice(0, -1), artistQuery.slice(0, -1)].join(
    //   '&',
    // );

    let recArray = trackQuery.slice(0, -1);
    console.log(recArray);
    console.log('AccessToken: ', access_token);
    const recommendationResponse = await fetch(
      process.env.NEXT_PUBLIC_SPOTIFY_API_BASE +
        `/recommendations?${recArray}&market=ES&limit=30`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + access_token },
      },
    );
    if (recommendationResponse.ok)
      return (await recommendationResponse.json()) as RecommendationsResponse;
    else {
      const errorData: SpotifyResponseError =
        await recommendationResponse.json();
      throw new Error(
        `Error retrieving recommendations: ${recommendationResponse.status} - ${errorData.error.message}`,
      );
    }
  } catch (error) {
    throw new Error(
      `Unable to fetch Recommendations: ${(error as Error).message}`,
    );
  }
};
