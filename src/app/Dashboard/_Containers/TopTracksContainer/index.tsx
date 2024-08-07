import { useEffect, useState } from 'react';
import TrackArt from '@/app/Dashboard/_Components/TrackArt';
import { getTopSongs } from '@/utils/Spotify/Tracks';

import { Track } from '@spotify/web-api-ts-sdk';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import {
  getTimeRange,
  setTracks,
  setTimeRange,
  getTracks,
} from '@/features/reducers/MusicReducer';
import { checkToken } from '@/features/reducers/AuthReducer';
import useSpotify from '@/utils/Spotify/hooks/useSpotify';
import { getInteractable } from '@/features/reducers/UIReducer';

export const TopTracksContainer = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const time_range = useAppSelector(getTimeRange);
  const token = useAppSelector(checkToken);
  const tracks = useAppSelector(getTracks);

  const { fetchTopTracks } = useSpotify();

  useEffect(() => {
    // Utility function to load top Tracks
    const loadTopTracks = async (time_range: string) => {
      setLoading(true);
      const topTracks = await fetchTopTracks(time_range);
      dispatch(setTracks(topTracks));
      setLoading(false);
    };
    loadTopTracks(time_range);
  }, [setLoading, time_range, token, dispatch]);

  // Loading State for track and Artist container section
  const LoadingState = () => {
    const placeholders = Array.from({ length: 50 }, (_, index) => {
      return (
        <div className={`relative w-24 h-24 animate-pulse`} key={index}></div>
      );
    });
    return placeholders;
  };

  return (
    <>
      <div>
        <p className="max-md:text-xl text-4xl mx-3 mt-3 font-bold text-black text-center xl:text-left my-6">
          Your Top Tracks
        </p>
        {/* Selectors for time ranges. */}
        <div className="flex justify-center xl:justify-start my-3 text-lg">
          <p
            onClick={() => dispatch(setTimeRange('short_term'))}
            className={`${time_range == 'short_term' ? 'underline' : ''} max-md:text-sm mx-3 cursor-pointer hover:underline font-semibold text-black`}
          >
            Last Month
          </p>
          <p
            onClick={() => dispatch(setTimeRange('medium_term'))}
            className={`${time_range == 'medium_term' ? 'underline' : ''} max-md:text-sm mx-3 cursor-pointer hover:underline font-semibold text-black`}
          >
            Last 6 Months
          </p>
          <p
            onClick={() => dispatch(setTimeRange('long_term'))}
            className={`${time_range == 'long_term' ? 'underline' : ''} max-md:text-sm mx-3 cursor-pointer hover:underline font-semibold text-black`}
          >
            All Time
          </p>
        </div>
      </div>
      <div className="grid px-3 max-md:grid-cols-5 grid-cols-10 w-full overflow-y-auto max-h-[500px] mx-auto">
        {!loading ? (
          tracks.map((track, key) => <TrackArt key={key} track={track} />)
        ) : (
          <LoadingState />
        )}
      </div>
    </>
  );
};

export default TopTracksContainer;
