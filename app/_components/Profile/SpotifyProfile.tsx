'use client';
import { Button } from '@/app/_components/ui/button';
import { Menu, Portal } from '@chakra-ui/react';
import { Menu as MenuIcon, Power } from 'lucide-react';
import { useSpotify } from '../../_utils/Spotify/SpotifyContext';
import { useRouter } from 'next/navigation';
import { Artist, Track } from '@spotify/web-api-ts-sdk';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TimeRange } from '../../_utils/Spotify';
import { SpotifyService } from '../../_utils/Spotify';
import ItemModal from '../Dashboard/modals/ItemModal';
import UserCard from './UserCard';

export const SpotifyProfile: React.FC = () => {
  const { user, accessToken, refreshToken, logout, isAuthenticated } =
    useSpotify();
  const router = useRouter();
  const spotifyService = SpotifyService.getInstance();

  const [selectedTimeRange, setSelectedTimeRange] =
    useState<TimeRange>('short_term');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topItems, setTopItems] = useState<{
    artists?: { items: Artist[] };
    tracks?: { items: Track[] };
  } | null>(null);

  const [selectedItem, setSelectedItem] = useState<Track | Artist | null>(null);

  useEffect(() => {
    const fetchTopItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const [artistsPage, tracksPage] = await Promise.all([
          spotifyService.getTopArtists(
            accessToken as string,
            refreshToken as string,
            { time_range: selectedTimeRange, limit: 20 }
          ),
          spotifyService.getTopTracks(
            accessToken as string,
            refreshToken as string,
            { time_range: selectedTimeRange, limit: 20 }
          ),
        ]);

        if (artistsPage && tracksPage) {
          setTopItems({
            artists: { items: artistsPage.items },
            tracks: { items: tracksPage.items },
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && accessToken && refreshToken) {
      fetchTopItems();
    }
  }, [selectedTimeRange, isAuthenticated, accessToken, refreshToken]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const timeRangeLabels = {
    short_term: 'Last 4 Weeks',
    medium_term: 'Last 6 Months',
    long_term: 'All Time',
  };

  const renderItemGrid = (
    items: (Artist | Track)[],
    type: 'artist' | 'track'
  ) => {
    return (
      <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3">
        {items.map((item) => {
          const isTrack = 'album' in item;
          const imageUrl = isTrack
            ? item.album.images[0]?.url
            : item.images[0]?.url;
          const name = item.name;

          return (
            <div
              key={item.id}
              className="relative group cursor-pointer transition-transform hover:scale-105"
              onClick={() => {
                console.log('CLICKED ITEM:', item);
                console.log('ITEM TYPE:', isTrack ? 'track' : 'artist');
                console.log('ITEM NAME:', name);
                setSelectedItem(item);
              }}
            >
              <div className="aspect-square relative overflow-hidden rounded-lg">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {/* Hover overlay with name */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <p className="text-white text-xs font-medium text-center px-2 line-clamp-2">
                    {name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Nightowl</h1>
          <p className="text-gray-600 mb-8">
            Connect with Spotify to view your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Nightowl</h1>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="outline" size="sm">
                <MenuIcon />
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="sign-out"
                    color="fg.error"
                    className="flex justify-center gap-2"
                    _hover={{ bg: 'bg.error', color: 'fg.error' }}
                  >
                    <Power size={14} />
                    Sign Out
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          {/* <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Sign Out
          </Button> */}
        </div>

        {/* Profile Section */}
        <UserCard user={user} />

        <div className="mb-6">
          <div className="flex space-x-4">
            {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
              <Button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                variant={selectedTimeRange === range ? 'default' : 'outline'}
                className={
                  selectedTimeRange === range
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'border-white text-white hover:bg-white hover:text-black'
                }
              >
                {timeRangeLabels[range]}
              </Button>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-200">Error: {error}</p>
          </div>
        )}

        {/* Top Artists and Tracks Section */}
        <div className="space-y-8">
          {/* Top Artists */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              Top Artists - {timeRangeLabels[selectedTimeRange]}
            </h3>
            {loading ? (
              <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-700 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : topItems?.artists && topItems.artists.items.length > 0 ? (
              renderItemGrid(topItems.artists.items, 'artist')
            ) : (
              <p className="text-gray-400">No artists data available</p>
            )}
          </div>

          {/* Top Tracks */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              Top Tracks - {timeRangeLabels[selectedTimeRange]}
            </h3>
            {loading ? (
              <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-700 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : topItems?.tracks && topItems.tracks.items.length > 0 ? (
              renderItemGrid(topItems.tracks.items, 'track')
            ) : (
              <p className="text-gray-400">No tracks data available</p>
            )}
          </div>
        </div>

        {/* Item Modal */}
        {selectedItem && (
          <ItemModal
            item={selectedItem}
            modalCloseHandler={(item) => {
              console.log('CLOSING MODAL, item:', item);
              setSelectedItem(item);
            }}
          />
        )}
      </div>
    </div>
  );
};
