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

export const TopTracksContainer = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const time_range = useAppSelector(getTimeRange);
  const token = useAppSelector(checkToken);
  const tracks = useAppSelector(getTracks);

  useEffect(() => {
    // Utility function to load top Tracks
    const loadTopTracks = async (time_range: string) => {
      setLoading(true);
      const access_token = token?.access_token;
      if (access_token) {
        const response = await getTopSongs(access_token, time_range);
        if ('items' in response) {
          dispatch(setTracks(response.items as Track[]));
        } else {
          // Access token is available but 401 is called because
          const { message, status } = response.error;
          if (status === 401) {
          }
        }
      } else {
        // todo: Add logic here
      }
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
    <div className="bg-white w-full px-3 rounded md h-[485px] overflow-y-hidden ">
      <div>
        <p className="max-sm:text-xl text-3xl mx-3 mt-3 font-bold text-black text-center xl:text-left">
          Your Top Tracks
        </p>
        {/* Selectors for time ranges. */}
        <div className="flex justify-center xl:justify-start my-2">
          <p
            onClick={() => dispatch(setTimeRange('short_term'))}
            className={`${time_range == 'short_term' ? 'underline' : ''} max-sm:text-sm mx-3 cursor-pointer hover:underline font-semibold text-black`}
          >
            Last Month
          </p>
          <p
            onClick={() => dispatch(setTimeRange('medium_term'))}
            className={`${time_range == 'medium_term' ? 'underline' : ''} max-sm:text-sm mx-3 cursor-pointer hover:underline font-semibold text-black`}
          >
            Last 6 Months
          </p>
          <p
            onClick={() => dispatch(setTimeRange('long_term'))}
            className={`${time_range == 'long_term' ? 'underline' : ''} max-sm:text-sm mx-3 cursor-pointer hover:underline font-semibold text-black`}
          >
            All Time
          </p>
        </div>
      </div>
      <div className="flex justify-center h-96 overflow-y-hidden">
        <div className="grid px-3  grid-cols-6  xl:grid-cols-10 w-full overflow-y-scroll max-h-[500px] ">
          {!loading ? (
            tracks.map((track, key) => <TrackArt key={key} track={track} />)
          ) : (
            <LoadingState />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopTracksContainer;
