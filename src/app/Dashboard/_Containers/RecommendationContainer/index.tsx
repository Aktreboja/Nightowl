'use client';
import { useState } from 'react';
import RecommendSearchInput from '../../_Components/RecommendSearchInput';
import { Track } from '@spotify/web-api-ts-sdk';
import QueueCard from '../../_Components/QueueCard';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import {
  addTrackToQueue,
  clearSearchResults,
  getSearchResults,
  getTrackQueue,
} from '@/features/reducers/PlaylistReducer';
import SearchResult from '../../_Components/SearchResult';
import { GetRecommendations } from '@/utils/Spotify/Recommendations';
import { RecommendationQuery } from '../../../../../spotify_api';
import { checkToken } from '@/features/reducers/AuthReducer';
import { Token } from '../../../../../types';

export default function RecommendationContainer() {
  const dispatch = useAppDispatch();
  const trackQueue = useAppSelector(getTrackQueue);
  const searchResults = useAppSelector(getSearchResults);
  const token = useAppSelector(checkToken);

  const selectedResultHandler = async (track: Track) => {
    dispatch(addTrackToQueue(track));
    dispatch(clearSearchResults());
  };

  const getRecommendations = async () => {
    const tracks = trackQueue.map((track) => track.id);
    const recQuery: RecommendationQuery = {
      seedTracks: tracks,
    };
    // todo: comment until further notice
    // const recResponse = await GetRecommendations(
    //   (token as Token).access_token,
    //   recQuery,
    // );
  };

  return (
    <section className="mx-3 min-h-screen relative flex items-center justify-center rounded-sm">
      <div className="w-3/4 max-w-[700px] h-fit bg-white py-3 rounded-sm">
        <h1 className="text-2xl text-center font-semibold">
          Search for some Tracks
        </h1>

        {/* Input Container */}
        <div className="w-2/3 mx-auto py-3 relative">
          <RecommendSearchInput />
          {/* Options from the search Query. */}
          {searchResults.length > 0 && (
            <div className="absolute w-full h-[500px] overflow-y-auto bg-white shadow-md mt-3 p-2 z-50">
              {searchResults.map((result, key) => (
                <div
                  key={key}
                  className="cursor-pointer my-2"
                  onClick={() => selectedResultHandler(result)}
                >
                  <SearchResult track={result} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-96  flex flex-col items-center overflow-y-auto">
          {trackQueue.length > 0 &&
            trackQueue.map((track, key) => (
              <div key={key} className="w-2/3 my-1">
                <QueueCard track={track} />
              </div>
            ))}
        </div>
        <div className="mx-auto flex justify-center mt-2">
          <button
            className="bg-button-secondary font-semibold px-3 py-3 rounded-sm hover:bg-button-primary hover:text-white duration-75"
            onClick={() => getRecommendations()}
          >
            Recommend Playlist
          </button>
        </div>
      </div>
    </section>
  );
}
