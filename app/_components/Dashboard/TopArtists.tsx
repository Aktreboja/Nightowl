import { useSpotify } from '@/app/_utils/Spotify/SpotifyContext';
import { useEffect, useState } from 'react';
import { SpotifyClient } from '@/app/_utils/Spotify/SpotifyClient';
import { Artist } from '@spotify/web-api-ts-sdk';
import { Page } from '@spotify/web-api-ts-sdk';
import Image from 'next/image';
import { SpotifyClientParams } from '@/app/_utils/Spotify/SpotifyClient';

interface TopArtistsProps {
  setHoveredArtist: (artist: Artist | null) => void;
}

const TopArtists = ({ setHoveredArtist }: TopArtistsProps) => {
  const { user } = useSpotify();

  const [topArtists, setTopArtists] = useState<Page<Artist>>({
    href: '',
    items: [],
    limit: 0,
    next: null,
    offset: 0,
    previous: null,
    total: 0,
  });
  const [artistConfig, setArtistConfig] = useState<SpotifyClientParams>({
    time_range: 'long_term',
    limit: 20,
  });

  const spotifyClient = SpotifyClient.getInstance();

  useEffect(() => {
    const fetchTopArtists = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const artists = await spotifyClient.get<Page<Artist>>(
        '/me/top/artists',
        accessToken as string,
        refreshToken as string,
        artistConfig
      );
      setTopArtists(artists as Page<Artist>);
    };
    fetchTopArtists();
  }, [user]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold">Your Top Artists</h1>
      <div className="grid grid-cols-7 gap-2 w-fit h-fit ">
        {topArtists.items.length > 0 &&
          topArtists.items.map((artist) => (
            <div
              key={artist.id}
              className="w-fit"
              onMouseEnter={() => setHoveredArtist(artist)}
              onMouseLeave={() => setHoveredArtist(null)}
            >
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                width={100}
                height={100}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopArtists;
