import { Track, Artist } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { spotifyService } from '@/app/_utils/Spotify';

interface ItemModalProps {
  item: Track | Artist;
  modalCloseHandler: (item: Track | Artist | null) => void;
}

const ItemModal = ({ item, modalCloseHandler }: ItemModalProps) => {
  const isTrack = 'artists' in item;
  const [artists, setArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const fetchData = async () => {
      if (!accessToken || !refreshToken) return;

      setIsLoading(true);
      try {
        if (isTrack) {
          // For tracks, fetch artists
          const artistIds = (item as Track).artists.map((artist) => artist.id);
          const artistsData = await spotifyService.getArtists(
            artistIds,
            accessToken,
            refreshToken
          );
          if (artistsData) {
            setArtists(artistsData.artists || []);
          }
        } else {
          // For artists, fetch top tracks
          setIsLoadingTracks(true);
          const topTracksData = await spotifyService.getArtistTopTracks(
            item.id,
            accessToken,
            refreshToken
          );
          if (topTracksData?.tracks) {
            setTopTracks(topTracksData.tracks);
          }
          setIsLoadingTracks(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [item, isTrack]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        modalCloseHandler(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalCloseHandler]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (isTrack) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close button */}
          <button
            onClick={() => modalCloseHandler(null)}
            className="absolute top-4 right-4 z-10 bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-8">
            {/* Track header */}
            <div className="flex gap-6 items-start mb-6">
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image
                  src={item.album.images[0]?.url || ''}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {item.name}
                </h1>
                <p className="text-gray-300 mb-1">Album: {item.album.name}</p>
                <p className="text-gray-300">
                  Duration: {Math.floor(item.duration_ms / 60000)}:
                  {String(
                    Math.floor((item.duration_ms % 60000) / 1000)
                  ).padStart(2, '0')}
                </p>
              </div>
            </div>

            {/* Artists section */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Artists</h2>
              <div className="flex flex-wrap gap-4">
                {artists.length > 0 ? (
                  artists.map((artist) => (
                    <div
                      key={artist.id}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-16 h-16 relative mb-2">
                        <Image
                          src={artist.images[0]?.url || ''}
                          alt={artist.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="text-sm font-medium text-white max-w-20 truncate">
                        {artist.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No artist information available
                  </p>
                )}
              </div>
            </div>

            {/* Track details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-300">Popularity:</span>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${item.popularity}%` }}
                  ></div>
                </div>
                <span className="text-gray-300">{item.popularity}%</span>
              </div>
              <div>
                <span className="font-medium text-gray-300">Release Date:</span>
                <p className="text-gray-300">{item.album.release_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Artist modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={() => modalCloseHandler(null)}
          className="absolute top-4 right-4 z-10 bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8">
          {/* Artist header */}
          <div className="flex gap-6 items-start mb-6">
            <div className="w-24 h-24 relative flex-shrink-0">
              <Image
                src={item.images[0]?.url || ''}
                alt={item.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">
                {item.name}
              </h1>
              <p className="text-gray-300 mb-1">
                Followers:{' '}
                {item.followers?.total?.toLocaleString() || 'Unknown'}
              </p>
              <p className="text-gray-300">Popularity: {item.popularity}%</p>
            </div>
          </div>

          {/* Artist details */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <span className="font-medium text-gray-300">Popularity:</span>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${item.popularity}%` }}
                ></div>
              </div>
              <span className="text-gray-300">{item.popularity}%</span>
            </div>
            <div>
              <span className="font-medium text-gray-300">Genres:</span>
              <p className="text-gray-300">
                {item.genres?.slice(0, 3).join(', ') || 'No genres available'}
              </p>
            </div>
          </div>

          {/* Top Tracks section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Top Tracks</h2>
            {isLoadingTracks ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : topTracks.length > 0 ? (
              <div className="space-y-3">
                {topTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => modalCloseHandler(track)}
                  >
                    <div className="w-12 h-12 relative flex-shrink-0">
                      <Image
                        src={track.album.images[0]?.url || ''}
                        alt={track.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-400 w-6">
                          {index + 1}
                        </span>
                        <p className="font-medium text-white truncate">
                          {track.name}
                        </p>
                      </div>
                      <p className="text-sm text-gray-300 truncate">
                        {track.album.name}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {Math.floor(track.duration_ms / 60000)}:
                      {String(
                        Math.floor((track.duration_ms % 60000) / 1000)
                      ).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-400">
                      {track.popularity}%
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                No top tracks available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
