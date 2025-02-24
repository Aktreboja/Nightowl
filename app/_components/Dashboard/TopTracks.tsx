import { useSpotify } from '@/app/_utils/Spotify/SpotifyContext';
import { useEffect, useState } from 'react';
import { SpotifyClient } from '@/app/_utils/Spotify/SpotifyClient';
import { Artist, Track } from '@spotify/web-api-ts-sdk';
import { Page } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { SpotifyClientParams } from '@/app/_utils/Spotify/SpotifyClient';
import { Skeleton } from '@chakra-ui/react';

interface TopTracksProps {
  setHoveredTrack: (track: Track | null) => void;
  setSelectedItem: (item: Track | Artist | null) => void;
}

const TopTracks = ({ setHoveredTrack, setSelectedItem }: TopTracksProps) => {
  const { user } = useSpotify();

  const [topTracks, setTopTracks] = useState<Page<Track>>({
    href: '',
    items: [],
    limit: 0,
    next: null,
    offset: 0,
    previous: null,
    total: 0,
  });
  const [trackConfig, setTrackConfig] = useState<SpotifyClientParams>({
    time_range: 'medium_term',
    limit: 20,
  });

  const spotifyClient = SpotifyClient.getInstance();

  useEffect(() => {
    const fetchTopTracks = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const tracks = await spotifyClient.get<Page<Track>>(
        '/me/top/tracks',
        accessToken as string,
        refreshToken as string,
        trackConfig
      );
      setTopTracks(tracks as Page<Track>);
    };
    fetchTopTracks();
  }, [user]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Your Top Tracks</h1>
      <div className="grid grid-cols-7 gap-2 w-fit h-fit ">
        {topTracks.items.length > 0 ? (
          topTracks.items.map((track) => (
            <div
              key={track.id}
              className="w-fit"
              onClick={() => setSelectedItem(track)}
              onMouseEnter={() => setHoveredTrack(track)}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                width={100}
                height={100}
              />
            </div>
          ))
        ) : (
          <Skeleton width={400} height={400} />
        )}
      </div>
    </div>
  );
};

export default TopTracks;
