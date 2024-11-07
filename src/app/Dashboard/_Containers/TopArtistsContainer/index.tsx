import { useEffect, useState } from 'react';
import ArtistArt from '@/app/Dashboard/_Components/ArtistArt';
import { GetTopArtists } from '@/utils/Spotify/Artists';
import { getAccessToken } from '@/utils/Spotify/Spotify';
import { Artist } from '@spotify/web-api-ts-sdk';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { checkToken } from '@/features/reducers/AuthReducer';
import { getArtists, setArtists } from '@/features/reducers/MusicReducer';
import { fetchArtists } from '@/features/actions/artist';

interface TopTracksProps {
  short_term: Artist[] | null;
  medium_term: Artist[] | null;
  long_term: Artist[] | null;
}

const TopArtistsContainer = () => {
  const dispatch = useAppDispatch();

  // todo: consolidate these
  const token = useAppSelector(checkToken);
  const artists = useAppSelector(getArtists);

  const [artistsData, setArtistsData] = useState<TopTracksProps>({
    short_term: null,
    medium_term: null,
    long_term: null,
  });

  const [timeRange, setTimeRange] = useState('medium_term');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const access_token = token?.access_token;
    if (access_token) {
      dispatch(fetchArtists({ access_token, time_range: timeRange }));
    }

    // Utility function to load top Tracks
    const loadTopArtists = async (time_range: string) => {
      setLoading(true);
      const access_token = await getAccessToken();
      if (access_token) {
        const response = await GetTopArtists(access_token, time_range);
        if ('items' in response) {
          dispatch(setArtists(response.items as Artist[]));
        }
      }
      setLoading(false);
    };

    if (!artistsData[timeRange as keyof TopTracksProps]) {
      loadTopArtists(timeRange);
    }
  }, [timeRange, artistsData, dispatch, token?.access_token]);

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
          Your Top Artists
        </p>
        <div className="flex justify-center xl:justify-start my-3 text-lg">
          <p
            onClick={() => setTimeRange('short_term')}
            className={`${timeRange == 'short_term' ? 'underline' : ''} max-sm:text-sm mx-3 cursor-pointer hover:underline font-semibold text-black`}
          >
            Last Month
          </p>
          <p
            onClick={() => setTimeRange('medium_term')}
            className={`${timeRange == 'medium_term' ? 'underline' : ''} max-sm:text-sm mx-3 cursor-pointer hover:underline font-semibold text-black`}
          >
            Last 6 Months
          </p>
          <p
            onClick={() => setTimeRange('long_term')}
            className={`${timeRange == 'long_term' ? 'underline' : ''} max-sm:text-sm mx-3 cursor-pointer hover:underline font-semibold text-black`}
          >
            All Time
          </p>
        </div>
      </div>
      <div className="grid px-3 max-md:grid-cols-5 grid-cols-10 w-full overflow-y-auto max-h-[500px] mx-auto">
        {!loading ? (
          artists.map((Artist, key) => <ArtistArt key={key} artist={Artist} />)
        ) : (
          <LoadingState />
        )}
      </div>
    </>
  );
};
export default TopArtistsContainer;
