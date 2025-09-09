import { Artist, Track } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { Button } from '../../ui/button';
import { X } from 'lucide-react';

type ArtistModalProps = {
  isLoadingTracks: boolean;
  topTracks: Track[];
  item: Artist;
  modalCloseHandler: (item: Track | Artist | null) => void;
};
const ArtistModal = ({
  item,
  modalCloseHandler,
  isLoadingTracks,
  topTracks,
}: ArtistModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <Button
          onClick={() => modalCloseHandler(null)}
          className="absolute top-4 right-4 z-10 bg-gray-700 rounded-full p-2 hover:bg-gray-600 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </Button>

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

export default ArtistModal;
