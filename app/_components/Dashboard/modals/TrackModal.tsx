import { Track, Artist } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { TooltipRoot, TooltipTrigger, TooltipContent } from '@chakra-ui/react';
import { Tooltip } from '@/app/_components/ui/tooltip';

type TrackModalProps = {
  item: Track;
  artists: Artist[];
  modalCloseHandler: (item: Track | Artist | null) => void;
};
const TrackModal = ({ item, artists, modalCloseHandler }: TrackModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
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
                {String(Math.floor((item.duration_ms % 60000) / 1000)).padStart(
                  2,
                  '0'
                )}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Artists</h2>
            <div className="flex flex-wrap gap-4">
              {artists.length > 0 ? (
                artists.map((artist) => (
                  <div
                    key={artist.id}
                    className="flex flex-col items-center text-center"
                    onClick={() => modalCloseHandler(artist)}
                  >
                    <Tooltip content={artist.name} showArrow>
                      <div>
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
                    </Tooltip>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No artist information available</p>
              )}
            </div>
          </div>

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
};

export default TrackModal;
